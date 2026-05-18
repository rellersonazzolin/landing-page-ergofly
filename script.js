/* ============================================
   Ergofly LP — Script principal
   Meta Pixel + interações leves.
   ============================================ */

// TODO: substituir 'PIXEL_ID_AQUI' pelo ID real do Meta Pixel quando o cliente fornecer.
// !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', 'PIXEL_ID_AQUI');
// fbq('track', 'PageView');

// Rastreio de clique no CTA principal (ativar quando Pixel estiver configurado)
document.addEventListener('DOMContentLoaded', () => {
  const ctas = document.querySelectorAll('[data-cta]');
  ctas.forEach((btn) => {
    btn.addEventListener('click', () => {
      // if (typeof fbq === 'function') fbq('track', 'Lead');
      // console.log('CTA clicado:', btn.dataset.cta);
    });
  });

  initScrollReveal();
  initFaqAccordion();
  initScrollDarkenVeil();
});

/* ============================================
   Scroll Darken Veil
   Overlay fixo que escurece o viewport todo conforme
   a Seção 2 (#numeros) entra e sai da vista.
   Opacidade interpolada com base na proporção visível
   da seção dentro do viewport.
   ============================================ */

function initScrollDarkenVeil() {
  const section = document.querySelector('#numeros');
  const veil = document.querySelector('#scroll-darken-veil');
  if (!section || !veil) return;

  let ticking = false;

  function update() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // Proporção visível da seção dentro do viewport (0 a 1)
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(vh, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    // Normaliza pelo menor entre viewport e altura da seção
    const denom = Math.min(vh, rect.height);
    let ratio = denom > 0 ? visibleHeight / denom : 0;

    // Amplifica e clampa
    ratio = Math.min(1, ratio * 1.6);

    veil.style.opacity = ratio.toFixed(3);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* ============================================
   FAQ accordion — toggle smooth (single-open mode)
   ============================================ */

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';

      // Fecha todos os outros (single-open accordion)
      items.forEach((other) => {
        if (other !== item) {
          other.setAttribute('data-open', 'false');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherContent = other.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
        }
      });

      // Toggle do clicado
      if (isOpen) {
        item.setAttribute('data-open', 'false');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      } else {
        item.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ============================================
   Scroll reveal — IntersectionObserver
   Adiciona .visible a elementos .scroll-reveal
   quando entram na viewport.
   ============================================ */

function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!('IntersectionObserver' in window) || elements.length === 0) {
    // Fallback: mostra tudo direto
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}
