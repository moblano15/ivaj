'use strict';

/* =============================================================
   CONFIGURACIÓN GLOBAL DE NAVEGACIÓN
============================================================= */
const NAV_ITEMS = [
  { id: 'inicio',         href: 'index.html',         i18n: 'home',        icon: 'fa-house' },
  { id: 'informacion',    href: 'informacion.html',   i18n: 'information', icon: 'fa-circle-info' },
  { id: 'ocio',           href: 'ocio.html',          i18n: 'leisure',     icon: 'fa-gamepad' },
  { id: 'carnet',         href: 'carnet.html',        i18n: 'carnet',      icon: 'fa-id-card' },
  { id: 'albergues',      href: 'albergues.html',     i18n: 'hostels',     icon: 'fa-bed' },
  { id: 'campamentos',    href: 'campamentos.html',   i18n: 'camps',       icon: 'fa-campground' },
  { id: 'residencia',     href: 'residencia.html',    i18n: 'residence',   icon: 'fa-building' },
  { id: 'procedimientos', href: 'procedimientos.html',i18n: 'procedures',  icon: 'fa-file-lines' },
  { id: 'novedades',      href: 'novedades.html',     i18n: 'news',        icon: 'fa-bell' }
];

const SOCIAL_LINKS = [
  { icon: 'fa-facebook-f',  label: 'Facebook',  href: '#' },
  { icon: 'fa-x-twitter',   label: 'X',         href: '#' },
  { icon: 'fa-instagram',   label: 'Instagram', href: '#' },
  { icon: 'fa-youtube',     label: 'YouTube',   href: '#' },
  { icon: 'fa-tiktok',      label: 'TikTok',    href: '#' },
  { icon: 'fa-linkedin-in', label: 'LinkedIn',  href: '#' }
];

/* =============================================================
   HELPERS
============================================================= */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

let currentLanguage = localStorage.getItem('ivaj-language') || 'es';

function t(key) {
  return translations[currentLanguage]?.[key] || translations.es[key] || key;
}

function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  el.classList.add('toast-show');
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    el.classList.add('hidden');
    el.classList.remove('toast-show');
  }, 3000);
}

