// seleccion de elementos del DOM
const imagen = document.getElementById('escudo');
const cuadroRojo = document.getElementById('rojo');
const cuadroAzul = document.getElementById('azul');
const cuadroVerde = document.getElementById('verde');
const cuadroNaranja = document.getElementById('naranja');
const cuadroAmarillo = document.getElementById('amarillo');
const cuadroLila = document.getElementById('lila');

// variables para los contadores
let clickIzq = 0;
let clickDer = 0;
let pasarMouse = 0;
let teclasPulsadas = 0;
let teclaG = 0;

// click izq sobre la imagen
imagen.addEventListener('click', () => {
    clickIzq++;
    cuadroRojo.textContent = clickIzq;
});

// click der sobre la imagen
imagen.addEventListener('contextmenu', (event) => {
    event.preventDefault(); //evitamos q slga el menu contextual del navegador
    clickDer++;
    cuadroAzul.textContent = clickDer;
});

// pasar el mouse por encima
imagen.addEventListener('mouseenter', () => {
    pasarMouse++;
    cuadroVerde.textContent = pasarMouse;
});

// Escuchadores para el teclado
window.addEventListener('keydown', (event) => {
    // contador total de teclas
    teclasPulsadas++;
    cuadroNaranja.textContent = teclasPulsadas;

    // uultima tecla pulsada
    cuadroAmarillo.textContent = event.key;

    // contador de la teclla g
    if (event.key.toLowerCase() === 'g') {
        teclaG++;
        cuadroLila.textContent = teclaG;
    }
});


// tasca 2

// seleccionamos boton y lista
const btnCrear = document.getElementById('btnCrear');
const llista = document.getElementById('llista');

//variables contador para saber que numero toca
let contadorElementos = 1;

// funcion para crear el elemento
btnCrear.addEventListener('click', () => {
    //crear elemento de la lista (li)
    const nuevoElemento = document.createElement('li');

    //ponemos el texto "Aquest es l'element x de la llista"
    nuevoElemento.textContent = `Aquest és l'element ${contadorElementos} de la llista`;

    // añadir la clase "element"
    nuevoElemento.classList.add('element');

    // añadir el id "element1, 2, etc"
    nuevoElemento.id = `element${contadorElementos}`;

    // meter el nuevo elemento dentro de la lista (ul)
    llista.appendChild(nuevoElemento);

    //sumar 1 al contador 
    contadorElementos++;
});