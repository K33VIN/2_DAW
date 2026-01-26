//1. seleccinaoms el elemento de audio
const audio = document.getElementById('miAudio');
const textoTiempo = document.getElementById('info-tiempo');

//2. funciones
function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function subirVolumen() {
    if (audio.volume < 1.0) {
        audio.volume = Math.min(1.0, audio.volume + 0.1); 
    }
}

function bajarVolumen() {
    if (audio.volume > 0.0) {
        audio.volume = Math.max(0.0, audio.volume - 0.1); 
    }
}

function adelantar() {
    audio.currentTime += 5;
}

function retroceder() {
    audio.currentTime -= 5;
}

function aumentarVelocidad() {
    audio.playbackRate += 0.25;
}

function disminuirVelocidad() {
    audio.playbackRate -= 0.25;
}

function muteAudio() { // si está mute, lo quita y si no, lo pone
    audio.muted = !audio.muted;
}

// Muestra los segundos que van pasando mientras suena el audio
audio.addEventListener('timeupdate', () => {
    textoTiempo.innerText = `Tiempo actual: ${Math.round(audio.currentTime)} seg`;
});