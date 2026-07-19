// ====================== GSAP ======================
gsap.registerPlugin();

// ====================== ELEMENTOS ======================
const video = document.getElementById('meuVideo');
const gifElement = document.getElementById('playerGif');
const btnPlayPause = document.getElementById('btnPlayPause');
const playerIcon = document.getElementById('playerIcon');
const playerText = document.getElementById('playerText');
const bgContainer = document.getElementById('bg-container');

// ====================== ARRAYS DE MÍDIA ======================
// 1. Array do Fundo Global (63 imagens)
let minhasImagens = [];
for (let i = 1; i <= 63; i++) {
    minhasImagens.push(`images/image (${i}).jpg`);
}

// 2. Array dos GIFs do Player (25 GIFs)
let meusGifs = [];
for (let i = 1; i <= 25; i++) {
    meusGifs.push(`./gifs/experiencia${i}.gif`); // Usando o prefixo ./ para segurança no caminho
}

let bgInterval = null;
let currentBgIndex = 0;

let gifInterval = null;
let currentGifIndex = 0;

// ====================== ANIMAÇÕES GSAP INICIAIS ======================
function initGSAP() {
    gsap.from(".title-enigmatic", { duration: 1.8, y: 60, opacity: 0, ease: "power3.out" });
    gsap.from(".subtitle", { duration: 1.5, y: 40, opacity: 0, delay: 0.4 });
    gsap.from(".manifesto-text p, .manifesto-text h3", { 
        duration: 1.3, y: 40, opacity: 0, stagger: 0.2, delay: 0.7 
    });
    gsap.from(".player-card", { duration: 1.8, y: 90, opacity: 0, delay: 1.2, ease: "power3.out" });
}

// ====================== BACKGROUND DA PÁGINA (Imagens) ======================
function inicializarBackgrounds() {
    bgContainer.innerHTML = '';
    
    minhasImagens.forEach((caminhoImg, index) => {
        const div = document.createElement('div');
        div.className = `bg-overlay ${index === 0 ? 'active' : ''}`;
        div.style.backgroundImage = `linear-gradient(rgba(10, 17, 40, 0.68), rgba(10, 17, 40, 0.68)), url('${caminhoImg}')`;
        bgContainer.appendChild(div);
    });

    initGSAP();
}

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

// ====================== ROTAÇÃO DOS 25 GIFs DO PLAYER ======================
function startGifRotation() {
    if (gifInterval) clearInterval(gifInterval);
    
    // Troca o GIF a cada 8 segundos
    gifInterval = setInterval(() => {
        let nextIndex;
        
        // Garante que não repita o mesmo GIF duas vezes seguidas
        do {
            nextIndex = Math.floor(Math.random() * meusGifs.length);
        } while (nextIndex === currentGifIndex && meusGifs.length > 1);
        
        currentGifIndex = nextIndex;
        
        // Transição suave via GSAP
        gsap.to(gifElement, {
            opacity: 0.2, // Não apaga totalmente para evitar 'fundo preto' brusco
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                gifElement.src = meusGifs[currentGifIndex];
                gsap.to(gifElement, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
            }
        });
    }, 8000);
}

function stopGifRotation() {
    if (gifInterval) clearInterval(gifInterval);
    gifInterval = null;
}

// ====================== CONTROLE DO PLAYER ======================
document.querySelectorAll('.track-link').forEach(link => {
    link.addEventListener('click', function() {
        // Atualiza UI da Playlist
        document.querySelectorAll('.track-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Captura a nova fonte do vídeo
        const newSrc = this.getAttribute('data-src');
        
        // Atualiza e dispara a música
        video.src = newSrc;
        video.load();
        video.play().catch(() => {});

        // Atualiza Botão
        playerIcon.textContent = '⏸';
        playerText.textContent = 'Pausar Experiência';

        // Reinicia as rotações de Imagens(Fundo) e GIFs(Player)
        stopAmbience();
        startAmbience();
        
        startGifRotation();
    });
});

btnPlayPause.addEventListener('click', () => {
    if (video.paused) {
        video.play().catch(() => {});
        playerIcon.textContent = '⏸';
        playerText.textContent = 'Pausar Experiência';
        
        startAmbience();
        startGifRotation();
    } else {
        video.pause();
        playerIcon.textContent = '▶';
        playerText.textContent = 'Retomar Experiência';
        
        stopAmbience();
        stopGifRotation();
    }
});

// ====================== INICIALIZAÇÃO GERAL ======================
window.onload = function() {
    inicializarBackgrounds();
    startAmbience();
    
    // Define o primeiro GIF na inicialização da tela
    gifElement.src = meusGifs[0];
    startGifRotation();
};