const express = require('express');
const { getAermetData, getAermetSFCFile, getAermetPFLFile } = require('../controllers/aermet/aermetController');
const multer = require('../libs/multer');
const router = express.Router();

// @Route api/aermet
// @Required params:
            // {file} NameFile.fsl extension
            // {file} NameFile.dat extension
// @Description:
            // This route get 2 file, execute aermet.exe and return 2 files to frontend
// @Response:
            // 1. NameFile.sfc
            // 2. NameFile.pfl
// @Access: public
router.post('/', multer.array('files'), getAermetData);


router.post('/getSFC', getAermetSFCFile);

router.post('/getPFL', getAermetPFLFile);

module.exports = router;