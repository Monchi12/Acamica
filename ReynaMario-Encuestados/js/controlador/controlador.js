/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },

  editarPregunta: function(id) {
    this.modelo.editarPregunta(id);
  },

  borrarTodo: function() {
    this.modelo.borrarTodo();
  },

  agregarVoto: function(pregunta,respuesta){
    this.modelo.agregarVoto(pregunta,respuesta);
  }

};
