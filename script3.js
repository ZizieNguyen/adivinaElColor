"use strict";

// Obtenmos los elementos del DOM
const opciones = document.querySelectorAll(".opcion");
const muestra = document.getElementById("muestra");
const codigo = document.getElementById("codigo");
const aciertos = document.getElementById("aciertos");
const fallos = document.getElementById("fallos");
const mensaje = document.getElementById("mensaje");
const nuevoJuego = document.getElementById("nuevoJuego");

// Creamos un alert de inicio del juego
alert("¡Juguemos! ¿Cuántos colores puedes adivinar?");

// Declaramos los contadores de fallos y aciertos
let contadorFallos = 0;
let contadorAciertos = 0;

// Generamos un número aleatorio entre 0 y 255
function numeroAleatorio() {
    return Math.floor(Math.random() * 256);
}

// Obtenemos un color RGB aleatorio
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

// Con está función obtenemos variaciones en la saturación para el colores de las opciones
function generarOpcionesSaturacion(colorBase) {
  
    // Convertirmos color base a HSL para modificar la luminosidad
    const hslBase = rgbToHsl(colorBase[0], colorBase[1], colorBase[2]);

    // Definimos saturación y luminosidad base
    const saturacionBase = hslBase[1];
    const luminosidadBase = hslBase[2];

    // Indicamos el número de opciones a generar
    const numOpciones = 8;

    // Calculamos el rango de luminosidad para distribuir las opciones
    const rangoLuminosidad = 0.8; // Porcentaje del rango de luminosidad a utilizar
    const pasoLuminosidad = rangoLuminosidad / (numOpciones - 1);

    // Generamos las opciones de colores con variaciones de luminosidad
    const opciones = [];
    for (let i = 0; i < numOpciones; i++) {

        // Calculamos la luminosidad para la opción actual
        const luminosidad = Math.min(1, Math.max(0, luminosidadBase + pasoLuminosidad * i - rangoLuminosidad / 2));
        
        // Convertimos a RGB el color modificado en HSL
        const rgbColor = hslToRgb(hslBase[0], saturacionBase, luminosidad);
        opciones.push(`rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`);
    }

    return opciones;
}

// Mostramos un color aleatorio en la caja "muestra" y generamos las cajas de "opciones"
function mostrarColor() {
    const colorMuestra = colorAleatorio(); // Generar color aleatorio para la muestra
    const opcionesSaturacion = generarOpcionesSaturacion(colorMuestra.match(/\d+/g)); // Obtener RGB del color de la muestra
    codigo.textContent = colorMuestra;
    muestra.style.backgroundColor = colorMuestra;

    // Cambiar color de las cajas de opciones
    opciones.forEach((opcion, index) => {
        opcion.style.backgroundColor = opcionesSaturacion[index];
    });

    // Elegir aleatoriamente una de las opciones para que coincida con el color de la muestra
    const opcionCorrecta = Math.floor(Math.random() * opciones.length);
    opciones[opcionCorrecta].style.backgroundColor = colorMuestra;
}

// Con esta función comprobamos si el color seleccionado es correcto
function comprobarColorSeleccionado() {
  const colorCorrecto = codigo.textContent;
  const colorSeleccionado = this.style.backgroundColor;
  if (colorSeleccionado === colorCorrecto) {
      mensaje.textContent = "¡Has acertado!";
      aciertos.textContent++;
      contadorAciertos++;
      if (contadorAciertos > 2) {
          alert("¡Has ganado!")
          reiniciarJuego();
      }
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

// Con esta función definimos que sucede al reiniciar el juego
function reiniciarJuego() {
    aciertos.textContent = 0;
    fallos.textContent = 0;
    contadorAciertos = 0;
    contadorFallos = 0;
    mensaje.textContent = "";
    mostrarColor();
}

// Asignamos el evento click a las cajas de opciones
opciones.forEach((opcion) => {
    opcion.addEventListener("click", comprobarColorSeleccionado);
});

// Asignamos el evento al botón para jugar de nuevo
nuevoJuego.addEventListener("click", reiniciarJuego);

// Mostramos el primer color al cargar la página
mostrarColor();
