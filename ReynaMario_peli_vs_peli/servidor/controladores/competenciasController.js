var con = require("../lib/conexionbd");

function buscarCompetencias(req, res) {

    let sql = "SELECT id, nombre, filtro FROM COMPETENCIAS;";
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error al realizar la consulta");
        }
        res.send(resultado);
    });
}

function crearCompetencia(req, res) {
    var competencia = req.body.nombre;
    var generoId = req.body.genero;
    var directorId = req.body.director;
    var actorId = req.body.actor;
    var filtros = [];
    var filtro;
    var condiciones = Object.keys(req.body);
    var sqlControlCantidad = `SELECT count(*) cantidadPeliculas
                        FROM PELICULA P, GENERO G, ACTOR_PELICULA AP, DIRECTOR_PELICULA DP, ACTOR A, DIRECTOR D       
                       WHERE P.GENERO_ID = G.ID
                         AND P.ID = AP.PELICULA_ID
                         AND P.ID = DP.PELICULA_ID
                         AND AP.ACTOR_ID = A.ID 
                         AND DP.DIRECTOR_ID = D.ID `;
    var sqlCreaCompetencia = `INSERT INTO COMPETENCIAS (nombre,filtro) VALUES ('${competencia}','${filtros}')`;
    var sqlControlNombre = `select 1
                    from competencias
                   where REPLACE(upper(nombre), ' ', '') = REPLACE(upper('${competencia}'), ' ', '')`;

    con.query(sqlControlNombre, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error al realizar la consulta");
        }
        if (!resultado.length) {
            condiciones.forEach(condicion => {
                switch (condicion) {
                    case 'genero':
                        if (generoId != 0) {
                            filtros.push(` G.ID =  ${generoId}`);
                        }
                        break;
                    case 'director':
                        if (directorId != 0) {
                            filtros.push(` D.ID =  ${directorId}`);
                        }
                        break;
                    case 'actor':
                        if (actorId != 0) {
                            filtros.push(` A.ID  = ${actorId}`);
                        }
                        break;
                }
            });

            if (filtros.length !== 0) {
                filtro += filtros.join(" and ");
                sqlControlCantidad += " AND " + filtros.join(" and ");
            };

            con.query(sqlControlCantidad, function (error, resultado, fields) {
                if (error) {
                    console.log("Ocurrio el un error al realizar la consulta", error.message);
                    return res.status(500).send("Ocurrio el un error al realizar la consulta");
                }
               // console.log("sqlControlCantidad: " + sqlControlCantidad);
                //console.log("resultado[0].cantidadPeliculas " + resultado[0].cantidadPeliculas)
                if (resultado[0].cantidadPeliculas >= 2) {
                    con.query(sqlCreaCompetencia, function (error, resultado, fields) {
                        if (error) {
                            console.log("Ocurrio el un error al realizar la consulta", error.message);
                            return res.status(500).send("Ocurrio el un error al realizar la consulta");
                        }
                        res.send(resultado);
                    });
                } else {
                    return res.status(422).send("La cantida de peliculas para esta competencia tiene que ser mayor o igual a 2");
                }
            });
        } else {
            return res.status(422).send("La competencia que quiere crear ya existe");
        }
    });

}

function eliminarCompetencia(req, res) {
    var comptenciaId = req.params.id;
    let sqlEliminaComp = `delete from competencias where id = ${comptenciaId}`;
    let sqlEliminaVotos = `delete from voto where competencia_id = ${comptenciaId}`;

    con.query(sqlEliminaVotos, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error, los votos para esta competencia no existen");
        }
        con.query(sqlEliminaComp, function (error, resultado) {
            if (error) {
                console.log("Error al eliminar la competencia", error.message);
                return res.status(500).send("Error al eliminar competencia");
            }
            res.send(resultado);
        });
        //res.send(resultado);
    });
}

function editarCompetencia(req, res) {
    var comptenciaId = req.params.id;
    var nombreCompetencia = req.body.nombre;
    let sqlModifica = `update  competencias set nombre = "${nombreCompetencia}" where id = ${comptenciaId}`;

    console.log('nombreCompetencia ' + nombreCompetencia);
    console.log('sqlModifica: ' + sqlModifica);

    con.query(sqlModifica, function (error, resultado, fields) {
        if (error) {
            return res.status(500).send("Error al modificar la competencia")
        }
        if (resultado.length == 0) {
            console.log("No se encontro la competencia buscada con ese id");
            return res.status(404).send("No se encontro ninguna competencia con ese id");
        } else {
            var response = {
                'id': resultado
            };
        }
        res.send(response);
    });

}

function obtenerCompetencia(req, res) {
    let idCompetencia = req.params.id;
    let sqlcompetencia = `select c.id,c.nombre ,d.nombre director, g.nombre genero, a.nombre actor
                            from (select id, nombre,filtro,
                                         SUBSTRING_INDEX(TRIM(SUBSTRING_INDEX(SUBSTRING(filtro,INSTR(filtro, 'G.')),' AND ',1)), ' ',-1) genero_id,
                                         SUBSTRING_INDEX(TRIM(SUBSTRING_INDEX(SUBSTRING(filtro,INSTR(filtro, 'A.')),' AND ',1)), ' ',-1) actor_id,
                                         SUBSTRING_INDEX(TRIM(SUBSTRING_INDEX(SUBSTRING(filtro,INSTR(filtro, 'D.')),' AND ',1)), ' ',-1) director_id    
                                    from competencias
                                   where id = ${idCompetencia}) c
                            left join director d on c.director_id = d.id
                            left join genero g on c.genero_id = g.id
                            left join actor a on c.actor_id = a.id`;
    con.query(sqlcompetencia, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error, la competencia no existe");
        }
        var response = {
            'id': resultado,
            'nombre': resultado[0].nombre,
            'genero_nombre': resultado[0].genero,
            'actor_nombre': resultado[0].actor,
            'director_nombre': resultado[0].director
        }
        //res.send(JSON.stringify(response));
        res.send(response);
    });

}