/* =============================================================
   RENDER HEADER
============================================================= */
function renderHeader() {
  const active = document.body.dataset.page || 'inicio';

  const navHTML = NAV_ITEMS.map(item => `
    <a href="${item.href}" class="nav-link ${item.id === active ? 'active' : ''}" data-i18n="${item.i18n}">
      ${t(item.i18n)}
    </a>`).join('');

  const mobileHTML = NAV_ITEMS.map(item => `
    <a href="${item.href}" class="mobile-link">
      <i class="fa-solid ${item.icon}"></i>
      <span data-i18n="${item.i18n}">${t(item.i18n)}</span>
    </a>`).join('');

  document.getElementById('site-header').innerHTML = `
  <a href="#contenido" class="skip-link" data-i18n="skip">${t('skip')}</a>

  <div class="institutional-strip hidden md:block">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-9 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Generalitat Valenciana
          </span>
          <span class="institutional-divider"></span>
          <span class="text-[10px] text-slate-500 dark:text-slate-400" data-i18n="institutionalPortal">
            ${t('institutionalPortal')}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <a href="#" class="institutional-link">
            <i class="fa-solid fa-folder-open text-[11px]"></i>
            <span data-i18n="citizenFolder">${t('citizenFolder')}</span>
          </a>
          <span class="institutional-divider"></span>
          <button id="favoritesButton" type="button" class="institutional-link relative">
            <i class="fa-regular fa-heart text-[11px]"></i>
            <span data-i18n="favorites">${t('favorites')}</span>
            <span id="favoriteCount" class="hidden absolute -top-1.5 -right-3 min-w-3.5 h-3.5 px-1 rounded-full bg-ivaRed text-white text-[8px] font-black items-center justify-center">0</span>
          </button>
          <span class="institutional-divider"></span>
          <button id="notificationButton" type="button" class="institutional-link relative">
            <i class="fa-regular fa-bell text-[11px]"></i>
            <span data-i18n="notifications">${t('notifications')}</span>
            <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-ivaRed"></span>
          </button>
          <span class="institutional-divider"></span>
          <button id="themeButton" type="button" class="institutional-link">
            <i class="fa-solid fa-moon dark:hidden text-[11px]"></i>
            <i class="fa-solid fa-sun hidden dark:inline text-amber-400 text-[11px]"></i>
            <span class="hidden sm:inline" data-i18n="theme">${t('theme')}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <header class="main-header">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="min-h-[72px] flex items-center gap-3">

        <button id="menuButton" type="button" aria-label="Abrir menú" aria-expanded="false"
          class="md:hidden w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800">
          <i id="menuIcon" class="fa-solid fa-bars"></i>
        </button>

        <a href="index.html" class="brand-wrapper shrink-0" aria-label="IVAJ - Inicio">
          <img src="./imag/logo.jpg" alt="Generalitat Valenciana" width="100" height="44" class="object-contain">
          <span class="brand-divider"></span>
          <img src="./imag/ivaj_logo.gif" alt="IVAJ" width="90" height="44" class="object-contain">
        </a>

        <div class="hidden md:block flex-1 max-w-xl mx-auto px-4">
          <div class="relative">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input id="globalSearch" type="search" autocomplete="off"
              placeholder="${t('searchIVAJ')}"
              class="w-full h-10 pl-11 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-ivaRed focus:ring-4 focus:ring-ivaRed/10 outline-none text-sm">
            <div id="searchResults" class="hidden absolute left-0 right-0 top-[calc(100%+9px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl p-2 z-50" role="listbox"></div>
          </div>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <div class="hidden lg:flex language-container">
            <button data-language="es"  class="language-btn ${currentLanguage==='es'?'active':''}"  type="button" aria-label="Español">ES</button>
            <button data-language="val" class="language-btn ${currentLanguage==='val'?'active':''}" type="button" aria-label="Valencià">VAL</button>
            <button data-language="en"  class="language-btn ${currentLanguage==='en'?'active':''}"  type="button" aria-label="English">EN</button>
          </div>
          <button id="installButton" type="button" class="hidden xl:flex btn btn-primary" data-i18n="install">
            <i class="fa-solid fa-download"></i>
            ${t('install')}
          </button>
        </div>
      </div>

      <div class="md:hidden pb-3">
        <div class="relative">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-ivaRed"></i>
          <input id="mobileSearch" type="search" autocomplete="off"
            placeholder="${t('mobileSearch')}"
            class="w-full h-11 pl-11 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-ivaRed outline-none text-sm">
        </div>
      </div>
    </div>

    <nav class="top-nav hidden md:block">
      <div class="max-w-7xl mx-auto px-4">
        <div class="h-11 flex justify-center items-center gap-4 lg:gap-6 overflow-x-auto">
          ${navHTML}
        </div>
      </div>
    </nav>

    <div id="mobileMenu" class="mobile-menu md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div class="p-4 space-y-1">
        ${mobileHTML}
        <div class="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
          <p class="text-[10px] uppercase tracking-widest text-slate-400 mb-2" data-i18n="language">${t('language')}</p>
          <div class="grid grid-cols-3 gap-2">
            <button data-language="es"  class="language-btn ${currentLanguage==='es'?'active':''} bg-slate-100 dark:bg-slate-800" type="button">Español</button>
            <button data-language="val" class="language-btn ${currentLanguage==='val'?'active':''} bg-slate-100 dark:bg-slate-800" type="button">Valencià</button>
            <button data-language="en"  class="language-btn ${currentLanguage==='en'?'active':''} bg-slate-100 dark:bg-slate-800" type="button">English</button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-[75] bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-200 dark:border-slate-800">
    <div class="grid grid-cols-5 h-16">
      <a href="index.html" class="bottom-item ${active==='inicio'?'active':''} flex flex-col items-center justify-center text-[9px] font-bold gap-1">
        <i class="fa-solid fa-house"></i><span>${t('home')}</span>
      </a>
      <a href="ocio.html" class="bottom-item ${active==='ocio'?'active':''} flex flex-col items-center justify-center text-[9px] font-bold gap-1">
        <i class="fa-solid fa-rocket"></i><span>${t('explore')}</span>
      </a>
      <a href="carnet.html" class="bottom-item ${active==='carnet'?'active':''} flex flex-col items-center justify-center text-[9px] font-bold gap-1">
        <i class="fa-solid fa-id-card"></i><span>${t('carnetShort')}</span>
      </a>
      <button id="bottomFavorites" class="bottom-item flex flex-col items-center justify-center text-[9px] font-bold gap-1">
        <i class="fa-regular fa-heart"></i><span>${t('favorites')}</span>
      </button>
      <button id="bottomMenu" class="bottom-item flex flex-col items-center justify-center text-[9px] font-bold gap-1">
        <i class="fa-solid fa-bars"></i><span>${t('menu')}</span>
      </button>
    </div>
  </nav>
  `;
}

