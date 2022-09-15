const express = require('express');
const conectDB = require('./config/db');

const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const cors = require('cors');
const multer = require('multer');

const PORT = 3000;

//Guardar el archivo que viene desde el front

const storage = multer.diskStorage({
    filename: function(res, file, cb){
        //const ext = file.originalname.split('.').pop(); //Aqui se quedo la extensión .pfl, .inp, etc
        const filename = file.originalname; //nombre del archivo
        cb(null, `${filename}`)  //nombre con extencion aermet.inp
    },
    destination: function(res, file, cb){
        cb(null, `./performance/aermet`)
    }
});

const upload = multer({storage})

//creamos el servidor
const app = express();
app.use(cors());

//Conectarnos a la base
conectDB();

//Configuración Middleware
app.use(express.json());

app.use('/api/registro', require('./routes/persona'));
app.use('/api/aermet', require('./routes/aermetRouter'));
app.use('/api/aermap', require('./routes/aermapRouter'));

//Endpoint to Upload files
app.post('/upload', upload.single('myFile') ,(req, res) => {
    res.send({
        data: 'Fichero ok'
    })
});

//Verificación del funcionamiento del Servidor
//Respuesta en el navegador al servidor levantado
app.get('/', (req, res) =>{
    res.send('El servidor backEnd en funcionamiento');
});

app.listen(PORT, () => {
    console.log(`El servidor corre perfectamente por el puerto: ${PORT}`);
})