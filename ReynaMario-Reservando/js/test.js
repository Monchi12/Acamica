var expect = chai.expect;

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::
           Inicio de las pruebas de Restaurante
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/

describe("Test de Restaurantes", function () {
    describe('Reservar Horario', function () {
        var restaurant;
        var horariosOriginal;
        var horariosControl;

        beforeEach(function () {
            //["13:00", "15:30", "18:00"]
            restaurant = listaPrueba().restaurantes[1];
            horariosControl = restaurant.horarios.slice();
        })

        it('Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.', function () {
            var horarioReservar = horariosControl[2];
            restaurant.reservarHorario(horarioReservar);
            expect(restaurant.horarios).to.not.have.length(horariosControl.length )
            //expect(horariosOriginal.length < horariosControl.length,'Tester, no quiero asustarte, pero talvez tu array, tu array no tiene el tamaño correcto !!!!!!' ).to.be.true; 
        })

        it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.', function () {
            restaurant.reservarHorario('20:00');
            expect(restaurant.horarios).to.eql(horariosControl);
        })

        it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.', function () {
            restaurant.reservarHorario();
            expect(restaurant.horarios).to.eql(horariosControl);
        })
    });

    describe('Obtener Puntuacion', function () {
        var restaurant;
        var promedioOriginal;
        //var calificacionesOriginal;

        beforeEach(function () {
            restaurant = listaPrueba().restaurantes[1];
            //calificacionesOriginal = restaurant.calificaciones;        
        })

        it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.', function () {
            var calificacionesControl;
            calificacionesControl = restaurant.calificaciones.slice();
            promedioControl = calificacionesControl.reduce((previous, current) => current += previous) / calificacionesControl.length;
            promedioOriginal = restaurant.obtenerPuntuacion();
            expect(promedioOriginal, '').to.be.equal(promedioControl);
        });

        it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0', function () {
            restaurant.calificaciones = [];
            promedioOriginal = restaurant.obtenerPuntuacion();
            expect(promedioOriginal, '').to.be.equal(0);
        });
    });

    describe('Calificar Restaurante', function () {
        var restaurant;
        var calificacionesOriginal;
        //var calificacionesControl;
        //[7, 7, 3, 9, 7]    
        beforeEach(function () {
            restaurant = listaPrueba().restaurantes[1];
            calificacionesOriginal = restaurant.calificaciones;
            //calificacionesControl = restaurant.calificaciones.slice();
            calificacion = 0;
        })

        it('La calificación ingresada sea un numero que pertenezca al conjunto A,  A= {x/x pertenece R , x > 0  x < 10}', function () {
            calificacion = 8;
            restaurant.calificar(calificacion);
            expect(calificacionesOriginal).to.be.include(calificacion);
        });

        it('La calificación ingresada sea un numero negativo y no sea agregada al array de calificaciones', function () {
            calificacion = -2;
            restaurant.calificar(calificacion);
            expect(calificacionesOriginal, "La calificacion ingresada es negativa").that.does.not.include(calificacion);
        });

        it('La calificación ingresada sea un numero con valores decimales y no sea agregada al array de calificaciones', function () {
            calificacion = 1.5;
            restaurant.calificar(calificacion);
            expect(calificacionesOriginal).that.does.not.include(calificacion);
        });

        it('La calificación ingresada sea un string y no sea agregada al array de calificaciones', function () {
            calificacion = 'A';
            restaurant.calificar(calificacion);
            expect(calificacionesOriginal).that.does.not.include(calificacion);
        });

    });
});
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::  
           Fin de las pruebas de Restaurante
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::
           Inicio de las pruebas de la Lista de Restaurantes
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/
describe("Test Lista de Restaurantes", function () {
    describe('Buscar Restaurante', function () {
        var listaRestaurantes;
        var restaurantControl;
        var id;
        beforeEach(function () {
            listaRestaurantes = listaPrueba();
            restaurantControl = listaRestaurantes.restaurantes[0]
            
        })

        it('Al buscar un ID registrado nos devuelve el restaurente correcto.', function () {       
            id = 1;     
            var restaurant = listaRestaurantes.buscarRestaurante(id);            
            expect(restaurant.id).to.be.equal(restaurantControl.id);

        })

        it('Al buscar un ID no registrado nos devuelve el mensaje de error "No se ha encontrado ningún restaurant".', function () {
            id = 100;
            var restaurant = listaRestaurantes.buscarRestaurante(id);  
            expect(restaurant ).to.eql("No se ha encontrado ningún restaurant");
        })

        it('Al buscar un string nos devuelve el mensaje de error "No se ha encontrado ningún restaurant".', function () {
            id = "AA";
            var restaurant = listaRestaurantes.buscarRestaurante(id);  
            expect(restaurant ).to.eql("No se ha encontrado ningún restaurant");
        })
    })

    describe('Obtener Restaurante', function () {
        var listaRestaurantes;
        var listaFiltrada;
        beforeEach(function () {
            listaRestaurantes = listaPrueba();            
        })

        it('Al filtrar sin filtros me devuelve el listado de restaurantes completo', function() {
            listaFiltrada = listaRestaurantes.obtenerRestaurantes(null,null,null)
            expect(listaFiltrada).to.have.length(24)
          });
    
          it('Al filtrar solo con la ciudad me devuelve el listado con los restuarantes de la ciudad', function() {
            listaFiltrada = listaRestaurantes.obtenerRestaurantes(null,'Londres',null)
            expect(listaFiltrada).to.have.length(4)
          });
    
          it('Al filtrar solo con una comida me devuelve el listado con los restuarantes dicha comida', function() {
            listaFiltrada = listaRestaurantes.obtenerRestaurantes('Ensalada',null,null)
            expect(listaFiltrada).to.have.length(4)
          });
    
          it('Al filtrar solo con la ciudad me devuelve el listado con los restuarantes de la ciudad', function() {
            listaFiltrada = listaRestaurantes.obtenerRestaurantes(null,null,'17:30')
            expect(listaFiltrada).to.have.length(7)
          });
    
          it('Funciona correctamente utilizando los filtros de ciudad, rubro y horario', function() {
            listaFiltrada = listaRestaurantes.obtenerRestaurantes('Asiática','Berlín','12:00')
            expect(listaFiltrada).to.have.length(1)
          });    
    })

})
/* :::::::::::::::::::::::::::::::::::::::::::::::::::::
           Fin de las pruebas de la Lista de Restaurantes
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::
           Inicio de las pruebas de las reservas
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    describe("Test Realizar Reserva",function(){
        // (horario, cantPersonas, precioPersona, codDescuento) 
        describe ("Constructor",function(){     
            var nuevaReserva;      
           /* it('La fecha tiene que ser un objeto Date',function(){
                nuevaReserva = () =>  new Reserva("12:30",6,200,"DES200");
                expect(nuevaReserva).to.throw();                
            });
            it('La cantidad de personas tiene que ser un numero',function(){
                nuevaReserva = () => new Reserva(new Date(2020, 1, 10, 05, 00),"algunos",200,"DES200");
                expect(nuevaReserva).to.throw();                
            });
            it('El precio por persona tiene que ser un numero',function(){
                nuevaReserva = () => new Reserva(new Date(2020, 1, 10, 05, 00),6,200,"DES200");
                expect(nuevaReserva).to.throw();                
            });*/
            it('El codigo de descuento tiene que ser un String',function(){
                nuevaReserva = () => new Reserva(new Date(2020, 1, 10, 05, 00),6,200,"DES200");
                expect(nuevaReserva).to.not.throw();                
            });
        })

        describe ("Descuentos y Adicionales",function(){
            it('Se calcula el precio base correctamente',function(){
                var precioBase  = new Reserva (new Date(2020, 1, 10, 05, 00), 8, 350, "DES1").calcularPrecioBase();
                expect(precioBase).to.equal(2800);
            })
        })

        describe ("Precios Base y Final",function(){
            it('Se calcula el precio final correctamente',function(){
                var precioFinal  = new Reserva (new Date(2020, 1, 10, 05, 00), 8, 350, "DES1").precioTotalReserva();
                expect(precioFinal).to.equal(2170); 
            })
        })
    });


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::
           Fin de las pruebas de las reservas
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::
           Creacion de los objetos para las Pruebas
   :::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function listaPrueba() {
    var listadoDeRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
        new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
        new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
        new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
        new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
        new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
        new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
        new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
        new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7,]),
        new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
        new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
        new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
        new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
        new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
        new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
        new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
        new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
        new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
        new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
        new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
    ];
    return new Listado(listadoDeRestaurantes);
}


/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
           Fin de la Creacion de los objetos para las Pruebas
   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/