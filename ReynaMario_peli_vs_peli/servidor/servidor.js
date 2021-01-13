//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var competenciasController = require('./controladores/competenciasController');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ 
    extended: true
}));

app.use(bodyParser.json());


app.get('/competencias', competenciasController.buscarCompetencias);
app.post('/competencias', competenciasController.crearCompetencia);

app.get('/competencias/:id/peliculas', competenciasController.buscarOpciones);
app.post('/competencias/:id/voto',competenciasController.votarPelicula);
app.get('/competencias/:id/resultados',competenciasController.obternerVotos);
app.get('/competencias/:id',competenciasController.obtenerCompetencia);

app.put('/competencias/:id', competenciasController.editarCompetencia);

app.delete('/competencias/:id/votos',competenciasController.elimiarVotos);
app.delete('/competencias/:id', competenciasController.eliminarCompetencia);

app.get('/generos', competenciasController.cargarGeneros);
app.get('/directores', competenciasController.cargarDirectores);
app.get('/actores', competenciasController.cargarActores);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

