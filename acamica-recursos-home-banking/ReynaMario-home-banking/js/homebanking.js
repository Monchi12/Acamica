//Declaración de variables
var nombreUsuario = "Reyna Mario";
var saldoCuenta = 50000;
var limiteExtraccion = 3000;
var precioAgua = 350;
var precioTelefono = 425;
var precioLuz = 210;
var precioInternet = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var password = 14221247;



//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

iniciarSesion();

/*---------------------------------------------------------------------
  --------------------- Inicio de Limite de Extraccion ----------------
  ---------------------------------------------------------------------*/

//Función principal de para cambiar el límite de extracción donde se solicita el nuevo límite y 
//se realizar las validación necesarias llamando a las funciones correspondientes
function cambiarLimiteDeExtraccion() {
    var limiteExtraccionAnterior = limiteExtraccion;
    var dinero = operacionDinero("tener de Límite de Extracción");
    if (dinero != false) {
        modificoLimiteExtraccion(dinero);
        actualizarLimiteEnPantalla();
        alert("Límite de Extracción Saldo anterior: " + limiteExtraccionAnterior
            + "\nLímite de Extracción actual: " + limiteExtraccion
        );
    } else {
        alert("Has cancelado la operacion...");
    }
}
//Función que asigna el nuevo límite de extracción que recibe por parámetro
function modificoLimiteExtraccion(dinero) {
    limiteExtraccion = dinero;
}
/*---------------------------------------------------------------------
  --------------------- Fin de Limite de Extraccion -------------------
  ---------------------------------------------------------------------*/



/*---------------------------------------------------------------------
  --------------------- Inicio de Extraer Dinero ----------------------
  ---------------------------------------------------------------------*/
//Función principal de extracción dinero, donde se solicita el dinero a extraer 
function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var dinero = operacionDinero("extraer");
    var verificoMonto = verificoExtraccion(dinero);
    if (dinero != false) {
        if (verificoMonto == true) {
            restarDinero(dinero);
            actualizarSaldoEnPantalla();
            alert("Has retirado: " + dinero
                + "\nSaldo anterior: " + saldoAnterior
                + "\nSaldo actual: " + saldoCuenta
            );
        } else {
            alert(verificoMonto);
        }

    } else {
        alert("Has cancelado la operacion...");
    }
}

//Función que verifica las condiciones para poder realizar la extracción, y retorna un mensaje con el error encontrado o “true” en caso de estar correcta 
function verificoExtraccion(dinero) {
    var mensaje = "";
    switch (true) {
        case (dinero > saldoCuenta):
            mensaje = "No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.";
            return mensaje;
            break;
        case (dinero > limiteExtraccion):
            mensaje = "La cantidad de dinero que deseas extraer es mayor a tu límite de extracción";
            return mensaje;
            break;
        case (!((dinero % 100) == 0)):
            mensaje = "El monto ingresado no puede ser otorgado. El cajera solo da billetes de 100";
            return mensaje;
            break;
        default:
            return true;
            break;
    }
}
/*---------------------------------------------------------------------
  --------------------- Fin de Extraer Dinero ----------------------
  ---------------------------------------------------------------------*/


/*---------------------------------------------------------------------
  --------------------- Inicio de Depositar Dinero --------------------
  ---------------------------------------------------------------------*/
//Función principal de deposito de dinero, donde solicito el dinero a depositar y se llaman a las funciones 
//necesarias para validar lo ingresado y sumar el dinero a la cuenta
  function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var dinero = operacionDinero("depositar");
    if (dinero != false) {
        sumarDinero(dinero);
        actualizarSaldoEnPantalla();
        alert("Has depositado: " + dinero
            + "\nSaldo anterior: " + saldoAnterior
            + "\nSaldo actual: " + saldoCuenta
        );
    } else {
        alert("Has cancelado la operacion...");
    }
}
/*---------------------------------------------------------------------
  --------------------- Fin de Extraer Dinero --------------------
  ---------------------------------------------------------------------*/


/*---------------------------------------------------------------------
  --------------------- Inicio de Pagar Servicio ----------------------
  ---------------------------------------------------------------------*/
