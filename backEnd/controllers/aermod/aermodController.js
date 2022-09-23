const execFile = require('child_process').execFile;
const fs = require('fs');
const path = require('path');

const returnEntries = (AVERTIME, POLLUTID) => {
    return `** To run the example, copy the AERTEST.INP file to AERMOD.INP and type:                                                                                                        
**                                                                                                                                  
**    AERMOD
**                                                                                                                                  
** The results for this example problem are provided in file AERMOD.OUT.

CO STARTING                                                                                                                         
   TITLEONE A Simple Example Problem for the AERMOD Model with PRIME
   MODELOPT  CONC   FLAT
   AVERTIME  ${AVERTIME} PERIOD                                                                                                          
   POLLUTID  ${POLLUTID}                                                                                                                    
   RUNORNOT  RUN
   EVENTFIL  aertest_evt.inp
   ERRORFIL  ERRORS.OUT
CO FINISHED
\n`;
}

const returnFuentes = (fuentes) => {
    const firstPart = `SO STARTING
   ELEVUNIT  METERS\n`;

    let fuentesArraryText = ``;
    const numStack = 1;

    fuentes.forEach((fuente, index) => {
        if((fuentes.length - 1) === index){
            fuentesArraryText += `   LOCATION  STACK${numStack}  POINT  ${fuente.source.longitud} ${fuente.source.latitud} ${fuente.source.hlvlMar}`;
        }else{
            const sumStack = numStack+1;
            fuentesArraryText += `   LOCATION  STACK${sumStack}  POINT  ${fuente.source.longitud} ${fuente.source.latitud} ${fuente.source.hlvlMar}\n`;
        }
    })

    return firstPart + fuentesArraryText;
}

const returnFuentesStacks = (fuentes) => {
    const firstPart = `

** Point Source       QS      HS     TS    VS    DS
** Parameters:       ----    ----   ----  ----   ---\n`;

    let fuentesArraryText = ``;
    const numStack = 1;

    fuentes.forEach((fuente, index) => {
        if((fuentes.length - 1) === index){
            fuentesArraryText += `   SRCPARAM  STACK${numStack}  ${fuente.stack.TE}    ${fuente.stack.AF}  ${fuente.stack.TG}  ${fuente.stack.VG}   ${fuente.stack.DF}`;
        }else{
            const sumStack = numStack+1;
            fuentesArraryText += `   SRCPARAM  STACK${sumStack}  ${fuente.stack.TE}    ${fuente.stack.AF}  ${fuente.stack.TG}  ${fuente.stack.VG}   ${fuente.stack.DF}\n`;
        }
    })

    return firstPart + fuentesArraryText + `
   SRCGROUP  POL1 STACK1


SO FINISHED
    `;
}

const returnExitVariables = (RECTABLE, MAXTABLE, MAXIFILE) => {
    return `
RE STARTING
   INCLUDED RECEPT.ROU
RE FINISHED                                                                                                                         
                                                                                                                                     
ME STARTING                                                                                                                         
   SURFFILE  MET2119246_AERMET_2019-2020.sfc
   PROFFILE  MET2119246_AERMET_2019-2020.pfl
   SURFDATA  99999  2019  
   UAIRDATA  99999  2019                                                                                  
   SITEDATA  99999  2019 
   PROFBASE  0.0  METERS
ME FINISHED                                                                                                                         
                                                                                                                                     
OU STARTING                                                                                                                         
   RECTABLE  ALLAVE  ${RECTABLE}
   MAXTABLE  ALLAVE  ${MAXTABLE}
   RANKFILE  1 ${MAXTABLE} RANK1.RNK
   MAXIFILE  1 POL1 ${MAXIFILE} MAX1H_POL1.OUT
   SUMMFILE  AERTEST.SUM  
   PLOTFILE  1 POL1 FIRST AERMOD_1.PLT
OU FINISHED`;
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

exports.generateAermodFile = async (req, res, next) => {
    const file1Type = req.files[0].originalname.split('.');
    const file2Type = req.files[1].originalname.split('.');
    const file3Type = req.files[2].originalname.split('.');
    try {
        if(file1Type[1] !== "SFC"){
            return res.status(400).json({
                message: "El tipo de archivo es incorrecto"
            });
        }
        if(file2Type[1] !== "ROU"){
            return res.status(400).json({
                message: "El tipo de archivo es incorrecto"
            });
        }
        if(file3Type[1] !== "PFL"){
            return res.status(400).json({
                message: "El tipo de archivo es incorrecto"
            });
        }
        const data = JSON.parse(req.body.data);
        const {AVERTIME, POLLUTID, RECTABLE, MAXTABLE, MAXIFILE, stacks} = data;
        fs.writeFileSync('aermod.inp', returnEntries(AVERTIME, POLLUTID) + returnFuentes(stacks) + returnFuentesStacks(stacks) + returnExitVariables(RECTABLE, MAXTABLE, MAXIFILE), err => {
            if (err) {
              console.error(err);
            }
          });
        res.contentType('application/octet-stream');
        execFile(path.join(__dirname, '../../aermod.exe'), [], (error, stdout, stderr) => {
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

exports.getAermodRNK = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../RANK1.RNK'), (err, data) => {
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

exports.getAermodOUT = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../aermod.out'), (err, data) => {
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

exports.getAermodPLT = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../AERMOD_1.PLT'), (err, data) => {
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

exports.getAermodSUM = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../AERTEST.SUM'), (err, data) => {
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