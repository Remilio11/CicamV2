const express = require('express');
const { generateAermodFile, getAermodRNK, getAermodOUT, getAermodPLT, getAermodSUM } = require('../controllers/aermod/aermodController');
const router = express.Router();
const multer = require('../libs/multerAermod');

router.post('/', multer.array('files'), generateAermodFile);

router.post('/getRNK', getAermodRNK);

router.post('/getOUT', getAermodOUT);

router.post('/getPLT', getAermodPLT);

router.post('/getSUM', getAermodSUM);

module.exports = router;