var con = require("../lib/conexionbd");


function listarPeliculas(req, res) {
    //var orden = req.query.orden;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;
    var filtros = [];
    var condiciones = Object.keys(req.query);
    let sql = "SELECT * FROM PELICULA";
    let sqlTotal = `SELECT COUNT(*) FROM PELICULA`;
    condiciones.forEach(condicion => {
        if (condicion != 'pagina' &&
            condicion != 'cantidad' &&
            condicion != 'columna_orden' &&
            condicion != 'tipo_orden') {
            switch (condicion) {
                case 'titulo':
                    filtros.push(`titulo like '%${req.query.titulo}%'`);
                    break;
                case 'genero':
                    filtros.push(`genero_id  = ${req.query.genero}`);
                    break;
                default:
                    filtros.push(`${condicion} = ${req.query[condicion]}`);
                    break;
            }
        }
    });

    if (filtros.length != 0) {
        sql += " where " + filtros.join(" and ");
        sqlTotal += " where " + filtros.join(" and ");
    };

    sql += ` ORDER BY ${req.query.columna_orden} ${req.query.tipo_orden}`;
    sql += ` LIMIT ${(pagina - 1) * cantidad}, ${cantidad}`;

    con.query(sql, function (error, resultado, fields) {
        con.query(sqlTotal, function (error, resultadoTotal, fields) {
            if (error) {
                console.log("Ocurrio el un error al realizar la consulta", error.message);
                return res.status(500).send("Ocurrio el un error al realizar la consulta");
            } 
            var respuesta = {
                peliculas: resultado,
                total: resultadoTotal[0]['COUNT(*)']
            };
            res.send(JSON.stringify(respuesta))
        });
    });
}

function listarGeneros(req, res) {

    let sql = "SELECT * FROM GENERO"

    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error al realizar la consulta");
        }
        var respuesta = { generos: resultado };
        res.send(JSON.stringify(respuesta))
    });
}

function listaRecomendadas(req, res) {
    var filtros = [];
    var condiciones = Object.keys(req.query);
    let sql = "SELECT p.id, p.titulo, p.duracion, p.trama, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion, p.poster,g.id as idGenero, g.nombre FROM PELICULA P, GENERO G WHERE P.GENERO_ID = G.ID "
    condiciones.forEach(condicion => {
        if (condicion != 'anio_fin') {
            switch (condicion) {
                case 'genero':
                    filtros.push(`g.nombre like '%${req.query.genero}%'`);
                    break;
                case 'anio_inicio':
                    filtros.push(`p.anio between ${req.query.anio_inicio} and ${req.query.anio_fin}`);
                    break;
                case 'puntuacion':
                    filtros.push(`p.puntuacion  >= ${req.query.puntuacion}`);
                    break;
                default:
                    filtros.push(`${condicion} = ${req.query[condicion]}`);
                    break;
            }
        }
    });

    if (filtros.length != 0) {
        sql += "and " + filtros.join(" and ");
    };
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error al realizar la consulta");
        }
        var respuesta = { peliculas: resultado };
        res.send(respuesta)
    });
}

function buscarPelicula(req, res) {
    /*var sql = `SELECT p.id, p.titulo, p.duracion, p.trama, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion, 
                      p.poster,a.id as id_Actores, a.nombre as actores, g.nombre 
                 FROM PELICULA P, ACTOR_PELICULA AP, GENERO G,ACTOR A 
                WHERE P.ID = AP.PELICULA_ID AND P.GENERO_ID = G.ID AND AP.ACTOR_ID = A.ID  AND P.ID = ${req.param('id')};`;*/
    var sql = `SELECT p.id, p.titulo, p.duracion, p.trama, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion, p.poster, g.nombre FROM PELICULA P, GENERO G 
               WHERE  P.GENERO_ID = G.ID AND P.ID = ${req.param('id')};`;
    var sqlActor = `SELECT a.nombre FROM ACTOR A, ACTOR_PELICULA AC WHERE A.ID = AC.ACTOR_ID AND AC.PELICULA_ID = ${req.param('id')};`;


    con.query(sql, function (error, resultado, fields) {
        con.query(sqlActor, function (error, resultadoActor, fields) {
            if (error) {
                console.log("Ocurrio el un error al realizar la consulta", error.message);
                return res.status(500).send("Ocurrio el un error al realizar la consulta");
            }
            var respuesta = {
                'pelicula': resultado[0],
                'actores': resultadoActor,
                'genero': resultado[0]
            };
            res.send(JSON.stringify(respuesta))
        });
    });
}

module.exports = {
    listarPeliculas: listarPeliculas,
    listarGeneros: listarGeneros,
    listaRecomendadas: listaRecomendadas,
    buscarPelicula: buscarPelicula
};
