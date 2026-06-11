const video = document.getElementById('meuVideo');
const btnPlayPause = document.getElementById('btnPlayPause');
const playerIcon = document.getElementById('playerIcon');
const playerText = document.getElementById('playerText');
const bgContainer = document.getElementById('bg-container');
const videoOverlay = document.getElementById('videoOverlay'); // Captura a nova camada do vídeo

let bgInterval;
let overlayInterval;
let currentBgIndex = 0;
let currentOverlayIndex = 0;

// Lista com todas as suas 28 imagens locais
const minhasImagens = [
    "images/image (1).jpg", "images/image (2).jpg", "images/image (3).jpg", "images/image (4).jpg",
    "images/image (5).jpg", "images/image (6).jpg", "images/image (7).jpg", "images/image (8).jpg",
    "images/image (9).jpg", "images/image (10).jpg", "images/image (11).jpg", "images/image (12).jpg",
    "images/image (13).jpg", "images/image (14).jpg", "images/image (15).jpg", "images/image (16).jpg",
    "images/image (17).jpg", "images/image (18).jpg", "images/image (19).jpg", "images/image (20).jpg",
    "images/image (21).jpg", "images/image (22).jpg", "images/image (23).jpg", "images/image (24).jpg",
    "images/image (25).jpg", "images/image (26).jpg", "images/image (27).jpg", "images/image (28).jpg"
];

// Inicializa o background global da página (0.65 de escurecimento)
function inicializarBackgrounds() {
    bgContainer.innerHTML = '';
    minhasImagens.forEach((caminhoImg, index) => {
        const divOverlay = document.createElement('div');
        divOverlay.className = `bg-overlay ${index === 0 ? 'active' : ''}`;
        divOverlay.style.backgroundImage = `linear-gradient(rgba(10, 17, 40, 0.65), rgba(10, 17, 40, 0.65)), url('${caminhoImg}')`;
        bgContainer.appendChild(divOverlay);
    });
    
    // Define a primeira imagem padrão na camada sobre o vídeo também
    videoOverlay.style.backgroundImage = `url('${minhasImagens[0]}')`;
}

inicializarBackgrounds();

// Gerenciador do Player MP4
btnPlayPause.addEventListener('click', () => {
    if (video.paused) {
        video.play().then(() => {
            playerIcon.textContent = '⏸';
            playerText.textContent = 'Pausar Experiência';
            startAmbience();
            startVideoOverlay(); // Inicia o carrossel em cima do MP4
        }).catch(err => console.log("Erro ao reproduzir vídeo:", err));
    } else {
        video.pause();
        playerIcon.textContent = '▶';
        playerText.textContent = 'Retomar Experiência';
        stopAmbience();
        stopVideoOverlay(); // Pausa o carrossel de cima do MP4
    }
});

// Reseta tudo quando o MP4 acabar
video.addEventListener('ended', () => {
    playerIcon.textContent = '▶';
    playerText.textContent = 'Iniciar Experiência';
    stopAmbience();
    stopVideoOverlay();
    resetBackgrounds();
});

// --- MOTOR DE TRANSIÇÃO DO BACKGROUND GLOBAL ---
function startAmbience() {
    const overlays = document.querySelectorAll('.bg-overlay');
    if (!bgInterval && overlays.length > 0) {
        bgInterval = setInterval(() => {
            overlays[currentBgIndex].classList.remove('active');
            currentBgIndex = (currentBgIndex + 1) % overlays.length;
            overlays[currentBgIndex].classList.add('active');
        }, 14000); // Muda o fundo da página a cada 14s
    }
}

function stopAmbience() {
    clearInterval(bgInterval);
    bgInterval = null;
}

// --- MOTOR DE TRANSIÇÃO EXCLUSIVO SOBRE O VÍDEO (50% TRANSPARÊNCIA) ---
function startVideoOverlay() {
    videoOverlay.classList.add('playing'); // Ativa a opacidade de 50% via CSS
    
    if (!overlayInterval) {
        overlayInterval = setInterval(() => {
            currentOverlayIndex = (currentOverlayIndex + 1) % minhasImagens.length;
            videoOverlay.style.backgroundImage = `url('${minhasImagens[currentOverlayIndex]}')`;
        }, 9000); // Troca a imagem sobre o vídeo mais rápido (a cada 7 segundos), mude se quiser!
    }
}

function stopVideoOverlay() {
    clearInterval(overlayInterval);
    overlayInterval = null;
    videoOverlay.classList.remove('playing'); // Suaviza a saída tirando a opacidade
}

function resetBackgrounds() {
    // Reseta fundo global
    const overlays = document.querySelectorAll('.bg-overlay');
    overlays.forEach(bg => bg.classList.remove('active'));
    if (overlays[0]) overlays[0].classList.add('active');
    currentBgIndex = 0;
    
    // Reseta imagem sobre o vídeo
    currentOverlayIndex = 0;
    videoOverlay.style.backgroundImage = `url('${minhasImagens[0]}')`;
}