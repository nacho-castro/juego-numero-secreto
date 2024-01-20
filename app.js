let numeroSecreto = 0;
let intentos = 1;
let rango = 10;
let numerosSorteados = []; //Lista de numeros sorteados anteriormente
const intentosMax = 3;

//Seteamos condiciones iniciales
function inicio() {
    limpiarCaja();
    intentos = 1;
    mensajesIniciales();
    numeroSecreto = generarNumeroSecreto();
    console.log(numeroSecreto);
    console.log(numerosSorteados);
}

inicio();

//Boton de nuevo juego
function nuevoJuego() {
    inicio();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intentar').removeAttribute('disabled');
}

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function mensajesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${rango}`);
    asignarTextoElemento('h2',`INTENTOS: ${intentos}`);
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * rango) + 1;

    //Si ya sorteamos todos los numeros
    if (numerosSorteados.length == rango) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        //Verificar si el numero esta en la lista
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiarCaja() {
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';
}

function verificarNumero() {
    
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        //si el usuario adivina
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        //si el usuario falla
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', `El numero es menor`);
        } else {
            asignarTextoElemento('p', `El numero es mayor`);
        }
        limpiarCaja();
        intentos++;
        asignarTextoElemento('h2',`INTENTOS: ${intentos}`);
        verificarIntento();
    }
    return;
}

function verificarIntento(){
    //Si el usuario excede los intentos
    if(intentos > intentosMax){
        asignarTextoElemento('p',`Excediste el numero de ${intentosMax} intentos posibles!`);
        numerosSorteados = [];
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    }
    return;
}

