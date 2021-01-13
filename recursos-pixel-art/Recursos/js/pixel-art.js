var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

/*
  Declaraciones de variables 
*/
var paleta = document.getElementById("paleta");
var grillaPixeles = document.getElementById("grilla-pixeles");
var indicadorColor = document.getElementById('indicador-de-color');
var clickMouse = false;

/*
  Fin de las variables
*/


/*
  Funciones CallBacks utilizadas para captar los diferentes eventos
*/

paleta.addEventListener("click", actulizoIndicadorColor);
grillaPixeles.addEventListener("click", pintoPixelGrilla);
grillaPixeles.addEventListener("mousedown", mouseClick);
grillaPixeles.addEventListener("mouseup", mouseNoClick);
grillaPixeles.addEventListener("mouseover", mouseMovimiento)

/*
  Fin CallBacks
*/


// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change',
  (function () {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    indicadorColor.style.backgroundColor = colorActual;
  })
);


/*
  Funciones llamadas por las callback
*/
function generaPaleta() {
  for (var i = 0; i < nombreColores.length; i++) {
    var nuevoDiv = document.createElement('div');
    paleta.appendChild(nuevoDiv);
    nuevoDiv.className = "color-paleta";
    nuevoDiv.style.backgroundColor = nombreColores[i];
  }
};

function generaGrilla() {
  for (var i = 0; i < 1750; i++) {
    var nuevoPixel = document.createElement('div');
    grillaPixeles.appendChild(nuevoPixel);
  }
}

function actulizoIndicadorColor(e) {
  indicadorColor.style.backgroundColor = e.target.style.backgroundColor;
}

function pintoPixelGrilla(e) {
  e.target.style.backgroundColor = indicadorColor.style.backgroundColor;
}

function mouseClick() {
  clickMouse = true;
}

function mouseNoClick() {
  clickMouse = false;
}

function mouseMovimiento(e) {
  if (clickMouse == true) {
    e.target.style.backgroundColor = indicadorColor.style.backgroundColor;
  }
}
/*
  Fin Funciones llamadas por las callback
*/


$("#borrar").click(function () {
  $("#grilla-pixeles div").each(function () {
    $(this).animate({ "background-color": "#ffffff" }, 2000);
  });
});

/*
$("#batman").click(function(){
  cargarSuperheroe(batman);
});

$("#wonder").click(function(){
  cargarSuperheroe(wonder);
});

$("#flash").click(function(){
  cargarSuperheroe(flash);
});

$("#invisible").click(function(){
  cargarSuperheroe(invisible);
});
*/
$("#guardar").click(function () {
  guardarPixelArt();
})

$('.imgs img').on('click', function () {
  (1)

  var id = $(this).attr('id'); (2)

  switch (id) {
    case 'batman': cargarSuperheroe(batman);
      break;
    case 'wonder': cargarSuperheroe(wonder);
      break;
    case 'flash': cargarSuperheroe(flash);
      break;
    case 'invisible': cargarSuperheroe(invisible);
      break;
    default:
  }

})

function iniciar() {
  generaGrilla();
  generaPaleta();
}

iniciar();

/*

*/
