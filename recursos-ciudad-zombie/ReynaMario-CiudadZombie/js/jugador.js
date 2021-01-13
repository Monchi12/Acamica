 /* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
  */
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  // y todo lo que haga falta para que cumpla con sus responsabilidades
  perderVidas: function (cantVidas) {
    if (this.vidas >= 0) {
      this.vidas -= cantVidas;  
    }    
  },

  mover: function (x, y, direcion) {
    switch (direcion) {
      case 'izq':
        this.alto = 15;
        this.ancho = 30;
        this.sprite = "imagenes/auto_rojo_izquierda.png";
        break;
      case 'arriba':
        this.alto = 30;
        this.ancho = 15;
        this.sprite = "imagenes/auto_rojo_arriba.png";
        break;
      case 'der':
        this.alto = 15;
        this.ancho = 30;
        this.sprite = "imagenes/auto_rojo_derecha.png";
        break;
      case 'abajo':
        this.alto = 30;
        this.ancho = 15;
        this.sprite = "imagenes/auto_rojo_abajo.png";
        break;
    }
    this.x += x;
    this.y += y;
  }


}