/* =============================================================
   RENDER FOOTER
============================================================= */
function renderFooter() {
  document.getElementById('site-footer').innerHTML = `
  <footer>
    <div class="footer-main">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div class="md:col-span-2">
            <div class="flex items-center gap-3">
              <img src="./imag/logo.jpg" alt="Generalitat Valenciana" width="105" height="45" class="object-contain bg-white p-1 rounded">
              <span class="w-px h-9 bg-white/20"></span>
              <img src="./imag/ivaj_logo.gif" alt="IVAJ" width="95" height="45" class="object-contain bg-white rounded">
            </div>
            <p class="text-sm text-slate-300 max-w-lg mt-5" data-i18n="footerDescription">${t('footerDescription')}</p>
            <div class="mt-6">
              <h3 class="font-black text-xs uppercase tracking-widest text-slate-400 mb-3">${t('followUs')}</h3>
              <div class="footer-social">
                ${SOCIAL_LINKS.map(s => `
                  <a href="${s.href}" aria-label="${s.label}" title="${s.label}">
                    <i class="fa-brands ${s.icon}"></i>
                  </a>`).join('')}
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-black text-sm mb-4" data-i18n="services">${t('services')}</h3>
            <div class="space-y-2">
              <a href="carnet.html"         class="footer-link">${t('carnet')}</a>
              <a href="ocio.html"           class="footer-link">${t('leisure')}</a>
              <a href="albergues.html"      class="footer-link">${t('hostels')}</a>
              <a href="campamentos.html"    class="footer-link">${t('camps')}</a>
              <a href="residencia.html"     class="footer-link">${t('residence')}</a>
              <a href="procedimientos.html" class="footer-link">${t('procedures')}</a>
            </div>
          </div>

          <div>
            <h3 class="font-black text-sm mb-4" data-i18n="information">${t('information')}</h3>
            <div class="space-y-2">
              <a href="informacion.html"  class="footer-link">${t('about')}</a>
              <a href="novedades.html"    class="footer-link">${t('news')}</a>
              <a href="procedimientos.html" class="footer-link">${t('procedures')}</a>
            </div>
            <a href="#" class="btn btn-primary mt-5 text-xs">
              <i class="fa-solid fa-folder-open"></i>
              ${t('citizenFolder')}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="min-h-[55px] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px]">
          <span>${t('copyright')}</span>
          <div class="flex gap-5">
            <a href="#" data-i18n="accessibility">${t('accessibility')}</a>
            <a href="#" data-i18n="privacy">${t('privacy')}</a>
            <a href="#" data-i18n="legal">${t('legal')}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>`;
}

