const registromodel = require("../models/registromodel");

exports.registrarPersona = async (req, res) => {
    
    try{
        let persona;

        //Registramos persona
        persona = new registromodel(req.body);

        await persona.save();
        res.send(persona);

    }catch{
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}