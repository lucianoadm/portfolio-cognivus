/* ==========================================================================
   main.js — interações do portfólio (sem dependências)
   ========================================================================== */
(() => {
  'use strict';

  const nav = document.getElementById('site-nav');
  const navToggle = document.getElementById('nav-toggle');
  const shareBtn = document.getElementById('share-btn');
  const toastEl = document.getElementById('toast');

  /* ---------- Menu mobile ---------- */
  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); navToggle.focus(); }
    });
  }

  /* ---------- Aviso curto (toast) ---------- */
  let toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 3000);
  }

  /* ---------- Compartilhar: menu nativo quando existe, senão copia o link ---------- */
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const data = { title: document.title, url: window.location.href };
      if (navigator.share) {
        try { await navigator.share(data); return; }
        catch (err) { if (err && err.name === 'AbortError') return; }
      }
      try {
        await navigator.clipboard.writeText(data.url);
        toast('Link copiado.');
      } catch {
        toast('Não foi possível copiar. Copie o endereço na barra do navegador.');
      }
    });
  }

  /* ---------- Destaque do item de menu da seção visível ---------- */
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => observer.observe(s));
  }

  /* ---------- Vídeo: não inicia sozinho para quem prefere menos movimento ---------- */
  const video = document.querySelector('.video-frame video');
  if (video && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
})();