//Función pagarServicio(), permite el pago de los servicios de agua luz teléfono e internet   
function pagarServicio() {
    var opcion;
    var confirmar;
    var pagado;
    var saldoAnterior = saldoCuenta;
    var servicio;
    var dineroPagado;
    //Llamo a la función seleccionarServicio() para mostrar el menú de opciones
    opcion = seleccionarServicio();
    do {
        /*Controlo la opción ingresada con una estructura switch, para los casos correcto se llama a la función descuentaDineroCuenta() 
        con el importe del impuesto por parámetro y se setean las variables servicio y dineroPagado, 
        para poder armar el mensaje de alerta con la información pagada. */
        switch (opcion) {
            case "1":
                pagado = descuentaDineroCuenta(precioAgua);
                servicio = "Agua";
                dineroPagado = precioAgua;
                break;
            case "2":
                pagado = descuentaDineroCuenta(precioLuz);
                servicio = "Luz";
                dineroPagado = precioLuz;
                break;
            case "3":
                pagado = descuentaDineroCuenta(precioInternet);
                servicio = "Internet";
                dineroPagado = precioInternet;
                break;
            case "4":
                pagado = descuentaDineroCuenta(precioTelefono);
                servicio = "Telefono";
                dineroPagado = precioTelefono;
                break;
            //En el caso de que lo ingresado sea 0 o null se setea la varia confirmar en “false” lo cual me indica que la operación fue cancelada
            case "0":
                confirmar = false;
                break;
            case null:
                confirmar = false;
                break;
            //para los demás casos se informa que es una opción invalida y 
            //se consulta si quiere volver a ingresar otra opción, se guarda el valor de la respuesta en la variable confirmar “true” o “false”
            default:
                confirmar = confirm(opcion + " no es una opcion valida" + "\n¿Desea continuar?");
                break;
        }
        //Si el valor almacenado en la variable pagado devuelto antes desde la función descuentaDineroCuenta() es "true", indica que el servicio fue pagado, 
        //si la variable pagado es "false" indica que la cuenta no tiene fondos suficientes
        if (pagado == true) {
            alert("Has pagado el servicio de " + servicio
                + "\nSaldo anterior: " + saldoAnterior
                + "\nDinero descontado: " + dineroPagado
                + "\nSaldo actual: " + saldoCuenta);
            actualizarSaldoEnPantalla();
            opcion = 0;
            confirmar = null;
        } else if (pagado == false) {
            opcion = 0;
            alert("No posee fondos suficientes en la cuenta para el servicio de " + servicio);
        }
        //Control para seguir mostrando el menú de opciones de servicios o cancelar la operación según lo ingresado anteriormente por el usuario
        if (confirmar == true) {
            //Llamo a la función seleccionarServicio() para mostrar el menú de opciones
            opcion = seleccionarServicio();
        } else if (confirmar == false) {
            opcion = 0;
            alert("A cancelado la operacion...");
        }
    } while (opcion != "0");
}

//Función que muestra por pantalla las opciones a realizar a la hora de pagar un servicio
//y devuelve la opción seleccionada
function seleccionarServicio() {
    var opcion;
    opcion = prompt("1.- Agua" +
        "\n2.- Luz" +
        "\n3.- Internet" +
        "\n4.- Teléfono" +
        "\n0.- Salir");
    return opcion;
}

//Funcion que descuenta dinero del saldo de la cuenta controlando los fondos de la cuenta 
//usando controlaFondos() y restando con la función restaDinero(),retornado true o false
//de acuerdo a si se puedo realizar la operación o no

function descuentaDineroCuenta(monto) {
    var montoVerificado;
    montoVerificado = controlaFondos(monto);
    if (saldoCuenta > monto) {
        restarDinero(monto);
        return true;
    }
    return false;
}
/*------------------------------------------------------------------
  --------------------- Fin de Pagar Servicio ----------------------
  ------------------------------------------------------------------*/




/*------------------------------------------------------------------
  ---------------- Inicio de Transferencia de dinero ---------------
  ------------------------------------------------------------------*/


