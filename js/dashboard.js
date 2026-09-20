/* ==========================================================================
   dashboard.js — renderiza o painel de formação a partir de formacao-data.js
   Os totais são CALCULADOS dos dados, então nunca divergem da lista.
   ========================================================================== */
(() => {
  'use strict';

  const eixos = window.FORMACAO_EIXOS || [];
  const STATUS = {
    concluido: { label: 'Concluído', mark: '\u2713' },
    andamento: { label: 'Em andamento', mark: '\u25D0' },
    pratico: { label: 'Aplicação prática', mark: '\u25CF' }
  };
  const nf = new Intl.NumberFormat('pt-BR');

  const el = {
    kpis: document.getElementById('kpis'),
    eixos: document.getElementById('eixos'),
    count: document.getElementById('result-count'),
    filters: document.getElementById('filters')
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function fmtHours(h) {
    const whole = Math.floor(h + 1e-9);
    const min = Math.round((h - whole) * 60);
    if (h < 10 && min > 0) return `${whole}h ${min}min`;
    return `${nf.format(Math.round(h))}h`;
  }

  /* ---------- Totais ---------- */
  const all = eixos.flatMap((e) => e.itens);
  const sum = (status) => all.filter((i) => i.status === status && i.h).reduce((t, i) => t + i.h, 0);
  const count = (status) => all.filter((i) => i.status === status).length;

  function renderKpis() {
    const kpis = [
      { value: String(count('concluido')), label: 'formações concluídas' },
      { value: fmtHours(sum('concluido')), label: 'de carga horária concluída' },
      { value: fmtHours(sum('pratico')), label: 'de prática autodeclarada, sem certificado' }
    ];
    el.kpis.innerHTML = kpis
      .map((k) => `<div><dt>${esc(k.label)}</dt><dd class="value">${esc(k.value)}</dd></div>`)
      .join('');
  }

  /* ---------- Lista ---------- */
  function itemHtml(item) {
    const s = STATUS[item.status];
    const meta = item.h != null
      ? `${fmtHours(item.h)}${item.nota ? ` (${esc(item.nota)})` : ''}`
      : esc(item.local || '');
    return `
      <article class="item">
        <div class="item-meta">
          <span class="status status--${item.status}"><span aria-hidden="true">${s.mark}</span> ${s.label}</span>
          <span class="item-hours">${meta}</span>
        </div>
        <h3>${esc(item.nome)}</h3>
        <p class="inst">${esc(item.inst)}</p>
        <p class="desc">${esc(item.desc)}</p>
      </article>`;
  }

  function render(filter = 'todos') {
    const filtering = filter !== 'todos';
    let total = 0;

    el.eixos.innerHTML = eixos
      .map((eixo) => {
        const itens = eixo.itens.filter((i) => !filtering || i.status === filter);
        if (!itens.length) return '';
        total += itens.length;
        return `
          <details class="eixo"${filtering ? ' open' : ''}>
            <summary>
              <h2>${esc(eixo.titulo)}</h2>
              <span class="count">${itens.length} ${itens.length === 1 ? 'item' : 'itens'}</span>
            </summary>
            <div class="eixo-body">${itens.map(itemHtml).join('')}</div>
          </details>`;
      })
      .join('');

    el.count.textContent = filtering
      ? `${total} ${total === 1 ? 'item' : 'itens'} em "${STATUS[filter].label}".`
      : `${total} itens em ${eixos.length} eixos. Abra um eixo para ver os detalhes.`;
  }

  el.filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    el.filters.querySelectorAll('.filter-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    render(btn.dataset.filter);
  });

  renderKpis();
  render();
})();
