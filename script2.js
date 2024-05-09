"use strict";

// Elementos del DOM

const opciones = document.querySelectorAll(".opcion");
const muestra = document.getElementById("muestra");
const codigo = document.getElementById("codigo");
const aciertos = document.getElementById("aciertos");
const vidas = document.getElementById("vidas");
const mensaje = document.getElementById("mensaje");
const nuevoJuego = document.getElementById("nuevoJuego");

alert ("¡Juguemos! ¿Cuántos colores puedes adivinar?")

let contadorFallos = 0;

// Generar un número aleatorio entre 0 y 255

function numeroAleatorio() {
    return Math.floor(Math.random() * 256);
}

// Generar un color RGB aleatorio

function colorAleatorio() {
    const r = numeroAleatorio();
    const g = numeroAleatorio();
    const b = numeroAleatorio();
    return `rgb(${r}, ${g}, ${b})`;
}

// Mostrar un color aleatorio en la caja principal y en las cajas de color

function mostrarColor() {
    const color = colorAleatorio();
    codigo.textContent = color;
    muestra.style.backgroundColor = color;
  
    // Cambiar color de las cajas de color
    opciones.forEach((opcion) => {
      opcion.style.backgroundColor = colorAleatorio();
    });
  
    // Elegir aleatoriamente una de las cajas para que coincida con el color de la caja principal
    const opcionCorrecta = Math.floor(Math.random() * opciones.length);
    opciones[opcionCorrecta].style.backgroundColor = color;
}

// Comprobar si el color seleccionado es correcto
function comprobarColorSeleccionado() {
    const colorCorrecto = codigo.textContent;
    const colorSeleccionado = this.style.backgroundColor;
    if (colorSeleccionado === colorCorrecto) {
      mensaje.textContent = "¡Has acertado!";
      aciertos.textContent++;
    } else {
      mensaje.textContent = "¡Has fallado!";
      fallos.textContent++;
      contadorFallos++;
      if (contadorFallos > 3) {
        alert("¡Has perdido!");
        reiniciarJuego();
      }
    }
    mostrarColor();
}

// Reiniciar el juego
function reiniciarJuego() {
    aciertos.textContent = 0;
    fallos.textContent = 0;
    contadorFallos = 0;
    mensaje.textContent = "";
    mostrarColor();
}

// Asignar eventos a las cajas de color

opciones.forEach((opcion) => {
    opcion.addEventListener("click", comprobarColorSeleccionado);
});
  
// Asignar evento al botón "Nuevo color"

nuevoJuego.addEventListener("click", reiniciarJuego);

mostrarColor ()