function transferirDinero() {
    var dinero;
    var cuenta;
    dinero = operacionDinero("transferir");
    if (dinero != false) {
        if (controlaFondos(dinero)) {
            cuenta = prompt("Por favor ingrese la cuenta amiga a transferir el dinero");
            if (verificaCuentaAmiga(cuenta)) {
                restarDinero(dinero);
                actualizarSaldoEnPantalla();
                alert("Se han transferido: " + dinero
                    + "\nCuenta destino: " + cuenta );
            } else {
                alert("La cuenta ingresada no corresponde a ninguna cuenta amiga");
            }
        } else {
            alert("No posee fondos suficientes en la cuenta para realizar la transferencia ");
        }
    } else {
        alert("Has cancelado la operacion...");
    }


}

//Función que verifica si la cuenta de destino del deposito es alguna de las cuentas amigas registradas, 
//devuelve true o false de acuerdo si lo ingresado es correcto o no 
function verificaCuentaAmiga(cuenta) {
    if (cuenta == cuentaAmiga1 || cuenta == cuentaAmiga2) {
        return true;
    }
    return false;
}

/*------------------------------------------------------------------
  ------------------ Fin de Transferencia de dinero ----------------
  ------------------------------------------------------------------*/


/*---------------------------------------------------------
  ---------------- Inicio de Iniciar Sesion ---------------
  ---------------------------------------------------------*/

//Función de inicio de sesión, solicito el código de acceso y de acuerdo a su veracidad se deja operar 
//o se confisca el dinero de la cuenta
function iniciarSesion() {
    var clave;
    clave = prompt("Ingrese su código de acceso");
    if (verificaClave(clave)) {
        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones");
    } else {
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
        saldoCuenta = 0;
        
    }
}

//Función que retorna un true o false después de verificar si la clave ingresada es igual a la registrada
function verificaClave(clave){
    if (password == clave )  {
        return true;
    }
    return false;
}
/*------------------------------------------------------
  ---------------- Fin de Iniciar Sesion ---------------
  ------------------------------------------------------*/



/*--------------------------------------------------------------------
  ---------------- Inicio de funciones de uso general ----------------
  --------------------------------------------------------------------*/

  //Función que recibe por parámetro una cantidad de dinero y la suma al saldo de la cuenta  
function sumarDinero(monto) {
    saldoCuenta += monto;
}

//Función que recibe por parámetro una cantidad de dinero y la resta al saldo de la cuenta  
function restarDinero(monto) {
    saldoCuenta -= monto;
}

/*
Función que recibe por parámetro un tipo de operación,  solicita el monto de dinero, 
y devuelve el monto ingresado en formato int
*/
function operacionDinero(operacion) {
    var cantDinero;
    var confirma = true;
    var continuar = false;
    //Solicito el monto con el cual se quiere operar y controlo que es un valor numerico
    cantDinero = prompt("Por Favor ingrese el monto de dinero a " + operacion);
    //Verifico que el monto ingresado sea correcto, de no serlo consulto si desea ingresar otro valor
    if (cantDinero != null) {
        while (confirma) {
            if (esNumero(cantDinero)) {
                cantDinero = parseInt(cantDinero);
                confirma = false;
                return cantDinero;
            } else {
                continuar = confirm("El valor ingresado no es esta permitido. \n¿Desea ingresar otro monto de dinero?");
                if (continuar == true) {
                    cantDinero = prompt("Por Favor ingrese el monto de dinero a " + operacion);
                    if (cantDinero == null) {
                        continuar = false;
                        confirma = false;
                    }
                } else {
                    confirma = false;
                }
            }
        }
    }
    //Confirmo que se quiera realizar la operación
    if (continuar) {
        continuar = confirm("El monto ingresado para operar es de " + cantDinero + " ¿Desea continuar?");
        if (continuar == true) {
            return dinero;
        }
    }
    return false;
}

//Función que verifica que el monto ingresado sea numérico y mayor a 0
function esNumero(valor) {
    if (isNaN(valor) == false && valor != null && valor != "") {
        if (parseInt(valor) < 0) {
            return false;
        }
        return true;
    }
    return false;
}

//Función que verifica que el saldo de la cuenta sea suficiente para realizar una operación de 
//resta de saldo, devolviendo true o false
function controlaFondos(monto) {
    if (monto < saldoCuenta) {
        return true;
    }
    return false;
}



/*--------------------------------------------------------------------
  ------------------ Fin de funciones de uso general -----------------
  --------------------------------------------------------------------*/


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}