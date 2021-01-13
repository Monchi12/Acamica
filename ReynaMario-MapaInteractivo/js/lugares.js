lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
    
      var busqueda = document.getElementById('direccion');
      var desde = document.getElementById('desde');
      var hasta = document.getElementById('hasta');
      var agregar = document.getElementById('agregar');
      var opciones = {type : ['geocode', 'establishment'],
                     strictBounds: true};
      
      var autocompletarBusqueda = new google.maps.places.Autocomplete(busqueda,  opciones);
      var autocompletarDesde = new google.maps.places.Autocomplete(desde,  opciones);
      var autocompletarHasta = new google.maps.places.Autocomplete(hasta,  opciones);
      var autocompletarAgregar = new google.maps.places.Autocomplete(agregar,  opciones);

      var circulo = new google.maps.Circle(
        {
          center: posicionCentral,
          radius: 20000,
          map: mapa,
          visible: false         
        }
      );
      
      autocompletarBusqueda.setBounds(circulo.getBounds());
      autocompletarDesde.setBounds(circulo.getBounds());
      autocompletarHasta.setBounds(circulo.getBounds());
      autocompletarAgregar.setBounds(circulo.getBounds());

  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */
    var tipoLugar = document.getElementById('tipoDeLugar').value;
    var radio = document.getElementById('radio').value;

    var request = {
      location: posicion,
      radius: radio,
      type: tipoLugar
    }
    servicioLugares.nearbySearch(request, marcadorModulo.marcarLugares  );

  }
  return {
    inicializar,
    buscarCerca
  }
})()
