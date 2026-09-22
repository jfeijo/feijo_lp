/* ==========================================
   BLOG SHARED SCRIPT
   Nav chrome language toggle, scroll-reveal,
   social sharing and comment loading.
   ========================================== */

function setLang(l) {
  document.body.className = l === 'en' ? 'en' : '';
  const lpt = document.getElementById('lpt');
  const len = document.getElementById('len');
  if (lpt) lpt.classList.toggle('on', l === 'pt');
  if (len) len.classList.toggle('on', l === 'en');
}

/* NAV SOLID ON SCROLL */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', scrollY > 50);
  }, { passive: true });
}

/* SCROLL REVEAL */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
}

/* SOCIAL SHARE */
function sharePost(network) {
  const url = encodeURIComponent(location.href);
  const title = encodeURIComponent(document.title);
  const urls = {
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    x: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  };
  if (urls[network]) {
    window.open(urls[network], '_blank', 'noopener,width=600,height=600');
  }
}

function copyPostLink(btn) {
  navigator.clipboard.writeText(location.href).then(() => {
    const toast = btn.querySelector('.share-toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }).catch(() => {});
}

/* GISCUS COMMENTS (lazy-loaded) */
function loadComments(repo, repoId, category, categoryId) {
  const container = document.getElementById('giscus-container');
  if (!container) return;
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', repo);
  script.setAttribute('data-repo-id', repoId);
  script.setAttribute('data-category', category);
  script.setAttribute('data-category-id', categoryId);
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', 'dark_dimmed');
  script.setAttribute('data-lang', 'pt');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  container.appendChild(script);
}
