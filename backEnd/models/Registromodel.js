const mongoose = require('mongoose');

const RegistroSchema = mongoose.Schema({
    nya: {
        type: String,
        require: true
    },
    nick: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('persona', RegistroSchema);