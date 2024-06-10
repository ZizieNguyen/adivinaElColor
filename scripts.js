"use strict";

// Obtenemos los elementos del DOM
const muestra = document.getElementById("muestra");
const codigoRgb = document.getElementById("codigo");
const opciones = document.querySelectorAll(".opcion");
const nuevoJuego = document.getElementById("nuevoJuego");
const marcadorAciertos = document.querySelector(".totalAciertos");
const barraCorazones = document.querySelector(".corazones");
const marcadorRecord = document.querySelector(".totalRecord");
const botonJuguemos = document.getElementById("botonJuguemos");
const popUpPerdido = document.getElementById("popUpPerdido");

let aciertos = 0;
let vidas = 3;
let record = 0;

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

function mostrarNuevoColor() {
    const nuevoColor = colorAleatorio();
    const listaOpciones = generarColoresSimilares(nuevoColor, 6);
    const muestraColor = nuevoColor.replace('rgb(', '').replace(')', '').split(', ');

    muestra.style.backgroundColor = nuevoColor;
    codigoRgb.innerHTML = `<span>${muestraColor[0]}</span><span>${muestraColor[1]}</span><span>${muestraColor[2]}</span>`;

    // Obtener un índice aleatorio para colocar la opción de color correcta
    const indiceAleatorio = Math.floor(Math.random() * listaOpciones.length);

    opciones.forEach((opcion, index) => {
        if (index === indiceAleatorio) {
            // Colocar la opción de color correcta en la posición aleatoria
            opcion.style.backgroundColor = nuevoColor;
        } else {
            // Colocar otras opciones de color en posiciones aleatorias
            opcion.style.backgroundColor = listaOpciones.splice(Math.floor(Math.random() * listaOpciones.length), 1)[0];
        }
        opcion.removeEventListener("click", clickOpciones);
        opcion.addEventListener("click", clickOpciones);
    });
}

function generarColoresSimilares(muestraColor, count) {
    const targetRGB = muestraColor.match(/\d+/g).map(Number);
    const colores = new Set([muestraColor]);

    while (colores.size < count) {
        const r = Math.min(255, Math.max(0, targetRGB[0] + Math.floor((Math.random() - 0.5) * 100)));
        const g = Math.min(255, Math.max(0, targetRGB[1] + Math.floor((Math.random() - 0.5) * 100)));
        const b = Math.min(255, Math.max(0, targetRGB[2] + Math.floor((Math.random() - 0.5) * 100)));
        colores.add(`rgb(${r}, ${g}, ${b})`);
    }

    return Array.from(colores);
}

function clickOpciones(event) {
    const seleccionarColor = event.target.style.backgroundColor;
    const muestraColor = muestra.style.backgroundColor;

    if (seleccionarColor === muestraColor) {
        aciertos++;
        if (aciertos > record) {
            record = aciertos;
        }
    } else {
        vidas--;
        if (vidas === 0) {
            mostrarPopUp(popUpPerdido);
            return; // No continuar mostrando un nuevo color si se ha perdido
        }
    }

    actualizarMarcadores();
    mostrarNuevoColor();
}

// Mostrar el pop-up específico y el fondo transparente
function mostrarPopUp(popUp) {
    popUp.style.display = "flex";
    toggleFondoTransparente(true); // Mostrar el fondo transparente al mostrar un pop-up
}

// Ocultar el pop-up específico y el fondo transparente
function ocultarPopUp(popUp) {
    popUp.style.display = "none";
    toggleFondoTransparente(false); // Ocultar el fondo transparente al cerrar un pop-up
}

function actualizarMarcadores() {
    marcadorAciertos.textContent = aciertos;
    marcadorRecord.textContent = record;

    // Actualiza los corazones sin cambiar el estilo
    const corazones = barraCorazones.querySelectorAll('span');
    corazones.forEach((corazon, index) => {
        if (index < vidas) {
            corazon.style.color = '#F00';
        } else {
            corazon.style.color = '#F002';
        }
    });
}

function reiniciarJuego() {
    aciertos = 0;
    vidas = 3;
    actualizarMarcadores();
    mostrarNuevoColor();
}

nuevoJuego.addEventListener("click", reiniciarJuego);

// Asignar el evento click al botón "Juguemos"
botonJuguemos.addEventListener("click", function() {
    document.getElementById("popUpInicial").style.display = "none";
    toggleFondoTransparente(false); // Ocultar el fondo transparente al hacer clic en "Juguemos"
    reiniciarJuego(); // Reiniciar el juego al hacer clic en "Juguemos"
});

// Asignar el evento click al botón de "Jugar de nuevo"
popUpPerdido.querySelector(".botonDeNuevo").addEventListener("click", function() {
    ocultarPopUp(popUpPerdido);
    reiniciarJuego(); // Reiniciar el juego al hacer clic en "Jugar de nuevo"
});

// Función para mostrar u ocultar el fondo transparente
function toggleFondoTransparente(visible) {
    const fondoTransparente = document.querySelector(".fondoTransparente");
    fondoTransparente.style.display = visible ? "block" : "none";
}

// Mostrar el pop-up inicial y el fondo transparente al cargar la página
window.addEventListener("load", function() {
    document.getElementById("popUpInicial").style.display = "flex";
    toggleFondoTransparente(true); // Mostrar el fondo transparente al cargar la página
    mostrarNuevoColor(); // Mostrar el color detrás del pop-up inicial y el fondo transparente
});

// Inicializar los marcadores y colores al cargar la página
reiniciarJuego();