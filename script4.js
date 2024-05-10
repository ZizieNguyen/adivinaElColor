"use strict";

// DOM
const opciones = document.querySelectorAll(".opcion");
const muestra = document.getElementById("muestra");
const codigo = document.getElementById("codigo");
const aciertos = document.getElementById("aciertos");
const fallos = document.getElementById("fallos");
const mensaje = document.getElementById("mensaje");
const nuevoJuego = document.getElementById("nuevoJuego");

// Pop-up inicial
function mostrarModal(mensaje) {
  let modal = document.getElementById("popUpInicial");
  let modalMessage = modal.querySelector("#mensajePopUp");
  modalMessage.textContent = mensaje;
  modal.style.display = "block";
}

// La alerta se convierte en el pop-up inicial
window.alert = function(mensaje) {
  mostrarModal(mensaje);
};

// Botón "¡Juguemos!"
document.getElementById("botonJuguemos").addEventListener("click", function() {
  document.getElementById("popUpInicial").style.display = "none";
});

// Alerta inicial -> después se convierte en pop-up
alert("¿Cuántos colores puedes adivinar?");

// Contador fallos y aciertos
let contadorFallos = 0;
let contadorAciertos = 0;

// Número (o sea, RGB=color) aleatorio
function numeroAleatorio() {
    return Math.floor(Math.random() * 256);
}

// RGB aleatorio
function colorAleatorio() {
    const r = numeroAleatorio();
    const g = numeroAleatorio();
    const b = numeroAleatorio();
    return `rgb(${r}, ${g}, ${b})`;
}

// Función parar pasar de RGB a HSL
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0; // achromatic
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  return [h, s, l];
}

// Función para pasar de HSL a RGB
function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
      r = g = b = l; // achromatic
  } else {
      const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}

// Variaciones de saturación de los colores de las opciones
function generarOpcionesSaturacion(colorBase) {

// El RGB se convierte en  HSL para modificar la luminosidad
const hslBase = rgbToHsl(colorBase[0], colorBase[1], colorBase[2]);

// Definición de saturación y luminosidad base
const saturacionBase = hslBase[1];
const luminosidadBase = hslBase[2];

// Opciones de color a generar
const numOpciones = 8;

// Rango de luminosidad en las opciones
const rangoLuminosidad = 0.8; 
const pasoLuminosidad = rangoLuminosidad / (numOpciones - 1);

// Opciones de colores con variaciones de luminosidad
const opciones = [];
  for (let i = 0; i < numOpciones; i++) {

// Luminosidad de la opción actual
const luminosidad = Math.min(1, Math.max(0, luminosidadBase + pasoLuminosidad * i - rangoLuminosidad / 2));
      
// Conversión a RGB del HSL
const rgbColor = hslToRgb(hslBase[0], saturacionBase, luminosidad);
  opciones.push(`rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`);
}

  return opciones;
}

// Color aleatorio de "muestra" y "opciones"
function mostrarColor() {
  const colorMuestra = colorAleatorio(); // Generar color aleatorio para la muestra
  const opcionesSaturacion = generarOpcionesSaturacion(colorMuestra.match(/\d+/g)); // Obtener RGB del color de la muestra
  codigo.textContent = colorMuestra;
  muestra.style.backgroundColor = colorMuestra;

// Cambiar color de las cajas de opciones
  opciones.forEach((opcion, index) => {
      opcion.style.backgroundColor = opcionesSaturacion[index];
  });

  // Que coincida una de las opciones elegida aleatoriamente 
  const opcionCorrecta = Math.floor(Math.random() * opciones.length);
  opciones[opcionCorrecta].style.backgroundColor = colorMuestra;
}

// Comprobación de si el color seleccionado es correcto
function comprobarColorSeleccionado() {
const colorCorrecto = codigo.textContent;
const colorSeleccionado = this.style.backgroundColor;
  if (colorSeleccionado === colorCorrecto) {
    mensaje.textContent = "¡Has acertado!";
    aciertos.textContent++;
    contadorAciertos++;
    if (contadorAciertos > 2) {
        alert("¡Felicidades! ¡Has ganado!")
        reiniciarJuego();
    }
} else {
    mensaje.textContent = "¡Has fallado!";
    fallos.textContent++;
    contadorFallos++;
    if (contadorFallos > 3) {
        alert("Oh, qué pena, has perdido :(");
        reiniciarJuego();
    } 
}
mostrarColor();
}

// Reinicio del juego
function reiniciarJuego() {
  aciertos.textContent = 0;
  fallos.textContent = 0;
  contadorAciertos = 0;
  contadorFallos = 0;
  mensaje.textContent = "";
  mostrarColor();
}

// Evento click asignado a las opciones
opciones.forEach((opcion) => {
  opcion.addEventListener("click", comprobarColorSeleccionado);
});

// Botón para jugar de nuevo
nuevoJuego.addEventListener("click", reiniciarJuego);

// Mostrar el primer color al cargar la página
mostrarColor();
