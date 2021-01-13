var Reserva = function (horario, cantPersonas, precioPersona, codDescuento) {

    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioPersona = precioPersona;
    this.codDescuento = codDescuento;

    /*if(typeof this.cantPersonas !== 'number') throw new Error;
    if(typeof this.horario !== Date) throw new Error;
    if(typeof this.precioPersonas !== 'number') throw new Error;
    */
    if(typeof this.codDescuento !== "string") throw new Error;
}

Reserva.prototype.calcularPrecioBase = function () {    
    return this.cantPersonas * this.precioPersona;
}

Reserva.prototype.precioTotalReserva = function () {
    var precioBase = this.calcularPrecioBase();
    return precioBase + this.calcularAdicionales(precioBase) - this.calcularDescuentos(precioBase)
    
}

Reserva.prototype.calcularDescuentos = function (precioBase) {
    return this.cacularDescuentosPorCodigo(precioBase) + this.cacularDescuentosPorGrupo(precioBase);
}

Reserva.prototype.cacularDescuentosPorCodigo = function (precioBase) {
    switch (this.codDescuento) {
        case 'DES15':
            return precioBase * .15;
        case 'DES200':
            return 200;
        case 'DES1':
            return this.precioPersona;
    }
}

Reserva.prototype.cacularDescuentosPorGrupo = function (precioBase) {
    switch (true) {
        case this.cantPersonas >= 4 && this.cantPersonas <= 6:
            return precioBase * .05;
        case this.cantPersonas >= 7 && this.cantPersonas <= 8:
            return precioBase * .10;
        case this.cantPersonas > 8:
            return precioBase * .15;
    }
}

Reserva.prototype.calcularAdicionales = function (precioBase) {
    return this.calcularAdicionalesPorDia(precioBase) + this.calcularAdicionalesPorHorario(precioBase);
}

Reserva.prototype.calcularAdicionalesPorDia = function (precioBase) {
    var dia = this.horario.getDay();
    if (dia === 5 || dia == 6 || dia == 0) {
        return precioBase * .10;
    }
    return 0;
}

Reserva.prototype.calcularAdicionalesPorHorario = function (precioBase) {
    var hora = this.horario.getHours();
    if ((hora >= 13 && hora <= 14) || (hora >= 20 && hora <= 21)) {
        return precioBase * .05
    }
    return 0;
}