/* =============================================================
   TRADUCCIONES
============================================================= */
const translations = {
  es: {
    skip: 'Saltar al contenido',
    institutionalPortal: 'Portal institucional',
    accessibility: 'Accesibilidad', contact: 'Contacto', news: 'Novedades',
    home: 'Inicio', information: 'Información', leisure: 'Ocio', carnet: 'Carnet Jove',
    hostels: 'Albergues Juveniles', camps: 'Campamentos', residence: 'Residencia',
    procedures: 'Procedimientos', volunteering: 'Voluntariado',
    language: 'Idioma', theme: 'Tema', notifications: 'Notificaciones',
    citizenFolder: 'Carpeta Ciudadana', favorites: 'Favoritos',
    searchIVAJ: 'Buscar en IVAJ...', mobileSearch: '¿Qué buscas?', search: 'Buscar',
    install: 'Instalar', explore: 'Explorar', carnetShort: 'Carnet', menu: 'Menú',
    services: 'Servicios', information: 'Información', about: 'Sobre IVAJ',
    footerDescription: 'Portal de información y servicios para jóvenes.',
    copyright: '© IVAJ · Portal Jove', privacy: 'Privacidad', legal: 'Aviso legal',
    followUs: 'Síguenos',
    noResults: 'No encontramos resultados.',
    addFavorite: 'Añadir a favoritos',
    close: 'Cerrar', send: 'Enviar',
    assistant: 'Asistente IVAJ', demoAssistant: 'Asistente de demostración',
    chatGreeting: '¡Hola! 👋 ¿Qué estás buscando?',
    chatPlaceholder: 'Escribe una consulta...',
    openAssistant: 'Abrir asistente', closeAssistant: 'Cerrar asistente'
  },
  val: {
    skip: 'Saltar al contingut',
    institutionalPortal: 'Portal institucional',
    accessibility: 'Accessibilitat', contact: 'Contacte', news: 'Novetats',
    home: 'Inici', information: 'Informació', leisure: 'Oci', carnet: 'Carnet Jove',
    hostels: 'Albergs Juvenils', camps: 'Campaments', residence: 'Residència',
    procedures: 'Procediments', volunteering: 'Voluntariat',
    language: 'Idioma', theme: 'Tema', notifications: 'Notificacions',
    citizenFolder: 'Carpeta Ciutadana', favorites: 'Preferits',
    searchIVAJ: 'Buscar en IVAJ...', mobileSearch: 'Què busques?', search: 'Buscar',
    install: 'Instal·lar', explore: 'Explorar', carnetShort: 'Carnet', menu: 'Menú',
    services: 'Serveis', information: 'Informació', about: 'Sobre l’IVAJ',
    footerDescription: 'Portal d’informació i serveis per a joves.',
    copyright: '© IVAJ · Portal Jove', privacy: 'Privacitat', legal: 'Avís legal',
    followUs: 'Segueix-nos',
    noResults: 'No hem trobat resultats.',
    addFavorite: 'Afegir als preferits',
    close: 'Tancar', send: 'Enviar',
    assistant: 'Assistent IVAJ', demoAssistant: 'Assistent de demostració',
    chatGreeting: 'Hola! 👋 Què estàs buscant?',
    chatPlaceholder: 'Escriu una consulta...',
    openAssistant: 'Obrir assistent', closeAssistant: 'Tancar assistent'
  },
  en: {
    skip: 'Skip to content',
    institutionalPortal: 'Institutional portal',
    accessibility: 'Accessibility', contact: 'Contact', news: 'News',
    home: 'Home', information: 'Information', leisure: 'Leisure', carnet: 'Carnet Jove',
    hostels: 'Youth Hostels', camps: 'Camps', residence: 'Residence',
    procedures: 'Procedures', volunteering: 'Volunteering',
    language: 'Language', theme: 'Theme', notifications: 'Notifications',
    citizenFolder: 'Citizen folder', favorites: 'Favorites',
    searchIVAJ: 'Search IVAJ...', mobileSearch: 'What are you looking for?', search: 'Search',
    install: 'Install', explore: 'Explore', carnetShort: 'Carnet', menu: 'Menu',
    services: 'Services', information: 'Information', about: 'About IVAJ',
    footerDescription: 'Information and services portal for young people.',
    copyright: '© IVAJ · Youth Portal', privacy: 'Privacy', legal: 'Legal notice',
    followUs: 'Follow us',
    noResults: 'No results found.',
    addFavorite: 'Add to favorites',
    close: 'Close', send: 'Send',
    assistant: 'IVAJ Assistant', demoAssistant: 'Demo assistant',
    chatGreeting: 'Hello! 👋 What are you looking for?',
    chatPlaceholder: 'Write a question...',
    openAssistant: 'Open assistant', closeAssistant: 'Close assistant'
  }
};

