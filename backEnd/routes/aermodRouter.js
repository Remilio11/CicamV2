const express = require('express');
const { generateAermapFile } = require('../controllers/aermod/aermodController');
const router = express.Router();

router.post('/', generateAermodFile);

module.exports = router;