
//Rutas para Persona
const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registrocontroller');

//api/persona
router.post('/', registroController.registrarPersona);

module.exports = router;