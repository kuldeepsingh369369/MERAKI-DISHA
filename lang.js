(function () {
  const LANG_KEY = 'mirai_lang';
  window.currentLang = localStorage.getItem(LANG_KEY) || 'en';

  function deepMerge(target, source) {
    if (!source || typeof source !== 'object') return;
    Object.keys(source).forEach(function (key) {
      if (Array.isArray(source[key])) {
        if (!Array.isArray(target[key])) target[key] = [];
        source[key].forEach(function (item, i) {
          if (item !== null && typeof item === 'object') {
            if (!target[key][i] || typeof target[key][i] !== 'object') target[key][i] = {};
            deepMerge(target[key][i], item);
          } else if (item !== undefined) {
            target[key][i] = item;
          }
        });
      } else if (source[key] !== null && typeof source[key] === 'object') {
        if (!target[key] || typeof target[key] !== 'object') target[key] = {};
        deepMerge(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });
  }

  if (window.currentLang === 'hi' && typeof siteContentHi !== 'undefined') {
    deepMerge(siteContent, siteContentHi);
    document.documentElement.setAttribute('lang', 'hi');
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }

  function toggleLang() {
    localStorage.setItem(LANG_KEY, window.currentLang === 'en' ? 'hi' : 'en');
    location.reload();
  }

  var uiMap = {
    hi: {
      'About': 'हमारे बारे में',
      'Our Mission': 'हमारा मिशन',
      'Our Team': 'हमारी टीम',
      'What We Do': 'हम क्या करते हैं',
      '♥ Donate': '♥ दान करें',
      'Join Us': 'जुड़ें',
      'Field Updates': 'फील्ड अपडेट',
      'Media': 'मीडिया',
      'Privacy Policy': 'गोपनीयता नीति',
      'Register Your School': 'स्कूल पंजीकृत करें',
      'Newsletter': 'न्यूज़लेटर',
      'Go to Donation Page': 'दान पृष्ठ पर जाएँ',
      'Explore Our Mission': 'हमारा मिशन जानें',
      'Register Your School': 'अपना स्कूल पंजीकृत करें',
      'See How It Works': 'यह कैसे काम करता है',
      'Express Your Interest': 'रुचि बताएँ',
      'See How You Can Help': 'कैसे मदद करें',
      'Meet the full team': 'पूरी टीम से मिलें',
      'View media': 'मीडिया देखें',
      'View field updates': 'फील्ड अपडेट देखें',
      'Send Interest': 'भेजें',
      'Submit Registration': 'पंजीकरण भेजें',
      'Contact via WhatsApp': 'WhatsApp पर संपर्क करें',
    }
  };

  function translateStaticUI() {
    var map = uiMap[window.currentLang];
    if (!map) return;
    var selectors = '.nav-links a, .footer-links a, .btn, .cta-row a';
    document.querySelectorAll(selectors).forEach(function (el) {
      var t = el.textContent.trim();
      if (map[t]) el.textContent = map[t];
    });
  }

  function injectLangToggle() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var btn = document.createElement('button');
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', window.currentLang === 'en' ? 'हिंदी में देखें' : 'View in English');
    btn.textContent = window.currentLang === 'en' ? 'हिं' : 'EN';
    btn.addEventListener('click', toggleLang);
    nav.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectLangToggle();
    if (window.currentLang === 'hi') {
      translateStaticUI();
      document.body.classList.add('lang-hi');
    }
  });
})();