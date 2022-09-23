const express = require('express');
const { getAermapData, generateAermapFile, getAermapROU } = require('../controllers/aermap/aermapController');
const multerAermap = require('../libs/multerAermap');
const router = express.Router();

router.post('/', multerAermap.array('files'), generateAermapFile);

router.post('/generate-aermap', getAermapData);

router.post('/getSFC', getAermapROU);

module.exports = router;