/* =============================================================
   TEMA
============================================================= */
function loadTheme() {
  const saved = localStorage.getItem('ivaj-theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}
function toggleTheme() {
  const dark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ivaj-theme', dark ? 'dark' : 'light');
}

/* =============================================================
   IDIOMA
============================================================= */
function setLanguage(lang, showToast = true) {
  if (!translations[lang]) lang = 'es';
  currentLanguage = lang;
  localStorage.setItem('ivaj-language', lang);
  document.documentElement.lang = lang === 'val' ? 'ca' : lang;
  renderHeader();
  renderFooter();
  bindHeaderEvents();
  updateFavoritesUI();
  if (typeof window.onLanguageChange === 'function') {
    window.onLanguageChange();
  }
  if (showToast) toast(`${t('language')}: ${lang.toUpperCase()}`);
}

/* =============================================================
   FAVORITOS
============================================================= */
let favorites = [];
try {
  const stored = JSON.parse(localStorage.getItem('ivaj-favorites') || '[]');
  favorites = Array.isArray(stored) ? stored : [];
} catch { favorites = []; }

function saveFavorites() {
  localStorage.setItem('ivaj-favorites', JSON.stringify(favorites));
}
function updateFavoritesUI() {
  const counter = $('#favoriteCount');
  if (counter) {
    counter.textContent = favorites.length;
    counter.classList.toggle('hidden', favorites.length === 0);
    counter.classList.toggle('flex', favorites.length > 0);
  }
  const stat = $('#statFavorites');
  if (stat) stat.textContent = favorites.length;
}
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  updateFavoritesUI();
}

/* =============================================================
   MENÚ MÓVIL
============================================================= */
function bindHeaderEvents() {
  // menú hamburguesa
  $('#menuButton')?.addEventListener('click', () => {
    const menu = $('#mobileMenu');
    const icon = $('#menuIcon');
    menu?.classList.toggle('open');
    const open = menu?.classList.contains('open');
    $('#menuButton')?.setAttribute('aria-expanded', String(open));
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  $('#bottomMenu')?.addEventListener('click', () => $('#menuButton')?.click());

  // idiomas
  $$('[data-language]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.language));
  });

  // tema
  $('#themeButton')?.addEventListener('click', toggleTheme);

  // favoritos
  $('#favoritesButton')?.addEventListener('click', openFavorites);
  $('#bottomFavorites')?.addEventListener('click', openFavorites);

  // notificaciones
  $('#notificationButton')?.addEventListener('click', () => {
    toast(t('notifications') + ': OK');
  });

  // búsqueda global
  $('#globalSearch')?.addEventListener('input', e => performGlobalSearch(e.target.value));
  $('#mobileSearch')?.addEventListener('input', e => performGlobalSearch(e.target.value));
}

/* =============================================================
   BÚSQUEDA GLOBAL
============================================================= */
function performGlobalSearch(query) {
  const results = $('#searchResults');
  if (!results) return;
  query = query.trim().toLowerCase();
  if (!query) { results.classList.add('hidden'); results.innerHTML = ''; return; }

  const matches = NAV_ITEMS.filter(item =>
    (t(item.i18n) + ' ' + item.href).toLowerCase().includes(query)
  );

  results.innerHTML = '';
  if (!matches.length) {
    results.innerHTML = `<div class="p-5 text-center text-sm text-slate-400">${t('noResults')}</div>`;
  } else {
    matches.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'search-result';
      a.innerHTML = `
        <div class="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 flex items-center justify-center shrink-0">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div class="min-w-0">
          <strong class="block text-sm truncate">${t(item.i18n)}</strong>
          <span class="block text-[10px] text-slate-400 mt-1">${item.href}</span>
        </div>`;
      results.appendChild(a);
    });
  }
  results.classList.remove('hidden');
}

document.addEventListener('click', e => {
  const search = $('#globalSearch');
  const results = $('#searchResults');
  if (search && results && !search.parentElement.contains(e.target)) {
    results.classList.add('hidden');
  }
});

/* =============================================================
   MODALES Y CHAT (compartidos)
============================================================= */
function openFavorites() {
  const list = $('#favoritesList');
  if (!list) return;
  list.innerHTML = favorites.length
    ? favorites.map(id => `<div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs">#${id}</div>`).join('')
    : `<div class="text-center py-8 text-sm text-slate-400">${t('favorites')}: 0</div>`;
  $('#favoritesModal')?.classList.add('open');
}
function closeFavorites() { $('#favoritesModal')?.classList.remove('open'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeFavorites();
    $('#chatWindow')?.classList.add('hidden');
  }
});

$('#closeFavorites')?.addEventListener('click', closeFavorites);
document.addEventListener('click', e => {
  if (e.target.id === 'favoritesModal') closeFavorites();
});

/* =============================================================
   INIT
============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  renderHeader();
  renderFooter();
  bindHeaderEvents();
  updateFavoritesUI();

  // Chat
  $('#chatButton')?.addEventListener('click', () => $('#chatWindow')?.classList.toggle('hidden'));
  $('#closeChat')?.addEventListener('click', () => $('#chatWindow')?.classList.add('hidden'));

  if (typeof window.onPageReady === 'function') window.onPageReady();
});

window.IVAJ = { t, toast, setLanguage, currentLanguage: () => currentLanguage, favorites };