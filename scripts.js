"use strict";

const colorInactivo = "rgb(114, 162, 219)";
const colorActivo = "rgb(38, 97, 168)";

var recordHard = 0;
var recordEasy = 0;
var aciertosEasy = 0;
var aciertosHard = 0;
var racha = document.getElementById("racha");
var record = document.getElementById("record");
var btnEasy = document.getElementById("easy");
var btnHard = document.getElementById("hard");
activarBoton(btnEasy, true); //configuración inicial del aspecto de boton ACTIVO
activarBoton(btnHard, false); //configuración inicial del aspecto de boton INACTIVO
jugar();

// btnEasy.addEventListener("click", activarBoton(), false);

/*VOID*/ function jugar() {
  var colores;
  if (isBotonActivo(btnEasy)) {
    colores = 3;
  } else {
    colores = 6;
  }

  var colorCorrecto = parseInt(Math.random() * colores) + 1;
  for (var i = 1; i <= colores; i++) {
    var color = generarColor();
    document.getElementById("color" + i).style.backgroundColor = color;
    if (i == colorCorrecto) {
      document.getElementById("rgb").innerHTML = color;
    }
  }
}
/*VOID*/ function activarBoton(boton, activar) {
  if (activar) {
    boton.style.backgroundColor = colorActivo;
    boton.style.borderStyle = "inset";
    boton.style.borderColor = colorActivo;
  } else {
    boton.style.backgroundColor = colorInactivo;
    boton.style.borderStyle = "outset";
    boton.style.borderColor = colorInactivo;
  }
}
/*STRING*/ function generarColor() {
  var v1 = parseInt(Math.random() * 256);
  var v2 = parseInt(Math.random() * 256);
  var v3 = parseInt(Math.random() * 256);
  return "rgb(" + v1 + ", " + v2 + ", " + v3 + ")";
}
/*BOOL*/ function isBotonActivo(boton) {
  if (boton.style.backgroundColor == colorActivo) return true;
  return false;
}
/*VOID*/ function cambiarDificultad() {
  if (isBotonActivo(btnEasy)) {
    activarBoton(btnEasy, false);
    activarBoton(btnHard, true);
    document.getElementById("fila2").style.visibility = "visible";
    document.getElementById("cuerpo").style.height = "356px";
    cambiarPuntaje(aciertosHard, racha);
    cambiarPuntaje(recordHard, record);
    jugar();
  } else {
    activarBoton(btnHard, false);
    activarBoton(btnEasy, true);
    document.getElementById("fila2").style.visibility = "hidden";
    document.getElementById("cuerpo").style.height = "250px";
    cambiarPuntaje(aciertosEasy, racha);
    cambiarPuntaje(recordEasy, record);
    jugar();
  }
}
/*VOID*/ function adivinar(celda) {
  if (celda.style.backgroundColor == document.getElementById("rgb").innerHTML) {
    // acertaste color
    if (isBotonActivo(btnEasy)) {
      cambiarPuntaje(++aciertosEasy, racha);
      if (aciertosEasy > recordEasy) {
        recordEasy = aciertosEasy;
        cambiarPuntaje(recordEasy, record);
      }
      alert("GANASTE");
      jugar();
    }
    if (isBotonActivo(btnHard)) {
      cambiarPuntaje(++aciertosHard, racha);
      if (aciertosHard > recordHard) {
        recordHard = aciertosHard;
        cambiarPuntaje(recordHard, record);
      }
      alert("GANASTE");
      jugar();
    }
  } else {
    // no acertaste el color
    if (isBotonActivo(btnEasy)) {
      aciertosEasy = 0;
      cambiarPuntaje(aciertosEasy, racha);
    } else {
      aciertosHard = 0;
      cambiarPuntaje(aciertosHard, racha);
    }
    alert("PERDISTE");
    jugar();
  }
}
function cambiarPuntaje(puntos, contador) {
  var texto = contador.innerHTML;
  contador.innerHTML = texto.slice(0, texto.length - 1) + puntos;
}

function apuntar(color, apunta) {
  if (apunta) {
    color.style.borderColor = "white";
  } else {
    color.style.borderColor = "black";
  }
}
