// ====================== GSAP ======================
gsap.registerPlugin();

// ====================== ELEMENTOS ======================
const video = document.getElementById('meuVideo');
const btnPlayPause = document.getElementById('btnPlayPause');
const playerIcon = document.getElementById('playerIcon');
const playerText = document.getElementById('playerText');
const videoOverlay = document.getElementById('videoOverlay');
const bgContainer = document.getElementById('bg-container');

// ====================== ARRAY COM 63 IMAGENS ======================
let minhasImagens = [];

// Carregar automaticamente as 63 imagens (recomendado)
for (let i = 1; i <= 63; i++) {
    minhasImagens.push(`images/image (${i}).jpg`);
}

let bgInterval = null;
let overlayInterval = null;
let currentBgIndex = 0;
let currentOverlayIndex = 0;

// ====================== ANIMAÇÕES GSAP ======================
function initGSAP() {
    gsap.from(".title-enigmatic", { duration: 1.8, y: 60, opacity: 0, ease: "power3.out" });
    gsap.from(".subtitle", { duration: 1.5, y: 40, opacity: 0, delay: 0.4 });
    gsap.from(".manifesto-text p, .manifesto-text h3", { 
        duration: 1.3, y: 40, opacity: 0, stagger: 0.2, delay: 0.7 
    });
    gsap.from(".player-card", { duration: 1.8, y: 90, opacity: 0, delay: 1.2, ease: "power3.out" });
}

// ====================== BACKGROUND ======================
function inicializarBackgrounds() {
    bgContainer.innerHTML = '';
    
    minhasImagens.forEach((caminhoImg, index) => {
        const div = document.createElement('div');
        div.className = `bg-overlay ${index === 0 ? 'active' : ''}`;
        div.style.backgroundImage = `linear-gradient(rgba(10, 17, 40, 0.68), rgba(10, 17, 40, 0.68)), url('${caminhoImg}')`;
        bgContainer.appendChild(div);
    });

    if (videoOverlay) videoOverlay.style.backgroundImage = `url('${minhasImagens[0]}')`;

    initGSAP();
}

// ====================== PLAYER ======================
document.querySelectorAll('.track-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.track-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        video.src = this.getAttribute('data-src');
        video.load();
        video.play().catch(() => {});

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
        video.play().catch(() => {});
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

// ====================== FUNÇÕES DE TRANSIÇÃO ======================
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

// Fade Suave no Player (sem corte seco)
function changeVideoOverlay(newSrc) {
    if (!videoOverlay) return;

    gsap.to(videoOverlay, {
        duration: 1.6,        // Duração do fade out
        opacity: 0,
        ease: "power2.inOut",
        onComplete: () => {
            videoOverlay.style.backgroundImage = `url('${newSrc}')`;
            gsap.to(videoOverlay, {
                duration: 1.6,   // Duração do fade in
                opacity: 0.45,
                ease: "power2.inOut"
            });
        }
    });
}

function startVideoOverlay() {
    if (!videoOverlay) return;
    videoOverlay.style.opacity = "0.45";

    if (overlayInterval) clearInterval(overlayInterval);

    overlayInterval = setInterval(() => {
        let randomIndex;
        // Melhora a aleatoriedade para evitar repetições frequentes
        do {
            randomIndex = Math.floor(Math.random() * minhasImagens.length);
        } while (randomIndex === currentOverlayIndex && minhasImagens.length > 1);

        currentOverlayIndex = randomIndex;
        changeVideoOverlay(minhasImagens[currentOverlayIndex]);
    }, 7000); // 7 segundos - bom equilíbrio
}

function stopVideoOverlay() {
    if (overlayInterval) clearInterval(overlayInterval);
    overlayInterval = null;
    if (videoOverlay) gsap.to(videoOverlay, { duration: 0.8, opacity: 0 });
}

// ====================== INICIALIZAÇÃO ======================
window.onload = function() {
    inicializarBackgrounds();
    startAmbience();
    startVideoOverlay();
};