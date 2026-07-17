const video = document.getElementById('meuVideo');
const btnPlayPause = document.getElementById('btnPlayPause');
const playerIcon = document.getElementById('playerIcon');
const playerText = document.getElementById('playerText');
const videoOverlay = document.getElementById('videoOverlay');
const bgContainer = document.getElementById('bg-container');

const minhasImagens = [
    "images/image (1).jpg", "images/image (2).jpg", "images/image (3).jpg", 
    "images/image (4).jpg", "images/image (5).jpg", "images/image (6).jpg",
    "images/image (7).jpg", "images/image (8).jpg", "images/image (9).jpg",
    "images/image (10).jpg", "images/image (11).jpg", "images/image (12).jpg",
    "images/image (13).jpg", "images/image (14).jpg", "images/image (15).jpg",
    "images/image (16).jpg", "images/image (17).jpg", "images/image (18).jpg",
    "images/image (19).jpg", "images/image (20).jpg", "images/image (21).jpg",
    "images/image (22).jpg", "images/image (23).jpg", "images/image (24).jpg",
    "images/image (25).jpg", "images/image (26).jpg", "images/image (27).jpg",
    "images/image (28).jpg"
];

let bgInterval, overlayInterval;
let currentBgIndex = 0;
let currentOverlayIndex = 0;

// Inicialização
function inicializarBackgrounds() {
    bgContainer.innerHTML = '';
    minhasImagens.forEach((caminhoImg, index) => {
        const divOverlay = document.createElement('div');
        divOverlay.className = `bg-overlay ${index === 0 ? 'active' : ''}`;
        divOverlay.style.backgroundImage = `linear-gradient(rgba(10, 17, 40, 0.65), rgba(10, 17, 40, 0.65)), url('${caminhoImg}')`;
        bgContainer.appendChild(divOverlay);
    });
    if (videoOverlay) videoOverlay.style.backgroundImage = `url('${minhasImagens[0]}')`;
}

inicializarBackgrounds();

// Player controls (mantido igual)
document.querySelectorAll('.track-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.track-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        video.src = this.getAttribute('data-src');
        video.load();
        video.play();
        
        playerIcon.textContent = '⏸';
        playerText.textContent = 'Pausar Experiência';
        
        stopAmbience();
        stopVideoOverlay();
        startAmbience();
        startVideoOverlay();
    });
});

btnPlayPause.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playerIcon.textContent = '⏸';
        playerText.textContent = 'Pausar Experiência';
        startAmbience();
        startVideoOverlay();
    } else {
        video.pause();
        playerIcon.textContent = '▶';
        playerText.textContent = 'Retomar Experiência';
        stopAmbience();
        stopVideoOverlay();
    }
});

// Background da página (mantido em 14s)
function startAmbience() {
    const overlays = document.querySelectorAll('.bg-overlay');
    if (bgInterval) clearInterval(bgInterval);
    bgInterval = setInterval(() => {
        overlays[currentBgIndex].classList.remove('active');
        currentBgIndex = (currentBgIndex + 1) % overlays.length;
        overlays[currentBgIndex].classList.add('active');
    }, 14000);
}

function stopAmbience() {
    if (bgInterval) clearInterval(bgInterval);
    bgInterval = null;
}

// Overlay do Player - Aleatório com Fade Suave
function startVideoOverlay() {
    if (!videoOverlay) return;
    videoOverlay.classList.add('playing');
    
    if (overlayInterval) clearInterval(overlayInterval);
    
    overlayInterval = setInterval(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * minhasImagens.length);
        } while (randomIndex === currentOverlayIndex);
        
        currentOverlayIndex = randomIndex;
        videoOverlay.style.backgroundImage = `url('${minhasImagens[currentOverlayIndex]}')`;
    }, 6000); // 6 segundos - bom equilíbrio entre movimento e suavidade
}

function stopVideoOverlay() {
    if (overlayInterval) clearInterval(overlayInterval);
    overlayInterval = null;
    if (videoOverlay) videoOverlay.classList.remove('playing');
}