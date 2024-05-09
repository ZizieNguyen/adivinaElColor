"use strict";

// Obtener elementos del DOM
const cajasDeColor = document.querySelectorAll(".caja");
const cajaPrincipal = document.getElementById("cajaPrincipal");
const colorAleatorioSpan = document.getElementById("colorAleatorio");
const contadorAciertosSpan = document.getElementById("contador-de-aciertos");
const contadorFallosSpan = document.getElementById("contador-de-fallos");
const mensajeSpan = document.getElementById("mensaje");
const botonNuevoColor = document.getElementById("cajaPrincipal");

// Generar un número aleatorio entre 0 y 255
function numeroAleatorio() {
  return Math.floor(Math.random() * 256);
}

// Generar un color RGB aleatorio
const colorAleatorio = () => {
  const r = numeroAleatorio();
  const g = numeroAleatorio();
  const b = numeroAleatorio();
  return `rgb(${r}, ${g}, ${b})`;
};

// Mostrar un color aleatorio en la caja principal y en las cajas de color
function mostrarColor() {
  const color = colorAleatorio();
  colorAleatorioSpan.textContent = color;
  cajaPrincipal.style.backgroundColor = color;

  // Cambiar color de las cajas de color
  cajasDeColor.forEach((caja) => {
    caja.style.backgroundColor = colorAleatorio();
  });

  // Elegir aleatoriamente una de las cajas para que coincida con el color de la caja principal
  const indiceCajaCoincidente = Math.floor(Math.random() * cajasDeColor.length);
  cajasDeColor[indiceCajaCoincidente].style.backgroundColor = color;
}

// console.log(cajasDeColor);

// Comprobar si el color seleccionado es correcto
function comprobarColorSeleccionado() {
  const colorAleatorio = colorAleatorioSpan.textContent;
  const colorSeleccionado = this.style.backgroundColor;
  if (colorSeleccionado === colorAleatorio) {
    mensajeSpan.textContent = "¡Correcto!";
    contadorAciertosSpan.textContent++;s
  } else {
    mensajeSpan.textContent = "¡Incorrecto!";
    contadorFallosSpan.textContent++;
  }
  mostrarColor();
}

// Asignar eventos a las cajas de color
cajasDeColor.forEach((caja) => {
  caja.addEventListener("click", comprobarColorSeleccionado);
});

// Asignar evento al botón "Nuevo color"
botonNuevoColor.addEventListener("click", mostrarColor);

// Mostrar el primer color aleatorio
mostrarColor();
