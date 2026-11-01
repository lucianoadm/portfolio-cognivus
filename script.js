(() => {
    'use strict';

    // ====================== CONFIGURAÇÃO ======================
    const CFG = {
        bgCount: 63,                 // images/image (1).jpg ... image (63).jpg
        gifCount: 25,                // gifs/experiencia1.gif ... experiencia25.gif
        bgEvery: 14000,              // troca do fundo (ms)
        gifEvery: 8000,              // troca do GIF do palco (ms)
        artist: 'Luciano P. de Moura',
        album: 'A Hexalogia — Inabalável'
    };
    const bgSources = Array.from({ length: CFG.bgCount }, (_, i) => `images/image (${i + 1}).jpg`);
    const gifSources = Array.from({ length: CFG.gifCount }, (_, i) => `./gifs/experiencia${i + 1}.gif`);

    // ====================== ELEMENTOS ======================
    const $ = (s) => document.querySelector(s);
    const video = $('#video'), stage = $('#stage'), status = $('#status');
    const btnPlay = $('#btnPlay'), playIcon = $('#playIcon'), playText = $('#playText');
    const btnPrev = $('#btnPrev'), btnNext = $('#btnNext');
    const seek = $('#seek'), vol = $('#vol'), tCur = $('#tCur'), tDur = $('#tDur');
    const tracks = [...document.querySelectorAll('.track')];
    const bgLayers = [...document.querySelectorAll('.bg-layer')];
    const gifLayers = [...document.querySelectorAll('.stage-gif')];
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ====================== UTILITÁRIOS ======================
    const preload = (src) => new Promise((ok, fail) => {
        const im = new Image();
        im.onload = () => ok(src);
        im.onerror = () => fail(src);
        im.src = encodeURI(src);
    });
    const shuffle = (a) => {
        const r = [...a];
        for (let i = r.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [r[i], r[j]] = [r[j], r[i]];
        }
        return r;
    };
    const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00');

    // ====================== ROTAÇÃO COM CROSSFADE ======================
    // Pré-carrega a próxima imagem ANTES de exibir (sem piscar) e descarta arquivos que não existem.
    function createRotator({ sources, every, shuffled, layers, apply }) {
        let pool = [...sources], queue = [], timer = null, front = 0, last = null, busy = false;

        const next = () => {
            if (!pool.length) return null;
            if (!queue.length) {
                queue = shuffled ? shuffle(pool) : [...pool];
                if (shuffled && queue[0] === last && queue.length > 1) queue.push(queue.shift());
            }
            return queue.shift();
        };

        async function step(forced) {
            if (busy) return;
            busy = true;
            try {
                let src = forced || next();
                while (src) {
                    try { await preload(src); break; }
                    catch { pool = pool.filter((s) => s !== src); src = next(); }
                }
                if (!src) return;
                const back = 1 - front;
                apply(layers[back], src);
                layers[back].classList.add('is-on');
                layers[front].classList.remove('is-on');
                front = back;
                last = src;
            } finally { busy = false; }
        }

        return {
            show: step,
            start() { if (!timer && pool.length > 1 && !reduceMotion) timer = setInterval(step, every); },
            stop() { clearInterval(timer); timer = null; }
        };
    }

    const bg = createRotator({
        sources: bgSources, every: CFG.bgEvery, shuffled: false, layers: bgLayers,
        apply: (el, src) => { el.style.backgroundImage = `url("${encodeURI(src)}")`; }
    });
    const gifs = createRotator({
        sources: gifSources, every: CFG.gifEvery, shuffled: true, layers: gifLayers,
        apply: (el, src) => { el.src = encodeURI(src); }
    });

    let ambient = true; // fundo e GIFs giram enquanto o usuário não pausar
    const startAmbient = () => { ambient = true; bg.start(); gifs.start(); };
    const stopAmbient = () => { ambient = false; bg.stop(); gifs.stop(); };

    // Economiza bateria: nada gira com a aba em segundo plano
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { bg.stop(); gifs.stop(); }
        else if (ambient) { bg.start(); gifs.start(); }
    });

    // ====================== PLAYER ======================
    let current = 0;

    const setStatus = (msg, isError = false) => {
        status.textContent = msg;
        status.classList.toggle('is-error', isError);
    };
    const label = (i) => `${tracks[i].dataset.title} — ${tracks[i].dataset.exp}`;

    function setMediaSession() {
        if (!('mediaSession' in navigator)) return;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: tracks[current].dataset.title, artist: CFG.artist, album: CFG.album
        });
    }

    function loadTrack(i, autoplay = false) {
        current = (i + tracks.length) % tracks.length;
        tracks.forEach((t, k) => {
            t.classList.toggle('is-active', k === current);
            if (k === current) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
        });

        const url = new URL(tracks[current].dataset.src, location.href).href;
        if (video.src !== url) { video.src = tracks[current].dataset.src; video.load(); }
        else if (autoplay) video.currentTime = 0;

        seek.value = 0; tCur.textContent = '0:00'; tDur.textContent = '0:00';
        setStatus(label(current));
        setMediaSession();
        if (autoplay) video.play().catch(() => {});
    }

    const togglePlay = () => { video.paused ? video.play().catch(() => {}) : video.pause(); };

    // A interface segue o estado REAL do vídeo (se o play falhar, o botão não mente)
    video.addEventListener('play', () => {
        playIcon.setAttribute('href', '#i-pause');
        playText.textContent = 'Pausar experiência';
        startAmbient();
    });
    video.addEventListener('pause', () => {
        if (video.ended) return;
        playIcon.setAttribute('href', '#i-play');
        playText.textContent = 'Retomar experiência';
        stopAmbient();
    });
    video.addEventListener('waiting', () => setStatus('Carregando…'));
    video.addEventListener('playing', () => setStatus(label(current)));
    video.addEventListener('loadedmetadata', () => { tDur.textContent = fmt(video.duration); });
    video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        seek.value = (video.currentTime / video.duration) * 1000;
        tCur.textContent = fmt(video.currentTime);
        seek.setAttribute('aria-valuetext', `${fmt(video.currentTime)} de ${fmt(video.duration)}`);
    });
    video.addEventListener('ended', () => {
        if (current < tracks.length - 1) loadTrack(current + 1, true);   // segue para a próxima faixa
        else {                                                            // fim da hexalogia
            loadTrack(0, false);
            playIcon.setAttribute('href', '#i-play');
            playText.textContent = 'Ouvir novamente';
            stopAmbient();
        }
    });
    video.addEventListener('error', () => {
        setStatus(`Não foi possível carregar ${tracks[current].dataset.src}. Confira o nome e a pasta do arquivo.`, true);
    });

    // Controles
    btnPlay.addEventListener('click', togglePlay);
    stage.addEventListener('click', togglePlay);
    btnNext.addEventListener('click', () => loadTrack(current + 1, true));
    btnPrev.addEventListener('click', () => {
        if (video.currentTime > 3) video.currentTime = 0;   // padrão dos players: 1º toque reinicia
        else loadTrack(current - 1, true);
    });
    tracks.forEach((t, i) => t.addEventListener('click', () => loadTrack(i, true)));

    seek.addEventListener('input', () => {
        if (!video.duration) return;
        video.currentTime = (seek.value / 1000) * video.duration;
        tCur.textContent = fmt(video.currentTime);
    });

    try { const v = parseFloat(localStorage.getItem('hexalogia:vol')); if (!isNaN(v)) vol.value = v; } catch { /* sem storage */ }
    video.volume = parseFloat(vol.value);
    vol.addEventListener('input', () => {
        video.volume = parseFloat(vol.value);
        try { localStorage.setItem('hexalogia:vol', vol.value); } catch { /* sem storage */ }
    });

    // Controles na tela de bloqueio / fones (celular e navegador)
    if ('mediaSession' in navigator) {
        const handlers = {
            play: () => video.play(), pause: () => video.pause(),
            previoustrack: () => loadTrack(current - 1, true), nexttrack: () => loadTrack(current + 1, true)
        };
        for (const [action, fn] of Object.entries(handlers)) {
            try { navigator.mediaSession.setActionHandler(action, fn); } catch { /* ação não suportada */ }
        }
    }

    // ====================== INICIALIZAÇÃO ======================
    setMediaSession();
    bg.show().then(() => bg.start());     // primeira imagem de fundo e início da rotação
    gifs.start();
})();
