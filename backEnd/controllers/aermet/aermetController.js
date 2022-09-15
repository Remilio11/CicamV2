const execFile = require('child_process').execFile;
const fs = require('fs');
const path = require('path');

const validator = (req, next) => {
    let positionInArray1 = false;
    let positionInArray1Type = '';
    let positionInArray2 = false;
    let positionInArray2Type = '';
    if(req.files.length > 2 || req.files.length <= 1 || req.files === undefined){
        return res.status(404).send({
            message: 'Usted tiene que enviar 2 archivos'
        });
    }
    /**
     * Verificacion de Nombres
     */
    if((req.files[0].originalname.split('.')[1] == 'FSL') || (req.files[0].originalname.split('.')[1] == 'fsl') || (req.files[0].originalname.split('.')[1] == 'DAT') || (req.files[0].originalname.split('.')[1] == 'dat')){
        positionInArray1 = true;
        positionInArray1Type = req.files[0].originalname.split('.')[1];
    }
    if((req.files[1].originalname.split('.')[1] == 'FSL') || (req.files[1].originalname.split('.')[1] == 'fsl') || (req.files[1].originalname.split('.')[1] == 'DAT') || (req.files[1].originalname.split('.')[1] == 'dat')){
        positionInArray2 = true;
        positionInArray2Type = req.files[1].originalname.split('.')[1];
    }
    if(!positionInArray1 || !positionInArray2){
        return res.status(404).send({
            message: 'You only can upload files with extension .FSL or .DAT'
        });
    };
    if(positionInArray1Type === positionInArray2Type){
        return res.status(404).send({
            message: 'Files must be different'
        });
    }
    return {
        positionInArray1Type,
        positionInArray2Type
    }
}

exports.getAermetData = async (req, res, next) => {
    try {
        const dataAferValidate = validator(req, next);

        // Step 1
        // Rename files uploaded by user
        if(dataAferValidate.positionInArray1Type === 'FSL'){
            fs.renameSync(`${req.files[0].path}`, path.join(__dirname, '../../MET2119246_AERMET_2019-2020.FSL'));
        }else{
            fs.renameSync(`${req.files[0].path}`, path.join(__dirname, '../../MET2119246_AERMET_2019-2020.DAT'));
        }

        if(dataAferValidate.positionInArray2Type === 'FSL'){
            fs.renameSync(`${req.files[1].path}`, path.join(__dirname, '../../MET2119246_AERMET_2019-2020.FSL'));
        }else{
            fs.renameSync(`${req.files[1].path}`, path.join(__dirname, '../../MET2119246_AERMET_2019-2020.DAT'));
        }

        // Paso 2
        // Cambio de nombre de n1 a aermet para ser ejecutado, y asi sucecivamente con los n2 y n3
        fs.renameSync(path.join(__dirname, '../../n1.inp'), path.join(__dirname, '../../aermet.inp'));
        execFile(path.join(__dirname, '../../aermet.exe'), [], (error, stdout, stderr) => {
            if (error) {
                return res.status(404).send({
                    error
                });
            }
            fs.renameSync(path.join(__dirname, '../../aermet.inp'), path.join(__dirname, '../../n1.inp'));
            // Sub Step 1
            // Change n2 to aermet, execute aermet.exe and rename aermet to n2 again
            fs.renameSync(path.join(__dirname, '../../n2.inp'), path.join(__dirname, '../../aermet.inp'));
            execFile(path.join(__dirname, '../../aermet.exe'), [], (error, stdout, stderr) => {
                if (error) {
                    return res.status(404).send({
                        error
                    });
                }
                fs.renameSync(path.join(__dirname, '../../aermet.inp'), path.join(__dirname, '../../n2.inp'));
                fs.renameSync(path.join(__dirname, '../../n3.inp'), path.join(__dirname, '../../aermet.inp'));
                execFile(path.join(__dirname, '../../aermet.exe'), [], (error, stdout, stderr) => {
                    if (error) {
                        return res.status(404).send({
                            error
                        });
                    }
                    fs.renameSync(path.join(__dirname, '../../aermet.inp'), path.join(__dirname, '../../n3.inp'));
                    res.status(200).send({
                        message: 'Se ha generado los datos exitosamente'
                    })
                });
            });
        });
    } catch (error) {
        next(new Error(error));
    }
}

exports.getAermetSFCFile = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../MET2119246_AERMET_2019-2020.SFC'), (err, data) => {
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
exports.getAermetPFLFile = async (req, res, next) => {
    try {
        res.contentType('application/octet-stream');
        fs.readFile(path.join(__dirname, '../../MET2119246_AERMET_2019-2020.PFL'), (err, data) => {
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