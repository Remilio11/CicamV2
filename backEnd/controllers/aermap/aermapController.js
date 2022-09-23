const execFile = require('child_process').execFile;
const fs = require('fs');
const path = require('path');

const returnDomCuadricula = (X, Y, Zona) => {
    return `CO STARTING
   TITLEONE  AERMAP
 
   TERRHGTS  EXTRACT
 
   DATATYPE  NED     FILLGAPS
   DATAFILE  a1.tif
   DATAFILE  a2.tif
    
** DOMAINXY  Xdmin Ydmin Zonmin Xdmax Ydmax Zonmax

 `;
}

const returnIdenSisCoor = (Y_SC, X_SC, Zona_SC, DatoHorizontal) => {
    return `
   ANCHORXY  ${X_SC} ${Y_SC} ${X_SC} ${Y_SC} ${Zona_SC} ${DatoHorizontal}

   RUNORNOT  RUN

   DEBUGOPT  ALL

CO FINISHED

`;
}

const returnFuentes = (fuentes) => {
    const firstPart = `SO STARTING\n`;

    let fuentesArraryText = ``;
    const numStack = 1;

    fuentes.forEach((fuente, index) => {
        if((fuentes.length - 1) === index){
            fuentesArraryText += `   LOCATION  STACK${numStack} POINT ${fuente.longitud} ${fuente.latitud} ${fuente.hlvlMar}`;
        }else{
            const sumStack = numStack+1;
            fuentesArraryText += `   LOCATION  STACK${sumStack} POINT ${fuente.longitud} ${fuente.latitud} ${fuente.hlvlMar}\n`;
        }
    })

    console.log(fuentesArraryText);

    return firstPart + fuentesArraryText + `
SO FINISHED

`;
}

const returnReceptores = (Y_NumRep_RC, Y_SepRep_RC, Y_InicioCuad_RC, X_SepRep_RC, X_NumRep_RC, X_InicioCuad_RC) => {
    if(Y_NumRep_RC === '' || Y_SepRep_RC === '' || Y_InicioCuad_RC === '' || X_SepRep_RC === '' || X_NumRep_RC === '' || X_InicioCuad_RC === ''){
        return "";
    }
    return `RE STARTING
   GRIDCART CART1 STA
                    XYINC ${X_InicioCuad_RC} ${X_NumRep_RC} ${X_SepRep_RC} ${Y_InicioCuad_RC} ${Y_NumRep_RC} ${Y_SepRep_RC}
   GRIDCART CART1 END
RE FINISHED
 
OU STARTING
   RECEPTOR  RECEPT.ROU
OU FINISHED`;
}


/** Tomando archivo de entrada */

const validator = (req, next) => {
    let positionInArray1 = false;
    let positionInArray1Type = '';
    let positionInArray2 = false;
    let positionInArray2Type = '';
    if(req.files.length > 2 || req.files.length <= 1 || req.files === undefined){
        return res.status(404).send({
            message: 'Ustede tiene que enviar 2 archivos'
        });
    }
    /**
     * Verificacion de Nombres
     */
    if((req.files[0].originalname.split('.')[1] == 'TIF') || (req.files[0].originalname.split('.')[1] == 'TIF')){
        positionInArray1 = true;
        positionInArray1Type = req.files[0].originalname.split('.')[1];
    }
    if((req.files[1].originalname.split('.')[1] == 'TIF') || (req.files[1].originalname.split('.')[1] == 'TIF')){
        positionInArray2 = true;
        positionInArray2Type = req.files[1].originalname.split('.')[1];
    }
    if(!positionInArray1 || !positionInArray2){
        return res.status(404).send({
            message: 'Usted solamente puede cargar archivos con extension .TIF'
        });
    };
    if(positionInArray1Type === positionInArray2Type){
        return res.status(404).send({
            message: 'Los archivos deben ser diferentes'
        });
    }
    return {
        positionInArray1Type,
        positionInArray2Type
    }
}

exports.getAermapData = async (req, res, next) => {
    try {
        // Paso 2
        // Ejecutar el aermap.exe y el archivo aermap.inp
        execFile(path.join(__dirname, '../../aermap.exe'), [], (error, stdout, stderr) => {
            if (error) {
                return res.status(404).send({
                    error
                });
            }
            res.status(200).send({
                message: 'Se ha generado los datos exitosamente'
            })
        });
    } catch (error) {
        next(new Error(error));
    }
}

/* Salida de Archivos */

exports.generateAermapFile = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        const {X, Y, Zona, Y_SC, X_SC, Zona_SC, DatoHorizontal, Y_NumRep_RC, Y_SepRep_RC, Y_InicioCuad_RC, X_SepRep_RC, X_NumRep_RC, X_InicioCuad_RC, fuentes} = data;
        fs.writeFile('aermap.inp', returnDomCuadricula(X, Y, Zona) + returnIdenSisCoor(Y_SC, X_SC, Zona_SC, DatoHorizontal) + returnFuentes(fuentes) + returnReceptores(Y_NumRep_RC, Y_SepRep_RC, Y_InicioCuad_RC, X_SepRep_RC, X_NumRep_RC, X_InicioCuad_RC), err => {
            if (err) {
              console.error(err);
            }
          });
        res.contentType('application/octet-stream');
        execFile(path.join(__dirname, '../../aermap.exe'), [], (error, stdout, stderr) => {
            if (error) {
                return res.status(404).send({
                    error
                });
            }
            fs.readFile("RECEPT.ROU", (err, data) => {
                if (err) {
                    return res.status(404).send({
                        message: 'Archivo no funciona'
                    });
                }
                res.send(data);
            });
        });
    } catch (error) {
        next(new Error(error));
    }
}

exports.getAermapROU = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../RECEPT.ROU'), (err, data) => {
            if (err) {
                return res.status(404).send({
                    message: 'Archivo no funciona'
                });
            }
            res.send(data);
        });
    } catch (error) {
        next(new Error(error));
    }

}