function buscarOpciones(req, res) {

    let sqlCompetencias = `SELECT * FROM COMPETENCIAS WHERE ID = ${req.params.id};`;
    let sqlPeliculas = `SELECT p.id, p.poster, p.titulo, g.nombre genero, a.nombre actor, d.nombre director
                        FROM PELICULA P,
                            GENERO G,
                            ACTOR_PELICULA AP,
                            DIRECTOR_PELICULA DP,
                            ACTOR A,
                            DIRECTOR D       
                    WHERE P.GENERO_ID = G.ID
                        AND P.ID = AP.PELICULA_ID
                        AND P.ID = DP.PELICULA_ID
                        AND AP.ACTOR_ID = A.ID 
                        AND DP.DIRECTOR_ID = D.ID `;

    con.query(sqlCompetencias, function (error, rCompetencias, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(404).send("La competencia solicitada no existe");
        }
        var competencia, condiciones = rCompetencias;
        // var condiciones = rCompetencias;

        if (condiciones != null) {
            sqlPeliculas += `${condiciones[0].filtro} ORDER BY RAND() LIMIT 2;`;
        }
        con.query(sqlPeliculas, function (error, rPeliculas, fields) {
            if (error) {
                console.log("Ocurrio el un error al realizar la consulta", error.message);
                return res.status(500).send("Ocurrio el un error al realizar la consulta de pelicuas a votar");
            }
            var respuesta = {
                'competencia': competencia,
                'peliculas': rPeliculas
            }
            res.send(respuesta);
        });
    });

}

function votarPelicula(req, res) {
    var idCompetencia = req.params.id;
    var idPelicula = req.body.idPelicula;
    let sqlInsert = `insert into voto (competencia_id,pelicula_id) values (${idCompetencia},${idPelicula});`;

    console.log('idPelicula: ' + idPelicula);
    console.log('sqlInsert: ' + sqlInsert);
    con.query(sqlInsert, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error al realizar el registro del voto en base de datos");
        }
        res.send(true);
    });
}

function obternerVotos(req, res) {
    var idCompetencia = req.params.id; //req.param('id')
    let sqlCompetencias = `SELECT * FROM COMPETENCIAS WHERE ID = ${idCompetencia};`;
    let sqlVotos = `select p.id, p.poster, p.titulo, count(v.pelicula_id) votos
                      from voto v,
                           pelicula p
                     where v.pelicula_id = p.id 
                        and v.competencia_id = ${idCompetencia}
                      group by p.id
                      order by 4 desc limit 3;`;
    con.query(sqlCompetencias, function (error, rCompetencias, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("La competencia solicitada no existe");
        }
        //var competencia, condiciones = rCompetencias;
        var competencia = rCompetencias[0];
        con.query(sqlVotos, function (error, rVotos, fields) {
            if (error) {
                console.log("Ocurrio el un error al realizar la consulta", error.message);
                return res.status(500).send("Ocurrio el un error al realizar la consulta de las pelicuas mas votadas");
            }
            //console.log('rVotos ' + rVotos)
            let response = {
                competencia: competencia.nombre,
                resultados: rVotos
            }
            //res.send(JSON.stringify(response));
            res.send(response);
        });
    });
}

function elimiarVotos(req, res) {
    var comptenciaId = req.params.id;
    let sqlElimina = `delete from voto where competencia_id = ${comptenciaId}`;
    con.query(sqlElimina, function (error, resultado, fields) {
        if (error) {
            console.log("Ocurrio el un error al realizar la consulta", error.message);
            return res.status(500).send("Ocurrio el un error, los votos para esta competencia no existen");
        }
        res.send(resultado);
    });
}

function cargarGeneros(req, res) {
    var sql = "SELECT * FROM GENERO;";
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta, no se pudo recuperar los generos", error.message);
            return res.status(500).send("Hubo un error en la consulta, no se pudo recuperar los generos");
        }
        res.send(JSON.stringify(resultado));
    });
}

function cargarDirectores(req, res) {
    var sql = "SELECT * FROM DIRECTOR;";
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta, no se pudo recuperar los directores", error.message);
            return res.status(500).send("Hubo un error en la consulta, no se pudo recuperar los directores");
        }
        res.send(JSON.stringify(resultado));
    });
}

function cargarActores(req, res) {
    var sql = "SELECT * FROM ACTOR;";
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta, no se pudo recuperar los directores ", error.message);
            return res.status(404).send("Hubo un error en la consulta, no se pudo recuperar los directores");
        }
        res.send(JSON.stringify(resultado));
    });
}

module.exports = {
    buscarCompetencias: buscarCompetencias,
    crearCompetencia: crearCompetencia,
    eliminarCompetencia: eliminarCompetencia,
    editarCompetencia: editarCompetencia,
    obtenerCompetencia: obtenerCompetencia,
    buscarOpciones: buscarOpciones,
    votarPelicula: votarPelicula,
    obternerVotos: obternerVotos,
    elimiarVotos: elimiarVotos,
    cargarGeneros: cargarGeneros,
    cargarDirectores: cargarDirectores,
    cargarActores: cargarActores,


}
