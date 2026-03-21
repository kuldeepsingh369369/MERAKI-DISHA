(function () {
  const LANG_KEY = "mirai_lang";
  const path = window.location.pathname;
  const isHindiPath = /(?:^|\/)hi(?:\/|$)/.test(path);
  window.currentLang = isHindiPath ? "hi" : "en";
  localStorage.setItem(LANG_KEY, window.currentLang);

  function deepMerge(target, source) {
    if (!source || typeof source !== "object") return;
    Object.keys(source).forEach(function (key) {
      if (Array.isArray(source[key])) {
        if (!Array.isArray(target[key])) target[key] = [];
        source[key].forEach(function (item, i) {
          if (item !== null && typeof item === "object") {
            if (!target[key][i] || typeof target[key][i] !== "object") target[key][i] = {};
            deepMerge(target[key][i], item);
          } else if (item !== undefined) {
            target[key][i] = item;
          }
        });
      } else if (source[key] !== null && typeof source[key] === "object") {
        if (!target[key] || typeof target[key] !== "object") target[key] = {};
        deepMerge(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });
  }

  if (window.currentLang === "hi" && typeof siteContentHi !== "undefined") {
    deepMerge(siteContent, siteContentHi);
    document.documentElement.setAttribute("lang", "hi");
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }

  function counterpartUrl() {
    var pathname = window.location.pathname;
    var search = window.location.search || "";
    var hash = window.location.hash || "";

    if (window.currentLang === "hi") {
      var englishPath = pathname.replace("/hi/", "/");
      if (englishPath === "/index.html") englishPath = "/";
      return englishPath + search + hash;
    }

    var targetPath = pathname === "/" ? "/hi/" : pathname.replace(/^\/+/, "/hi/");
    return targetPath + search + hash;
  }

  function toggleLang() {
    var nextLang = window.currentLang === "en" ? "hi" : "en";
    localStorage.setItem(LANG_KEY, nextLang);
    window.location.href = counterpartUrl();
  }

  function injectLangToggle() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var btn = document.createElement("a");
    btn.className = "lang-toggle";
    btn.setAttribute("aria-label", window.currentLang === "en" ? "हिंदी में देखें" : "View in English");
    btn.textContent = window.currentLang === "en" ? "हिंदी" : "English";
    btn.href = counterpartUrl();
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      toggleLang();
    });
    nav.appendChild(btn);
  }

  function setText(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHTML(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  function setAttr(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function setMeta(attr, key, value) {
    var el = document.head.querySelector('meta[' + attr + '="' + key + '"]');
    if (el) el.setAttribute("content", value);
  }

  function pageName() {
    var name = window.location.pathname.split("/").pop();
    return name || "index.html";
  }

  var uiMap = {
    hi: {
      "About": "हमारे बारे में",
      "Our Mission": "हमारा मिशन",
      "Our Team": "हमारी टीम",
      "What We Do": "हम क्या करते हैं",
      "♥ Donate": "♥ दान करें",
      "Join Us": "जुड़ें",
      "Field Updates": "फील्ड अपडेट",
      "Media": "मीडिया",
      "Privacy Policy": "गोपनीयता नीति",
      "Register Your School": "अपना स्कूल पंजीकृत करें",
      "Newsletter": "न्यूज़लेटर",
      "Go to Donation Page": "दान पृष्ठ पर जाएँ",
      "Explore Our Mission": "हमारा मिशन जानें",
      "See How It Works": "यह कैसे काम करता है",
      "Express Your Interest": "रुचि बताएँ",
      "See How You Can Help": "आप कैसे मदद कर सकते हैं",
      "Meet the full team": "पूरी टीम से मिलें",
      "View media": "मीडिया देखें",
      "View field updates": "फील्ड अपडेट देखें",
      "Send Interest": "रुचि भेजें",
      "Submit Registration": "पंजीकरण भेजें",
      "Contact via WhatsApp": "WhatsApp पर संपर्क करें",
      "Contact the Team": "टीम से संपर्क करें",
      "Contact to Support": "सहयोग के लिए संपर्क करें",
      "Support the Work": "कार्य का समर्थन करें",
      "See Our Work": "हमारा काम देखें",
      "Donate or Sponsor": "दान करें या प्रायोजित करें",
      "See the Team Behind the Work": "काम के पीछे की टीम देखें",
      "View all updates": "सभी अपडेट देखें",
      "View all media": "सभी मीडिया देखें",
      "View Full Team": "पूरी टीम देखें",
      "See Volunteer Opportunities": "स्वयंसेवा के अवसर देखें",
      "Register a School": "एक स्कूल पंजीकृत करें"
    }
  };

  function translateStaticUI() {
    var map = uiMap[window.currentLang];
    if (!map) return;
    var selectors = ".nav-links a, .footer-links a, .btn, .cta-row a";
    document.querySelectorAll(selectors).forEach(function (el) {
      var t = el.textContent.trim();
      if (map[t]) el.textContent = map[t];
    });
  }

  function applyCommonHindi() {
    document.title = "Mirai Society | भारत भर में युवा-नेतृत्व वाला शिक्षा NGO";
    setMeta("name", "description", "Mirai Society एक युवा-नेतृत्व वाला NGO है जो बच्चों, परिवारों और स्कूलों के साथ प्रत्यक्ष फील्ड कार्य के माध्यम से उत्तराखंड से शुरू होकर पूरे भारत में शिक्षा आंदोलन बना रहा है।");
    setMeta("property", "og:title", document.title);
    setMeta("property", "og:description", "एक युवा-नेतृत्व वाला NGO जो बच्चों, परिवारों और स्कूलों के साथ प्रत्यक्ष कार्य के माध्यम से शिक्षा को मजबूत कर रहा है।");
    setMeta("name", "twitter:title", document.title);
    setMeta("name", "twitter:description", "एक युवा-नेतृत्व वाला NGO जो बच्चों, परिवारों और स्कूलों के साथ प्रत्यक्ष कार्य के माध्यम से शिक्षा को मजबूत कर रहा है।");

    setText(".skip-link", "सामग्री पर जाएँ");
    setText(".brand-subtitle", "हर सपने के लिए शिक्षा");
    setAttr(".brand", "aria-label", "Mirai Society होम");
    setAttr("#menuToggle", "aria-label", "मेनू खोलें");
    setAttr("#topSocials", "aria-label", "सोशल मीडिया लिंक");
    setText(".footer-heading", "खोजें");
    if (document.querySelectorAll(".footer-heading")[1]) {
      document.querySelectorAll(".footer-heading")[1].textContent = "संपर्क करें";
    }
    setText(".footer-title", "बच्चों की शिक्षा के लिए समुदाय-आधारित कार्य।");
    setText(".footer-text", "हम बच्चों, परिवारों और स्थानीय समुदायों के साथ मिलकर व्यावहारिक सहयोग, विश्वास और निरंतर उपस्थिति के माध्यम से शिक्षा तक पहुँच को मजबूत करते हैं।");
    setText(".footer-note", "पंजीकृत संस्था · भारत · उत्तराखंड से शुरू होकर पूरे भारत में राष्ट्रीय शिक्षा मिशन का निर्माण।");
    setHTML(".footer-meta div:last-child", "© <span id=\"year\"></span> Mirai Society. सर्वाधिकार सुरक्षित।");
    setAttr("#whatsappFloat", "aria-label", "WhatsApp पर Mirai Society से बात करें");
    setText("#whatsappFloat span", "WhatsApp");
    setAttr("#lightboxClose", "aria-label", "छवि दर्शक बंद करें");
    setAttr(".lightbox-dialog", "aria-label", "बड़ी छवि");
  }

  function applyIndexHindi() {
    document.title = "Mirai Society | भारत भर में युवा-नेतृत्व वाला शिक्षा NGO";
    setText(".hero .eyebrow", "समुदाय-आधारित शैक्षणिक सहयोग");
    setText(".media-badge strong", "ऊर्जावान कार्रवाई। भरोसेमंद उपस्थिति।");
    setText(".media-badge-text", "शिक्षक और युवा पेशेवर व्यावहारिक शैक्षणिक सहायता और भरोसेमंद सामुदायिक साझेदारी के माध्यम से बच्चों का समर्थन कर रहे हैं।");
    setText("#about .section-kicker", "हम कौन हैं");
    setText("#mission .card .section-kicker", "हम क्यों मौजूद हैं");
    setText("#mission .card-accent .section-kicker", "Mirai Learning Center");
    setText("#mission .card-accent h3", "नामांकन और वास्तविक सीखने के बीच की खाई पाटना");
    setText("#mission .card-accent p", "हम स्कूलों के साथ साझेदारी करके अपने लर्निंग सेंटर में उन बच्चों को पढ़ाते हैं जो नियमित रूप से स्कूल नहीं जा पाते, ताकि वे सीखते रहें और अपने स्कूल में परीक्षाएँ दे सकें।");
    setHTML("#mission .card-accent .highlight-list", "<span class=\"highlight-chip\">3 कार्यक्रम चल रहे हैं</span><span class=\"highlight-chip\">3 पिछले वर्ष पूरे हुए</span><span class=\"highlight-chip\">और जल्द शुरू होंगे</span>");
    setText("#difference .section-kicker", "हम अलग क्यों हैं");
    setText("#programs .section-kicker", "हम क्या करते हैं");
    setText("#programs .section-head h2", "हमारे कार्यक्रम");
    setText("#programs .section-head p", "हमारा काम शैक्षणिक सहयोग, पारिवारिक जुड़ाव और सामुदायिक स्तर की कार्रवाई को जोड़ता है, जो स्थानीय स्तर पर गहराई बना सकता है और समय के साथ विस्तार कर सकता है।");
    setText("#barriers .section-kicker", "वास्तविक अंतर");
    setText("#future-readiness .section-kicker", "भविष्य के लिए तैयारी");
    setText("#impact-story .section-kicker", "प्रभाव कहानी");
    setText("#more-stories .section-kicker", "फील्ड से और कहानियाँ");
    setText("#more-stories h2", "ज़मीन से बदलाव की कहानियाँ");
    setText("#more-stories p", "हर कहानी उस निरंतर, समुदाय-आधारित काम को दर्शाती है जो वास्तविक शैक्षणिक प्रगति को आगे बढ़ाता है।");
    setText("#support .section-kicker", "सहयोग");
    setText("#trust .section-kicker", "पारदर्शिता");
    setText("#trust .section-head h2", "हम सहयोग का उपयोग कैसे करते हैं, और आप हम पर भरोसा क्यों कर सकते हैं");
    setText("#trust .section-head p", "हम मानते हैं कि दाताओं को स्पष्टता मिलनी चाहिए। यहाँ बताया गया है कि सहयोग कैसे उपयोग होता है और हमारी कानूनी स्थिति क्या है।");
    setText("#trust .trust-fund-block h3", "आपका सहयोग कैसे उपयोग होता है");
    setText("#trust .trust-info-block h3", "हमारा पंजीकरण");
    setText("#trust .trust-tax-head", "कर छूट (80G / 12A)");
    setText("#updates .section-kicker", "मुख्य झलकियाँ");
    setText("#updates h2", "फील्ड अपडेट");
    setText("#updates p", "बच्चों और परिवारों के साथ हमारे काम से हाल की फील्ड गतिविधियाँ, महत्वपूर्ण पड़ाव और ज़मीनी प्रगति।");
    setText("#gallery .section-kicker", "दृश्य कहानियाँ");
    setText("#gallery h2", "गैलरी");
    setText("#gallery p", "सीखने के सत्रों, फील्ड दौरों और उन समुदायों की छवियाँ जो हमारे काम को आकार देते हैं।");
    setText("#videos .section-kicker", "फील्ड फुटेज");
    setText("#videos h2", "वीडियो");
    setText("#videos p", "फील्ड से छोटे वीडियो पल जो दिखाते हैं कि हमारा काम ज़मीन पर कैसा दिखता है।");
    setText("#team-preview .section-kicker", "हमारी टीम");
    setText("#team-preview h2", "Mirai Society के पीछे के लोगों से मिलें");
    setText("#team-preview p", "Mirai Society युवा शिक्षकों, संस्थापकों और पेशेवरों द्वारा संचालित है जो नेतृत्व, प्रबंधन और फील्ड समन्वय में साथ काम करते हैं। इस मिशन को आगे बढ़ाने वाले लोगों से मिलने के लिए पूरी टीम का पेज देखें।");
    setText("#volunteer .section-kicker", "जुड़ें");
    setText("#volunteer h2", "Mirai Society समुदाय से जुड़ें");
    setText("#volunteer p", "चाहे आप महीने में कुछ घंटे दे सकें या हमारी नियमित फील्ड टीम का हिस्सा बनना चाहें, पढ़ाएँ, मार्गदर्शन करें, अपने कौशल साझा करें या स्थानीय आउटरीच में सहयोग दें। यहाँ आपके लिए एक सार्थक भूमिका है।");
    setHTML("#volunteer .highlight-list", "<span class=\"highlight-chip\">पढ़ाएँ या मार्गदर्शन करें</span><span class=\"highlight-chip\">पेशेवर कौशल</span><span class=\"highlight-chip\">स्थानीय आउटरीच</span>");
    setText(".footer-cta .section-kicker", "एक बच्चे की सीखने की यात्रा का समर्थन करें");
    setText(".footer-cta-title", "पहुँच, परिचय और प्रोत्साहन को वास्तविक अवसर में बदलने में मदद करें।");
  }

  function applyDonateHindi() {
    document.title = "Mirai Society का सहयोग करें | दान या स्वयंसेवा | भारत भर में शिक्षा NGO";
    setMeta("name", "description", "किताबों, स्टेशनरी, शैक्षणिक सामग्री, प्रायोजन या दान के माध्यम से Mirai Society का समर्थन करें, जिससे बच्चे सीखने से जुड़े रहें।");
    setText(".page-hero .section-kicker", "कार्य का सहयोग करें");
    setText(".page-title", "बच्चे की सीखने की यात्रा का उसी रूप में सहयोग करें जो सबसे उपयोगी हो");
    setText(".page-description", "Mirai Society केवल धन नहीं खोज रही है। हमें पुरानी किताबें, नई किताबें, पेंसिल, पेन, नोटबुक, स्टेशनरी और ऐसा सहयोग भी चाहिए जो हमें बच्चों के लिए पढ़ाना, मार्गदर्शन देना और सीखने के अवसर बनाना जारी रखने में मदद करे।");
    setAttr(".hero-support-card", "aria-label", "अभी कैसे सहयोग करें");
    setText(".hero-support-card .section-kicker", "अभी कैसे सहयोग करें");
    setText(".hero-support-card h2", "सामग्री, किताबें या प्रत्यक्ष सहयोग");
    setText(".hero-support-card > p", "अभी सबसे तेज़ तरीका है कि आप जो योगदान देना चाहते हैं उसके साथ सीधे टीम से संपर्क करें।");
    setText(".hero-support-item:nth-of-type(1) strong", "किताबें और स्टेशनरी");
    setText(".hero-support-item:nth-of-type(1) span", "पुरानी किताबें, नई किताबें, नोटबुक, पेन, पेंसिल और उपयोगी कक्षा सामग्री");
    setText(".hero-support-item:nth-of-type(2) strong", "शिक्षण और सीखने का सहयोग");
    setText(".hero-support-item:nth-of-type(2) span", "ऐसी सामग्री, सुविधाएँ या आर्थिक सहायता जो पढ़ाई और आउटरीच को सक्रिय रखे");
    setText(".hero-support-item:nth-of-type(3) strong", "UPI / QR जल्द");
    setText(".hero-support-item:nth-of-type(3) span", "ऑनलाइन भुगतान विवरण जल्द जोड़े जाएँगे। अभी समर्थक किताबों, सीखने की सामग्री, स्टेशनरी, प्रायोजन या टीम के साथ सीधे समन्वय के माध्यम से मदद कर सकते हैं।");
    setAttr(".donation-banner img", "alt", "Mirai Society के सीखने के वातावरण में सक्रिय बच्चे");
    setText(".donation-banner figcaption", "ऐसा सहयोग जो सीखने की सामग्री, जुड़ाव और भरोसेमंद स्थानीय उपस्थिति के माध्यम से बच्चों तक पहुँचता है।");
    setText("#why-donate .section-kicker", "दान क्यों करें");
    setText("#why-donate h2", "शैक्षणिक सहयोग अभी क्यों महत्वपूर्ण है");
    setText("#why-donate .section-head p", "कई बच्चों के लिए चुनौती सिर्फ स्कूल में प्रवेश नहीं है। चुनौती है सीखने की सामग्री, मार्गदर्शन, आत्मविश्वास, भविष्य के अवसर और उनके आसपास उपलब्ध शिक्षण सहयोग से जुड़े रहना।");
    setText("#why-donate .program-card:nth-of-type(1) h3", "शिक्षा निरंतरता बनाती है");
    setText("#why-donate .program-card:nth-of-type(1) p", "जब बच्चों को स्थिर सहयोग मिलता है, तो वे स्कूल, सीखने की आदतों और दीर्घकालिक विकास से जुड़े रहने की अधिक संभावना रखते हैं।");
    setText("#why-donate .program-card:nth-of-type(2) h3", "परिचय आत्मविश्वास बदलता है");
    setText("#why-donate .program-card:nth-of-type(2) p", "मार्गदर्शन, प्रोत्साहन और डिजिटल जागरूकता बच्चों को तत्काल सीमाओं से परे एक व्यापक भविष्य की कल्पना करने में मदद करते हैं।");
    setText("#why-donate .program-card:nth-of-type(3) h3", "सामग्री का सहयोग वास्तविक प्रभाव डालता है");
    setText("#why-donate .program-card:nth-of-type(3) p", "एक नोटबुक, किताबों का सेट, स्टेशनरी, एक शिक्षण सत्र या फील्ड दौरा किसी बच्चे की सीखने की यात्रा में रुकावट और निरंतरता के बीच का अंतर बन सकता है।");
    setText("#why-mirai .card .section-kicker", "Mirai क्यों");
    setText("#why-mirai .card h3", "युवा-नेतृत्व वाला और ज़मीन के करीब");
    setText("#why-mirai .card p", "Mirai Society युवा शिक्षकों और पेशेवरों द्वारा बनाई गई है जो बच्चों, परिवारों, स्कूलों और समुदायों के साथ सीधे काम करते हैं। सहयोग दृश्यमान, स्थानीय और व्यावहारिक कार्य में जाता है, जिसमें बच्चों के लिए सामग्री और शिक्षण प्रयास शामिल हैं जिन्हें ग्रामीण क्षेत्रों में पूर्णकालिक टीम सदस्य अक्सर व्यक्तिगत रूप से भी संभालते हैं।");
    setText("#why-mirai .card-accent .section-kicker", "हमारी ताकत");
    setText("#why-mirai .card-accent h3", "विश्वास, उपस्थिति और व्यावहारिक कार्रवाई");
    setHTML("#why-mirai .highlight-list", "<span class=\"highlight-chip\">250+ बच्चों तक पहुँच</span><span class=\"highlight-chip\">18 फील्ड गतिविधियाँ पूरी</span><span class=\"highlight-chip\">दैनिक ज़मीनी जुड़ाव</span>");
    setText("#ways-you-can-support .section-kicker", "सहयोग के तरीके");
    setText("#ways-you-can-support h2", "पैसे से आगे का सहयोग");
    setText("#ways-you-can-support .section-head p", "आप सामग्री, समय, कौशल, शिक्षण सहयोग, डिजिटल संसाधन, साझेदारी या आर्थिक योगदान के माध्यम से Mirai Society की मदद कर सकते हैं।");
    setHTML("#ways-you-can-support .donate-highlight-list", "<span class=\"highlight-chip\">पुरानी या नई किताबें</span><span class=\"highlight-chip\">पेन, पेंसिल, नोटबुक</span><span class=\"highlight-chip\">डिजिटल उपकरण</span><span class=\"highlight-chip\">करियर और परिचय सहयोग</span><span class=\"highlight-chip\">लर्निंग स्पेस सामग्री</span><span class=\"highlight-chip\">स्वयंसेवी समय</span><span class=\"highlight-chip\">आर्थिक सहयोग</span>");
    setText("#ways-you-can-support .program-card:nth-of-type(1) h3", "किताबें और पठन सामग्री");
    setText("#ways-you-can-support .program-card:nth-of-type(1) p", "पुरानी किताबें, नई किताबें, बच्चों की किताबें, कहानी की किताबें और ऐसी सामग्री जिसे अच्छी तरह दोबारा इस्तेमाल किया जा सके।");
    setText("#ways-you-can-support .program-card:nth-of-type(2) h3", "स्टेशनरी और स्कूल सामग्री");
    setText("#ways-you-can-support .program-card:nth-of-type(2) p", "पेन, पेंसिल, नोटबुक, स्कूल बैग, ज्योमेट्री बॉक्स और बुनियादी अध्ययन सामग्री।");
    setText("#ways-you-can-support .program-card:nth-of-type(3) h3", "स्कूल तैयारी सहयोग");
    setText("#ways-you-can-support .program-card:nth-of-type(3) p", "यूनिफॉर्म, जूते, बैग, नोटबुक, पेंसिल और परीक्षा सामग्री जो बच्चों को सीखने के लिए तैयार रखती है।");
    setText("#ways-you-can-support .program-card:nth-of-type(4) h3", "शिक्षण सहयोग");
    setText("#ways-you-can-support .program-card:nth-of-type(4) p", "चॉक, मार्कर, चार्ट, बोर्ड, प्रिंटआउट, रजिस्टर, शिक्षण किट और सरल कक्षा उपकरण जो सत्रों को बेहतर बनाते हैं।");
    setText("#ways-you-can-support .program-card:nth-of-type(5) h3", "डिजिटल सहयोग");
    setText("#ways-you-can-support .program-card:nth-of-type(5) p", "काम करने वाले लैपटॉप, टैबलेट, प्रोजेक्टर या अन्य डिजिटल उपकरण जो बच्चों को तकनीक और सीखने की पहुँच से परिचित कराएँ।");
    setText("#ways-you-can-support .program-card:nth-of-type(6) h3", "करियर और परिचय सहयोग");
    setText("#ways-you-can-support .program-card:nth-of-type(6) p", "मेंटॉरशिप, करियर जागरूकता, परिचय सत्र और ऐसा मार्गदर्शन जो बच्चों को व्यापक अवसर समझने में मदद करे।");
    setText("#ways-you-can-support .program-card:nth-of-type(7) h3", "स्वयंसेवी और पेशेवर सहयोग");
    setText("#ways-you-can-support .program-card:nth-of-type(7) p", "शिक्षण, मार्गदर्शन, आउटरीच, डिज़ाइन, फंडरेजिंग, कंप्यूटर सहयोग या करियर मार्गदर्शन।");
    setText("#ways-you-can-support .program-card:nth-of-type(8) h3", "सामुदायिक लर्निंग स्पेस सहयोग");
    setText("#ways-you-can-support .program-card:nth-of-type(8) p", "चटाइयाँ, कुर्सियाँ, टेबल, शेल्फ, लाइट, पंखे, स्टोरेज, व्हाइटबोर्ड और अन्य व्यावहारिक सामान जो स्थानीय सीखने के वातावरण को बेहतर बनाते हैं।");
    setText("#ways-you-can-support .program-card:nth-of-type(9) h3", "साझेदारी और प्रायोजन");
    setText("#ways-you-can-support .program-card:nth-of-type(9) p", "स्कूलों, स्थानीय व्यवसायों, स्टेशनरी स्टोर्स, पुस्तक दाताओं या बड़े सामुदायिक भागीदारों का सहयोग।");
    setText("#current-needs .section-kicker", "वर्तमान ज़रूरतें");
    setText("#current-needs h2", "अभी किस सहयोग की सबसे अधिक ज़रूरत है");
    setText("#current-needs p", "ज़रूरतें बदलने पर इस हिस्से को अपडेट किया जा सकता है, ताकि समर्थकों को पता रहे कि इस समय सबसे उपयोगी क्या है।");
    setText("#current-needs .current-needs-item:nth-of-type(1) strong", "बच्चों के लिए किताबें");
    setText("#current-needs .current-needs-item:nth-of-type(1) span", "कहानी की किताबें, सीखने की किताबें और अच्छी स्थिति में पठन सामग्री");
    setText("#current-needs .current-needs-item:nth-of-type(2) strong", "नोटबुक और स्टेशनरी");
    setText("#current-needs .current-needs-item:nth-of-type(2) span", "रोज़ाना सीखने के लिए पेन, पेंसिल, नोटबुक और बुनियादी अध्ययन सामग्री");
    setText("#current-needs .current-needs-item:nth-of-type(3) strong", "शिक्षण सामग्री");
    setText("#current-needs .current-needs-item:nth-of-type(3) span", "चॉक, मार्कर, चार्ट, बोर्ड, प्रिंटआउट और सरल कक्षा उपकरण");
    setText("#current-needs .current-needs-item:nth-of-type(4) strong", "चल रहे शिक्षण प्रयास के लिए सहयोग");
    setText("#current-needs .current-needs-item:nth-of-type(4) span", "ऐसी मदद जो शैक्षणिक सत्रों और आउटरीच को निरंतर जारी रखने दे");
    setText("#donation-methods .section-kicker", "दान के तरीके");
    setText("#donation-methods h2", "किताबें, सामग्री या दान, सब उपयोगी हैं");
    setText("#donation-methods .donation-copy > p", "यह हिस्सा आपके मर्चेंट सेटअप के लिए तैयार है। UPI ID या पेमेंट QR उपलब्ध होने पर उसे यहाँ जोड़ा जा सकता है। तब तक समर्थक सामग्री दान करने, ज़रूरत प्रायोजित करने या सबसे उपयोगी तरीके से आर्थिक सहयोग भेजने के लिए सीधे संपर्क कर सकते हैं।");
    setHTML("#donation-methods .donation-copy .highlight-list", "<span class=\"highlight-chip\">पुरानी या नई किताबें</span><span class=\"highlight-chip\">पेन, पेंसिल, स्टेशनरी</span><span class=\"highlight-chip\">किताबें और अध्ययन सामग्री</span><span class=\"highlight-chip\">शिक्षण सामग्री</span><span class=\"highlight-chip\">स्वयंसेवी और साझेदारी सहयोग</span><span class=\"highlight-chip\">ग्रामीण शिक्षण प्रयास के लिए आर्थिक सहयोग</span>");
    setText("#donation-methods .donation-contact h3", "आर्थिक सहयोग कैसे भेजें");
    setText("#donation-methods .donation-contact p", "सीधे हमसे संपर्क करें और हम बैंक ट्रांसफर विवरण साझा करेंगे। हम एक दिन के भीतर जवाब देते हैं और हर योगदान की प्राप्ति की पुष्टि करते हैं।");
    setHTML("#donation-methods .donation-contact .highlight-list", "<span class=\"highlight-chip\">बैंक ट्रांसफर</span><span class=\"highlight-chip\">माँगने पर UPI</span><span class=\"highlight-chip\">माँगने पर रसीद</span>");
    setText("#trust-donate .section-kicker", "पारदर्शिता");
    setText("#trust-donate h2", "आपका सहयोग कहाँ जाता है");
    setText("#trust-donate .section-head p", "हम चाहते हैं कि हर समर्थक को स्पष्ट समझ हो कि योगदान कैसे उपयोग होता है और हमारी कानूनी स्थिति क्या है।");
    setText("#trust-donate .trust-fund-block h3", "सहयोग कैसे उपयोग होता है");
    setText("#trust-donate .trust-info-block h3", "हमारा पंजीकरण");
    setText("#trust-donate .trust-tax-head", "कर छूट (80G / 12A)");
    setText("#donation-transparency .section-kicker", "पारदर्शिता");
    setText("#donation-transparency h2", "हम चाहते हैं कि सहयोग कैसा महसूस हो");
    setText("#donation-transparency .story-quote", "सहयोग का संबंध वास्तविक बच्चों, वास्तविक ज़रूरतों और ज़मीन पर दिखने वाले काम से महसूस होना चाहिए।");
    setText("#donation-transparency p", "Mirai Society चाहती है कि समर्थक समझें कि उनका योगदान किसमें मदद कर रहा है: किताबों और स्टेशनरी तक पहुँच, शैक्षणिक निरंतरता, सामुदायिक जुड़ाव और वह ग्रामीण शिक्षण प्रयास जो बच्चों को सीखने से जोड़े रखता है।");
    setText("#donation-faq .section-kicker", "सामान्य प्रश्न");
    setText("#donation-faq h2", "सहयोग से जुड़े सामान्य प्रश्न");
    setText("#donation-faq .faq-item:nth-of-type(1) summary", "क्या मैं किसी खास ज़रूरत का सहयोग कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(1) p", "हाँ। आप किताबें, स्टेशनरी, सीखने की सामग्री, सामुदायिक गतिविधियाँ या अन्य केंद्रित शैक्षणिक ज़रूरतों का सहयोग कर सकते हैं।");
    setText("#donation-faq .faq-item:nth-of-type(2) summary", "क्या मैं पैसे की बजाय किताबें या सामग्री दान कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(2) p", "हाँ। पुरानी किताबें, नई किताबें, पेन, पेंसिल, नोटबुक और स्टेशनरी सभी उपयोगी सहयोग हैं।");
    setText("#donation-faq .faq-item:nth-of-type(3) summary", "क्या मैं दान की बजाय स्वयंसेवा कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(3) p", "हाँ। समय, स्थानीय समन्वय, शिक्षण, आउटरीच या पेशेवर कौशल के माध्यम से सहयोग भी मूल्यवान है।");
    setText("#donation-faq .faq-item:nth-of-type(4) summary", "आर्थिक सहयोग की अभी भी ज़रूरत क्यों है?");
    setText("#donation-faq .faq-item:nth-of-type(4) p", "क्योंकि शिक्षण सत्र, आउटरीच और सीखने के सहयोग के लिए संसाधन चाहिए, और ग्रामीण क्षेत्रों में कुछ पूर्णकालिक टीम सदस्य और शिक्षक अभी अपनी जेब से भी योगदान दे रहे हैं।");
    setText("#donation-faq .faq-item:nth-of-type(5) summary", "क्या मैं पुरानी और नई दोनों किताबें दान कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(5) p", "हाँ। यदि किताबें अच्छी स्थिति में हों और बच्चों की सीखने व पठन की ज़रूरतों के अनुरूप हों, तो पुरानी और नई दोनों किताबें उपयोगी हैं।");
    setText("#donation-faq .faq-item:nth-of-type(6) summary", "किस तरह की सामग्री सबसे उपयोगी है?");
    setText("#donation-faq .faq-item:nth-of-type(6) p", "किताबें, नोटबुक, पेन, पेंसिल, स्टेशनरी, कक्षा उपकरण और ऐसी शैक्षणिक सामग्री जिसे बच्चे और शिक्षक सीधे इस्तेमाल कर सकें, सबसे अधिक उपयोगी है।");
    setText("#donation-faq .faq-item:nth-of-type(7) summary", "क्या मैं मौजूदा फील्ड क्षेत्र से बाहर से सहयोग कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(7) p", "हाँ। आप भारत या विदेश से सामग्री, प्रायोजन, साझेदारी या आर्थिक सहयोग के माध्यम से Mirai Society का समर्थन कर सकते हैं। हमारा काम आज उत्तराखंड में आधारित है और पूरे भारत में फैल रहा है।");
    setText("#donation-faq .faq-item:nth-of-type(8) summary", "क्या स्कूल, व्यवसाय या समूह मिलकर सहयोग कर सकते हैं?");
    setText("#donation-faq .faq-item:nth-of-type(8) p", "हाँ। स्कूलों, कंपनियों, सामुदायिक समूहों या स्थानीय व्यवसायों के माध्यम से सामूहिक सहयोग सामग्री, गतिविधियों या सीखने की ज़रूरतों को प्रायोजित करने का मजबूत तरीका हो सकता है।");
    setText("#donation-faq .faq-item:nth-of-type(9) summary", "क्या मैं हर महीने नियमित रूप से किसी बच्चे का सहयोग कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(9) p", "हाँ। यदि आप नियमित सहयोग करना चाहते हैं, तो Mirai Society से सीधे संपर्क करें और सबसे उपयोगी आवर्ती तरीके पर चर्चा करें।");
    setText("#donation-faq .faq-item:nth-of-type(10) summary", "क्या मैं डिजिटल सीखने के सहयोग को प्रायोजित कर सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(10) p", "हाँ। आप लैपटॉप, टैबलेट, डिजिटल लर्निंग टूल, इंटरनेट एक्सेस या ऐसी गतिविधियों का समर्थन कर सकते हैं जो बच्चों को तकनीकी परिचय दें।");
    setText("#donation-faq .faq-item:nth-of-type(11) summary", "क्या मैं स्वयंसेवकों या शिक्षकों के लिए शिक्षण सामग्री दे सकता हूँ?");
    setText("#donation-faq .faq-item:nth-of-type(11) p", "हाँ। चॉक, मार्कर, चार्ट, प्रिंट सामग्री, बोर्ड, रजिस्टर और अन्य कक्षा उपकरण शिक्षण सहयोग के लिए उपयोगी हैं।");
    setText("#donation-faq .faq-item:nth-of-type(12) summary", "मुझे कैसे पता चले कि अभी सबसे ज़रूरी ज़रूरत क्या है?");
    setText("#donation-faq .faq-item:nth-of-type(12) p", "आप सबसे तत्काल वर्तमान ज़रूरतों के बारे में पूछने के लिए सीधे टीम से संपर्क कर सकते हैं, चाहे वह सामग्री हो, प्रायोजन, आउटरीच सहायता या आर्थिक सहयोग।");
    setText(".footer-cta .section-kicker", "♥ दान करें");
    setText(".footer-cta-title", "बच्चों को शिक्षा, आत्मविश्वास और अवसर से जुड़े रखने में मदद करें।");
    setText(".footer-cta .btn", "दान के तरीकों पर जाएँ");
  }

  function applyMissionHindi() {
    document.title = "हमारा मिशन | Mirai Society | Mirai Learning Center";
    setMeta("name", "description", "Mirai Society का मिशन हर बच्चे को शिक्षा से जोड़े रखना है। Mirai Learning Center के बारे में जानें, जहाँ स्कूल ऐसे छात्रों को पंजीकृत करते हैं जो नियमित रूप से नहीं आ सकते और हम उन्हें रोज़ पढ़ाते हैं।");
    setText(".page-hero .section-kicker", "हम क्यों मौजूद हैं");
    setText("#mission-pillars .section-kicker", "हमें क्या आगे बढ़ाता है");
    setText("#mission-pillars h2", "हमारे मिशन के स्तंभ");
    setText("#mission-pillars .program-card:nth-of-type(1) h3", "रोज़मर्रा की सीखने की बाधाएँ दूर करना");
    setText("#mission-pillars .program-card:nth-of-type(2) h3", "बच्चों को स्कूल से जोड़े रखना");
    setText("#mission-pillars .program-card:nth-of-type(3) h3", "ऐसा मॉडल बनाना जो ज़िम्मेदारी से बढ़ सके");
    setText("#learning-center .section-kicker", "मुख्य पहल");
    setText("#learning-center .section-head h2", "Mirai Learning Center");
    setText("#learning-center .section-head p", "भारत भर में कई बच्चे स्कूल में नामांकित हैं लेकिन नियमित रूप से उपस्थित नहीं हो पाते। Mirai Learning Center उन्हें रोज़ सीखने की जगह देता है और परीक्षाओं व आधिकारिक प्रगति के लिए उनके स्कूल से जुड़े रखता है।");
    setText("#learning-center .mission-step:nth-of-type(1) h3", "स्कूल छात्रों को पंजीकृत करता है");
    setText("#learning-center .mission-step:nth-of-type(1) p", "भागीदार स्कूल उन छात्रों की पहचान करते हैं जो नामांकित हैं लेकिन नियमित रूप से नहीं आ सकते और उन्हें Mirai Learning Center में पंजीकृत करते हैं।");
    setText("#learning-center .mission-step:nth-of-type(2) h3", "छात्र केंद्र पर सीखते हैं");
    setText("#learning-center .mission-step:nth-of-type(2) p", "पंजीकृत छात्र Mirai Learning Center में अपनी दैनिक शिक्षा प्राप्त करते हैं, जहाँ हमारे शिक्षक और स्वयंसेवक उन्हें पढ़ाते हैं।");
    setText("#learning-center .mission-step:nth-of-type(3) h3", "परीक्षाएँ स्कूल में");
    setText("#learning-center .mission-step:nth-of-type(3) p", "छात्र अपने पंजीकृत स्कूल में परीक्षाएँ देते हैं, आधिकारिक नामांकन बनाए रखते हुए और अपनी योग्यता अर्जित करते हैं।");
    setText("#why-it-matters .section-kicker", "यह क्यों महत्वपूर्ण है");
    setText("#why-it-matters h2", "यह मॉडल क्या बदलता है");
    setText("#why-it-matters .section-head p", "बच्चों, परिवारों और स्कूलों के लिए Mirai Learning Center मॉडल ऐसे परिणाम बनाता है जिन्हें कोई एक अकेला तरीका हासिल नहीं कर सकता।");
    setText("#why-it-matters .program-card:nth-of-type(1) h3", "बच्चे आधिकारिक रूप से नामांकित रहते हैं");
    setText("#why-it-matters .program-card:nth-of-type(1) p", "छात्र अपना स्कूल नामांकन बनाए रखते हैं, परीक्षाएँ देते हैं और योग्यताएँ अर्जित करते हैं, बिना औपचारिक शिक्षा के अपने अधिकार को खोए।");
    setText("#why-it-matters .program-card:nth-of-type(2) h3", "सीखना हर दिन होता है");
    setText("#why-it-matters .program-card:nth-of-type(2) p", "पीछे छूटने के बजाय बच्चे केंद्र पर संरचित, शिक्षक-नेतृत्व वाले दैनिक सत्रों के साथ अपनी शिक्षा जारी रखते हैं।");
    setText("#why-it-matters .program-card:nth-of-type(3) h3", "स्कूल अधिक छात्रों तक पहुँचते हैं");
    setText("#why-it-matters .program-card:nth-of-type(3) p", "भागीदार स्कूल उन बच्चों का समर्थन कर सकते हैं जिन्हें वे अन्यथा स्कूल छोड़ते देखते, जिससे समुदाय-व्यापी शैक्षणिक परिणाम मज़बूत होते हैं।");
    setText("#school-register .section-kicker", "हमारे साथ साझेदारी करें");
    setText("#school-register h2", "अपने स्कूल की रुचि दर्ज करें");
    setText("#school-register .volunteer-copy > p", "यदि आपके स्कूल में ऐसे छात्र हैं जो नामांकित हैं लेकिन नियमित रूप से नहीं आ सकते, तो हम आपके साथ काम करना चाहते हैं। अपनी रुचि दर्ज करें और हमारी टीम कुछ दिनों में आपसे संपर्क करेगी।");
    setText("#school-register .faq-item:nth-of-type(1) summary", "किन छात्रों को पंजीकृत किया जा सकता है?");
    setText("#school-register .faq-item:nth-of-type(1) p", "ऐसा कोई भी छात्र जो आपके स्कूल में आधिकारिक रूप से नामांकित है लेकिन दूरी, पारिवारिक परिस्थितियों, आर्थिक सीमाओं या अन्य कारणों से नियमित उपस्थिति में बाधा झेलता है।");
    setText("#school-register .faq-item:nth-of-type(2) summary", "परीक्षाएँ कैसे होंगी?");
    setText("#school-register .faq-item:nth-of-type(2) p", "छात्र आपके स्कूल में ही नामांकित रहेंगे और सभी परीक्षाएँ वहीं सामान्य रूप से देंगे। बीच के समय में Mirai Learning Center उनकी दैनिक शिक्षा संभालेगा।");
    setText("#school-register .faq-item:nth-of-type(3) summary", "क्या स्कूलों के लिए कोई लागत है?");
    setText("#school-register .faq-item:nth-of-type(3) p", "हम इसे सुलभ बनाए रखने के लिए प्रतिबद्ध हैं। कृपया संपर्क करें, हम आपके स्कूल की स्थिति के आधार पर व्यवस्था पर चर्चा करेंगे।");
    setText("#school-register .faq-item:nth-of-type(4) summary", "Mirai Learning Center कहाँ स्थित है?");
    setText("#school-register .faq-item:nth-of-type(4) p", "वर्तमान में उत्तराखंड में संचालित है। हम पूरे भारत में विस्तार कर रहे हैं, इसलिए यदि आप हमारे मौजूदा क्षेत्र से बाहर हैं तब भी अपनी रुचि दर्ज करें।");
    setText("#school-register .volunteer-form-panel h3", "स्कूल पंजीकरण फ़ॉर्म");
    setText("#school-register .volunteer-form-panel > p", "हमें अपने स्कूल और उन छात्रों के बारे में बताएँ जिन्हें सहयोग की आवश्यकता है। हम कुछ दिनों में आपसे संपर्क करेंगे।");
    setText("label[for='sSchool']", "स्कूल का नाम");
    setAttr("#sSchool", "placeholder", "अपने स्कूल का पूरा नाम");
    setText("label[for='sName']", "संपर्क व्यक्ति");
    setAttr("#sName", "placeholder", "प्रधानाचार्य या शिक्षक का नाम");
    setHTML("label[for='sEmail']", "ईमेल पता <span style=\"font-weight:400;color:var(--text-muted)\">(वैकल्पिक)</span>");
    setAttr("#sEmail", "placeholder", "school@email.com");
    setText("label[for='sPhone']", "फोन / WhatsApp");
    setAttr("#sPhone", "placeholder", "+91 XXXXX XXXXX");
    setAttr("#sPhone", "title", "मान्य फोन नंबर दर्ज करें");
    setText("label[for='sLocation']", "स्थान (शहर / ज़िला)");
    setAttr("#sLocation", "placeholder", "जैसे देहरादून, उत्तराखंड");
    setText("label[for='sStudents']", "छात्रों की अनुमानित संख्या");
    setAttr("#sStudents", "placeholder", "जैसे 10");
    setText("label[for='sMessage']", "क्या कुछ और बताना चाहेंगे");
    setAttr("#sMessage", "placeholder", "छात्रों या आपके स्कूल की स्थिति के बारे में संक्षिप्त जानकारी...");
    setText("#schoolSuccess", "धन्यवाद! अगले कदमों पर चर्चा के लिए हमारी टीम कुछ दिनों में आपसे संपर्क करेगी।");
    setText("#schoolError", "कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें या सीधे हमसे संपर्क करें।");
    setText("#mission-approach .section-kicker", "हमारा दृष्टिकोण");
    setText("#mission-approach h2", "हम इसे ज़मीन पर कैसे संभव बनाते हैं");
    setText("#mission-cta .section-kicker", "कार्रवाई करें");
    setText("#mission-cta h2", "मिशन का उस तरीके से सहयोग करें जो आपके लिए सबसे उपयुक्त हो");
    setText("#mission-cta p", "कार्यक्रमों को चलाए रखने के लिए दान करें, अपना समय और कौशल स्वयंसेवा में दें, या अपने स्कूल को पंजीकृत करें ताकि Mirai Learning Center उन छात्रों तक पहुँच सके जिन्हें इसकी सबसे अधिक ज़रूरत है।");
    setText(".footer-cta .section-kicker", "एक बच्चे की सीखने की यात्रा का समर्थन करें");
    setText(".footer-cta-title", "पहुँच, परिचय और प्रोत्साहन को वास्तविक अवसर में बदलने में मदद करें।");
  }

  function applyVolunteerHindi() {
    document.title = "स्वयंसेवा | Mirai Society | भारत भर में समुदाय से जुड़ें";
    setMeta("name", "description", "Mirai Society के साथ स्वयंसेवा करें और बच्चों को शिक्षा से जुड़े रहने में मदद करें। पढ़ाएँ, मार्गदर्शन करें या अपने कौशल से सहयोग दें।");
    setText(".page-hero .section-kicker", "जुड़ें");
    setAttr(".hero-support-card", "aria-label", "स्वयंसेवा क्यों करें");
    setText(".hero-support-card .section-kicker", "यह क्यों महत्वपूर्ण है");
    setText(".hero-support-card h2", "आपका समय वास्तविक बदलाव लाता है");
    setText(".hero-support-item:nth-of-type(1) strong", "बच्चों पर प्रत्यक्ष प्रभाव");
    setText(".hero-support-item:nth-of-type(1) span", "आपका हर सत्र और हर बच्चे को दिया गया प्रोत्साहन वास्तविक शैक्षणिक निरंतरता बनाता है।");
    setText(".hero-support-item:nth-of-type(2) strong", "राष्ट्रीय मिशन का हिस्सा बनें");
    setText(".hero-support-item:nth-of-type(2) span", "हमने उत्तराखंड से शुरुआत की और पूरे भारत में विस्तार कर रहे हैं। आपका योगदान इस विकास को आकार देता है।");
    setText(".hero-support-item:nth-of-type(3) strong", "लचीली प्रतिबद्धता");
    setText(".hero-support-item:nth-of-type(3) span", "महीने में कुछ घंटे या नियमित फील्ड भूमिका, आपके पास जितना समय है उसके अनुसार आपके लिए जगह है।");
    setText("#volunteer-form .section-kicker", "तैयार हैं जुड़ने के लिए?");
    setText("#volunteer-form h2", "अपनी रुचि बताएँ");
    setText("#volunteer-form .volunteer-copy > p", "हमें अपने बारे में और इस बारे में बताएँ कि आप कैसे योगदान देना चाहते हैं। हम कुछ दिनों में आपसे संपर्क करेंगे ताकि आपको जोड़ने का सबसे सही तरीका तय किया जा सके।");
    setText("#volunteer-form .faq-item:nth-of-type(1) summary", "क्या मुझे उत्तराखंड में रहना ज़रूरी है?");
    setText("#volunteer-form .faq-item:nth-of-type(1) p", "नहीं। डिज़ाइन, संचार, फंडरेजिंग और डिजिटल मेंटरिंग जैसी कई भूमिकाएँ भारत या विदेश से की जा सकती हैं।");
    setText("#volunteer-form .faq-item:nth-of-type(2) summary", "मुझे कितना समय देना होगा?");
    setText("#volunteer-form .faq-item:nth-of-type(2) p", "कोई निश्चित आवश्यकता नहीं है। महीने में कुछ घंटे भी अर्थपूर्ण फर्क ला सकते हैं। हम आपकी उपलब्धता के अनुसार काम करेंगे।");
    setText("#volunteer-form .faq-item:nth-of-type(3) summary", "क्या छात्र या फ्रेशर स्वयंसेवा कर सकते हैं?");
    setText("#volunteer-form .faq-item:nth-of-type(3) p", "बिलकुल। हम हर अनुभव स्तर के स्वयंसेवकों का स्वागत करते हैं। यदि आप शिक्षा और बच्चों के प्रति समर्पित हैं, तो आपके लिए भूमिका है।");
    setText("#volunteer-form .faq-item:nth-of-type(4) summary", "क्या मुझे कोई प्रमाणपत्र मिलेगा?");
    setText("#volunteer-form .faq-item:nth-of-type(4) p", "हाँ। नियमित स्वयंसेवकों को अनुरोध पर Mirai Society की ओर से योगदान प्रमाणपत्र दिया जा सकता है।");
    setText("#volunteer-form .volunteer-form-panel h3", "अपनी जानकारी भेजें");
    setText("#volunteer-form .volunteer-form-panel > p", "हम कुछ दिनों में आपसे संपर्क करेंगे कि आप कैसे जुड़ सकते हैं।");
    setText("label[for='vName']", "आपका नाम");
    setAttr("#vName", "placeholder", "आपका पूरा नाम");
    setText("label[for='vEmail']", "ईमेल पता");
    setAttr("#vEmail", "placeholder", "your@email.com");
    setText("label[for='vPhone']", "फोन / WhatsApp");
    setAttr("#vPhone", "placeholder", "+91 XXXXX XXXXX");
    setAttr("#vPhone", "title", "मान्य फोन नंबर दर्ज करें");
    setText("label[for='vHow']", "आप कैसे मदद करना चाहते हैं");
    setAttr("#vHow", "placeholder", "शिक्षण, मार्गदर्शन, डिज़ाइन, आउटरीच...");
    setText("#volunteerSuccess", "धन्यवाद! हम कुछ दिनों में आपसे संपर्क करेंगे।");
    setText("#volunteerError", "कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें या सीधे WhatsApp पर संपर्क करें।");
    setText("#volunteer-roles .section-kicker", "स्वयंसेवी भूमिकाएँ");
    setText("#volunteer-roles h2", "आप कैसे योगदान दे सकते हैं");
    setText("#volunteer-roles p", "मदद करने के लिए उत्तराखंड में होना आवश्यक नहीं है। कई भूमिकाएँ दूर से या अपने समुदाय में की जा सकती हैं।");
    setText("#volunteer-currently .section-kicker", "हमारे साथ कौन स्वयंसेवा करता है");
    setText("#volunteer-currently h2", "वे लोग जो पहले से बदलाव ला रहे हैं");
    setText("#volunteer-currently p", "हमारे कुछ स्वयंसेवक स्वयं Mirai Society से सहयोग पा चुके हैं और अब अगली पीढ़ी के शिक्षार्थियों का समर्थन कर रहे हैं।");
    setText("#volunteer-expect .card .section-kicker", "क्या अपेक्षा करें");
    setText("#volunteer-expect .card h3", "Mirai Society के साथ स्वयंसेवा कैसे काम करती है");
    setText("#volunteer-expect .card p", "रुचि व्यक्त करने के बाद हमारी टीम कुछ दिनों में आपसे संपर्क करेगी ताकि समझा जा सके कि आप क्या योगदान दे सकते हैं और आपको कैसे सबसे बेहतर रूप से जोड़ा जा सकता है। पहले से कोई निश्चित प्रतिबद्धता आवश्यक नहीं है।");
    setHTML("#volunteer-expect .card .highlight-list", "<span class=\"highlight-chip\">टीम के साथ परिचय कॉल</span><span class=\"highlight-chip\">सही भूमिका से मिलान</span><span class=\"highlight-chip\">लचीली समय प्रतिबद्धता</span>");
    setText("#volunteer-expect .card-accent .section-kicker", "फील्ड से");
    setText("#volunteer-expect .card-accent h3", "स्वयंसेवक हमारे काम के केंद्र में हैं");
    setText("#volunteer-expect .card-accent p", "चाहे पठन सत्र चलाना हो, बच्चे का मार्गदर्शन करना हो या आउटरीच में मदद करनी हो, स्वयंसेवकों का योगदान प्रत्यक्ष, स्पष्ट और समुदायों द्वारा गहराई से मूल्यवान है।");
    setHTML("#volunteer-expect .card-accent .highlight-list", "<span class=\"highlight-chip\">ज़मीनी फील्ड सत्र</span><span class=\"highlight-chip\">रिमोट और डिजिटल सहयोग</span><span class=\"highlight-chip\">सामुदायिक आउटरीच</span>");
    setText(".footer-cta .section-kicker", "एक बच्चे की सीखने की यात्रा का समर्थन करें");
    setText(".footer-cta-title", "पहुँच, परिचय और प्रोत्साहन को वास्तविक अवसर में बदलने में मदद करें।");
  }

  function applyTeamHindi() {
    document.title = "हमारी टीम | Mirai Society | युवा-नेतृत्व वाला शिक्षा NGO";
    setMeta("name", "description", "Mirai Society के नेतृत्व, प्रबंधन और फील्ड टीम से मिलें।");
    setText(".page-hero .section-kicker", "हमारी टीम");
    setText(".page-title", "Mirai Society के पीछे के लोग");
    setText(".page-description", "Mirai Society युवा शिक्षकों, संस्थापकों और पेशेवरों द्वारा संचालित है जिनका काम बच्चों, परिवारों, स्कूलों और स्थानीय समुदायों के लिए शैक्षणिक उद्देश्य को सामुदायिक-आधारित निष्पादन से जोड़ता है।");
    setText("#team .section-kicker", "टीम निर्देशिका");
    setText(".footer-cta .section-kicker", "एक बच्चे की सीखने की यात्रा का समर्थन करें");
    setText(".footer-cta-title", "पहुँच, परिचय और प्रोत्साहन को वास्तविक अवसर में बदलने में मदद करें।");
  }

  function applyUpdatesHindi() {
    document.title = "फील्ड अपडेट | Mirai Society | शिक्षा NGO";
    setMeta("name", "description", "Mirai Society के फील्ड अपडेट, महत्वपूर्ण पड़ाव और वार्षिक संग्रह देखें।");
    setText(".page-hero .section-kicker", "फील्ड अपडेट");
    setText(".page-title", "ज़मीन से फील्ड अपडेट");
    setText(".page-description", "यह पेज Mirai Society की फील्ड गतिविधियों, महत्वपूर्ण पड़ावों और समय के साथ समुदाय-केंद्रित काम को एक साथ लाता है। साल-दर-साल संग्रह देखकर समझें कि काम ज़मीन पर कैसे बढ़ रहा है।");
    setText(".footer-cta .section-kicker", "एक बच्चे की सीखने की यात्रा का समर्थन करें");
    setText(".footer-cta-title", "पहुँच, परिचय और प्रोत्साहन को वास्तविक अवसर में बदलने में मदद करें।");
  }

  function applyMediaHindi() {
    document.title = "फोटो और वीडियो | Mirai Society | शिक्षा NGO";
    setMeta("name", "description", "Mirai Society के फील्ड विज़िट, सीखने के सत्रों और सामुदायिक काम की फोटो और वीडियो देखें।");
    setText(".page-hero .section-kicker", "मीडिया");
    setText(".page-title", "ज़मीन से फोटो और वीडियो");
    setText(".page-description", "Mirai Society के फील्ड दौरों, सीखने के सत्रों, छात्र जुड़ाव और सामुदायिक कार्य के दृश्य पल देखें। यह पेज गैलरी और वीडियो संग्रह दोनों को एक जगह लाता है।");
    setText("#media-gallery .section-kicker", "गैलरी");
    setText("#media-gallery h2", "फोटो संग्रह");
    setText("#media-gallery p", "सीखने के सत्रों, फील्ड दौरों, स्कूल सहयोग और उन समुदायों की छवियाँ जो Mirai Society के काम को आकार देते हैं।");
    setText("#media-videos .section-kicker", "वीडियो");
    setText("#media-videos h2", "वीडियो संग्रह");
    setText("#media-videos p", "फील्ड के वीडियो पल जो दिखाते हैं कि वास्तविक कक्षाओं, समुदायों और छात्र-केंद्रित गतिविधियों में काम कैसा दिखता है।");
    setText(".footer-cta .section-kicker", "एक बच्चे की सीखने की यात्रा का समर्थन करें");
    setText(".footer-cta-title", "पहुँच, परिचय और प्रोत्साहन को वास्तविक अवसर में बदलने में मदद करें।");
  }

  function applyPrivacyHindi() {
    document.title = "Mirai Society गोपनीयता नीति";
    setMeta("name", "description", "Mirai Society की गोपनीयता नीति पढ़ें और जानें कि संपर्क जानकारी या संदेश कैसे संभाले जा सकते हैं।");
    setText(".page-hero .section-kicker", "गोपनीयता");
    setText(".page-title", "गोपनीयता नीति");
    setText(".page-description", "यह पेज बताता है कि Mirai Society कौन सी जानकारी प्राप्त कर सकती है, उसका उपयोग कैसे हो सकता है और आप गोपनीयता से जुड़े प्रश्नों के लिए हमसे कैसे संपर्क कर सकते हैं।");
    setText(".page-meta", "अंतिम अपडेट: 21 मार्च 2026");
    setText(".privacy-card:nth-of-type(1) h2", "हम कौन सी जानकारी प्राप्त कर सकते हैं");
    setText(".privacy-card:nth-of-type(1) p", "यदि आप Mirai Society से ईमेल, फोन, WhatsApp या सोशल मीडिया के माध्यम से संपर्क करते हैं, तो हम वह जानकारी प्राप्त कर सकते हैं जो आप हमारे साथ साझा करते हैं, जैसे आपका नाम, फोन नंबर, ईमेल पता, सोशल मीडिया प्रोफाइल विवरण और आपके संदेश की सामग्री।");
    setText(".privacy-card:nth-of-type(2) h2", "उपयोग का उद्देश्य");
    setText(".privacy-card:nth-of-type(2) p", "हम इस जानकारी का उपयोग आपके प्रश्नों का उत्तर देने, सहयोग का समन्वय करने, स्वयंसेवा या साझेदारी के बारे में संवाद करने और Mirai Society के काम से संबंधित संपर्क बनाए रखने के लिए कर सकते हैं।");
    setText(".privacy-card:nth-of-type(3) h2", "सहमति और संचार");
    setText(".privacy-card:nth-of-type(3) p", "जहाँ सहमति प्रासंगिक है, वहाँ हम व्यक्तिगत जानकारी का उपयोग केवल उसी उद्देश्य के लिए करना चाहते हैं जिसके लिए वह हमारे साथ साझा की गई थी। यदि आप भविष्य में हमसे संदेश नहीं प्राप्त करना चाहते, तो आप हमें अपने संपर्क विवरण के उपयोग को रोकने के लिए कह सकते हैं।");
    setText(".privacy-card:nth-of-type(4) h2", "जानकारी साझा करना");
    setText(".privacy-card:nth-of-type(4) p", "Mirai Society व्यक्तिगत जानकारी बेचती नहीं है। हमारे साथ साझा की गई जानकारी केवल संचार, समन्वय और हमारे काम से संबंधित सहयोग के लिए उपयोग की जाती है, जब तक कि कानूनन साझा करना आवश्यक न हो या हमारी किसी विश्वसनीय सेवा के लिए जरूरी न हो।");
    setText(".privacy-card:nth-of-type(5) h2", "बच्चों की जानकारी");
    setText(".privacy-card:nth-of-type(5) p", "Mirai Society बच्चों के सहयोग में काम करती है। यदि हम कभी फ़ॉर्म, पंजीकरण या भविष्य की डिजिटल सेवाओं के माध्यम से किसी बच्चे से संबंधित व्यक्तिगत जानकारी सीधे एकत्र करते हैं, तो हम अतिरिक्त सावधानी बरतेंगे और जहाँ उचित होगा, माता-पिता, अभिभावक, स्कूल या जिम्मेदार वयस्क के माध्यम से कार्य करेंगे।");
    setText(".privacy-card:nth-of-type(6) h2", "संग्रहण और हटाना");
    setText(".privacy-card:nth-of-type(6) p", "हम कोशिश करते हैं कि व्यक्तिगत जानकारी को उससे अधिक समय तक न रखें जितना उस उद्देश्य के लिए आवश्यक है जिसके लिए वह साझा की गई थी। यदि आप चाहते हैं कि हम आपकी व्यक्तिगत जानकारी की समीक्षा, सुधार या हटाने पर विचार करें, तो आप सीधे हमसे संपर्क कर सकते हैं।");
    setText(".privacy-card:nth-of-type(7) h2", "तृतीय-पक्ष सेवाएँ");
    setText(".privacy-card:nth-of-type(7) p", "यह वेबसाइट सोशल प्लेटफॉर्म, YouTube, WhatsApp या भविष्य के दान प्रदाताओं से लिंक कर सकती है। उन सेवाओं की अपनी गोपनीयता नीतियाँ हैं और डेटा का उनका प्रबंधन Mirai Society के प्रत्यक्ष नियंत्रण से बाहर है।");
    setText(".privacy-card:nth-of-type(8) h2", "अधिकार और शिकायत संपर्क");
    setHTML(".privacy-card:nth-of-type(8) p", "यदि आप जानना चाहते हैं कि हमारे साथ कौन सी जानकारी साझा की गई है, सुधार या हटाने का अनुरोध करना चाहते हैं, भविष्य के संचार के लिए सहमति वापस लेना चाहते हैं या गोपनीयता से जुड़ी कोई चिंता उठाना चाहते हैं, तो कृपया हमसे <a href=\"mailto:miraisocietyuttarakhand@gmail.com\">miraisocietyuttarakhand@gmail.com</a> पर संपर्क करें।");
    setText(".privacy-card:nth-of-type(9) h2", "इस नीति में अपडेट");
    setText(".privacy-card:nth-of-type(9) p", "जैसे-जैसे वेबसाइट बढ़ती है, दान के तरीके जुड़ते हैं या संचार प्रक्रियाएँ बदलती हैं, यह गोपनीयता नीति समय-समय पर अपडेट की जा सकती है।");
  }

  function applyHindiPageTranslations() {
    applyCommonHindi();
    var page = pageName();

    if (page === "index.html") applyIndexHindi();
    if (page === "donate.html") applyDonateHindi();
    if (page === "mission.html") applyMissionHindi();
    if (page === "volunteer.html") applyVolunteerHindi();
    if (page === "team.html") applyTeamHindi();
    if (page === "updates.html") applyUpdatesHindi();
    if (page === "media.html") applyMediaHindi();
    if (page === "privacy.html") applyPrivacyHindi();
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectLangToggle();
    if (window.currentLang === "hi") {
      translateStaticUI();
      applyHindiPageTranslations();
      document.body.classList.add("lang-hi");
    }
  });
})();
