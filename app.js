function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "";
}

function uiText(key) {
  const lang = window.currentLang || "en";
  const copy = {
    en: {
      team: "Team",
      teamDetailsSoon: "Team details will appear here soon.",
      noPrograms: "No programs added yet.",
      noUpdates: "No updates added yet.",
      noGallery: "No gallery images added yet.",
      noVideos: "No videos added yet.",
      videoUnavailable: "Video link unavailable.",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      imageViewer: "Image viewer",
      sending: "Sending…",
      sendInterest: "Send Interest",
      submitRegistration: "Submit Registration"
    },
    hi: {
      team: "टीम",
      teamDetailsSoon: "टीम का विवरण जल्द यहाँ दिखाई देगा।",
      noPrograms: "अभी कोई कार्यक्रम जोड़ा नहीं गया है।",
      noUpdates: "अभी कोई अपडेट जोड़ा नहीं गया है।",
      noGallery: "अभी कोई गैलरी छवि जोड़ी नहीं गई है।",
      noVideos: "अभी कोई वीडियो जोड़ा नहीं गया है।",
      videoUnavailable: "वीडियो लिंक उपलब्ध नहीं है।",
      openMenu: "मेनू खोलें",
      closeMenu: "मेनू बंद करें",
      imageViewer: "छवि दर्शक",
      sending: "भेजा जा रहा है…",
      sendInterest: "रुचि भेजें",
      submitRegistration: "पंजीकरण भेजें"
    }
  };

  return copy[lang]?.[key] || copy.en[key] || "";
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

function resolveAssetPath(path) {
  if (!path) return "";
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("/") || path.startsWith("../") || path.startsWith("./") || path.startsWith("#")) {
    return path;
  }

  return /(?:^|\/)hi(?:\/|$)/.test(window.location.pathname) ? `../${path}` : path;
}

function fallbackImage() {
  return resolveAssetPath(siteContent.hero?.image || siteContent.gallery?.[0] || "");
}

function isPlaceholderUrl(url) {
  return /your(page|channel)/i.test(url || "");
}

function normalizeUrl(url) {
  if (!url || isPlaceholderUrl(url)) return "";

  try {
    return new URL(url).toString();
  } catch {
    return "";
  }
}

function formatPlatformName(name) {
  const labels = {
    instagram: "Instagram",
    facebook: "Facebook",
    youtube: "YouTube",
    linkedin: "LinkedIn",
    x: "X",
    twitter: "Twitter",
    whatsapp: "WhatsApp",
    whatsappSecondary: "WhatsApp 2"
  };

  return labels[name] || name.charAt(0).toUpperCase() + name.slice(1);
}

function socialIcon(label) {
  const icons = {
    Instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="3.75"></circle><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"></circle></svg>',
    Facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4H16V4.5c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.3H8.4V13h2.2v7z"></path></svg>',
    YouTube:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.4a2.9 2.9 0 0 0-2-2.1C17.2 5.8 12 5.8 12 5.8s-5.2 0-7 .5A2.9 2.9 0 0 0 3 8.4 30 30 0 0 0 2.5 12a30 30 0 0 0 .5 3.6 2.9 2.9 0 0 0 2 2.1c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.9 2.9 0 0 0 2-2.1 30 30 0 0 0 .5-3.6 30 30 0 0 0-.5-3.6z"></path><path d="M10 15.3 15 12l-5-3.3z" fill="currentColor" stroke="none"></path></svg>',
    LinkedIn:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.3 8.4A1.7 1.7 0 1 1 6.3 5a1.7 1.7 0 0 1 0 3.4zM4.8 9.8h3V19h-3zM10.3 9.8h2.9v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3z"></path></svg>',
    X:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h3.7l5 6.7L18.4 4H20l-6.6 7.6L20 20h-3.7l-5.3-7.1L5.6 20H4l7.1-8.1z"></path></svg>',
    Twitter:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 7.2c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.6.4-1.4.7-2.1.9a3.3 3.3 0 0 0-5.7 3c-2.7-.1-5.1-1.4-6.7-3.4a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4 0 1.6 1.1 3 2.6 3.3-.3.1-.7.1-1 .1l-.6-.1c.4 1.3 1.7 2.3 3.2 2.3A6.7 6.7 0 0 1 4 17.5 9.5 9.5 0 0 0 9.2 19c6.3 0 9.8-5.2 9.8-9.8v-.4c.7-.4 1.3-1 1.8-1.6z"></path></svg>',
    WhatsApp:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.2a7.6 7.6 0 0 0-6.5 11.5L4.3 20l4.4-1.2A7.6 7.6 0 1 0 12 4.2z"></path><path d="M9.2 8.6c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.6.1-.9.5s-1.1 1.1-1.1 2.7 1.2 3.1 1.4 3.3c.2.2 2.2 3.5 5.4 4.7 2.6 1 3.1.8 3.7.7.6-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.5-.1-.2-.4-.3-.9-.6l-1.5-.8c-.2-.1-.4-.2-.6.2s-.7.8-.9 1c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.7-.9-.8-1.5-1.9-1.7-2.2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6z" fill="currentColor" stroke="none"></path></svg>'
  };

  return icons[label] || '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle></svg>';
}

function bindImageFallback(img, classTargetSelector) {
  if (!img) return;

  img.addEventListener(
    "error",
    () => {
      const fallback = fallbackImage();
      const classTarget = classTargetSelector ? img.closest(classTargetSelector) : img;

      if (fallback && img.src !== new URL(fallback, window.location.href).href) {
        img.src = fallback;
      } else {
        img.removeAttribute("src");
      }

      img.classList.add("image-fallback");
      if (classTarget) classTarget.classList.add("image-fallback");
    },
    { once: true }
  );
}

function setImage(id, src, alt = "") {
  const el = document.getElementById(id);
  if (!el) return;

  el.src = resolveAssetPath(src) || fallbackImage();
  el.alt = alt;
  bindImageFallback(el, ".hero-media");
}

function youtubeEmbed(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    const videoId = parsed.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch {
    return "";
  }
}

function renderHero() {
  const hero = siteContent.hero || {};

  setText("heroTitle", hero.title);
  setText("heroSubtitle", hero.subtitle);
  setImage("heroImage", hero.image, hero.title);
}

function renderStats() {
  const container = document.getElementById("statsGrid");
  const stats = siteContent.stats || [];

  if (!container) return;

  if (!stats.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = stats
    .map(
      (item) => `
        <div class="stat">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </div>
      `
    )
    .join("");
}

function renderAbout() {
  const about = siteContent.about || {};
  const mission = siteContent.mission || {};
  const missionHighlightsEl = document.getElementById("missionHighlights");

  setText("aboutTitle", about.title);
  setText("aboutDescription", about.description);
  setText("missionTitle", mission.title);
  setText("missionDescription", mission.description);

  if (missionHighlightsEl) {
    const highlights = mission.highlights || [];

    missionHighlightsEl.innerHTML = highlights
      .map((item) => `<span class="highlight-chip">${escapeHTML(item)}</span>`)
      .join("");
  }
}

function renderDifference() {
  const titleEl = document.getElementById("differenceTitle");
  const descriptionEl = document.getElementById("differenceDescription");
  const gridEl = document.getElementById("differenceGrid");
  const difference = siteContent.difference || {};
  const items = difference.items || [];

  if (titleEl) titleEl.textContent = difference.title || "";
  if (descriptionEl) descriptionEl.textContent = difference.description || "";
  if (!gridEl) return;

  if (!items.length) {
    gridEl.innerHTML = "";
    return;
  }

  gridEl.innerHTML = items
    .map(
      (item) => `
        <article class="program-card difference-card">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderPrograms() {
  const container = document.getElementById("programsGrid");
  const programs = siteContent.programs || [];

  if (!container) return;

  if (!programs.length) {
    container.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noPrograms"))}</div>`;
    return;
  }

  container.innerHTML = programs
    .map(
      (item) => `
        <article class="program-card">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderBarriers() {
  const titleEl = document.getElementById("barriersTitle");
  const descriptionEl = document.getElementById("barriersDescription");
  const gridEl = document.getElementById("barriersGrid");
  const barriers = siteContent.barriers || {};
  const items = barriers.items || [];

  if (titleEl) titleEl.textContent = barriers.title || "";
  if (descriptionEl) descriptionEl.textContent = barriers.description || "";
  if (!gridEl) return;

  if (!items.length) {
    gridEl.innerHTML = "";
    return;
  }

  gridEl.innerHTML = items
    .map(
      (item) => `
        <article class="program-card barrier-card">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderFutureReadiness() {
  const titleEl = document.getElementById("futureTitle");
  const descriptionEl = document.getElementById("futureDescription");
  const noteEl = document.getElementById("futureNote");
  const pointsEl = document.getElementById("futurePoints");
  const futureReadiness = siteContent.futureReadiness || {};
  const points = futureReadiness.points || [];

  if (titleEl) titleEl.textContent = futureReadiness.title || "";
  if (descriptionEl) descriptionEl.textContent = futureReadiness.description || "";
  if (noteEl) noteEl.textContent = futureReadiness.note || "";
  if (!pointsEl) return;

  if (!points.length) {
    pointsEl.innerHTML = "";
    return;
  }

  pointsEl.innerHTML = points
    .map(
      (point) => `
        <div class="future-point">
          <span class="future-point-mark">+</span>
          <p>${escapeHTML(point)}</p>
        </div>
      `
    )
    .join("");
}

function renderImpactStory() {
  const story = siteContent.impactStory || {};

  setText("storyTitle", story.title);
  setText("storyQuote", story.quote);
  setText("storyDescription", story.description);
  setText("storyAttribution", story.attribution);
  setText("storyDate", story.date);
  setText("storyLocation", story.location);

  const highlightsEl = document.getElementById("storyHighlights");
  const metaEl = document.getElementById("storyMeta");

  if (metaEl) {
    metaEl.innerHTML = [story.date, story.location]
      .filter(Boolean)
      .map((item) => `<span>${escapeHTML(item)}</span>`)
      .join("");
  }

  if (!highlightsEl) return;

  const highlights = story.highlights || [];

  if (!highlights.length) {
    highlightsEl.innerHTML = "";
    return;
  }

  highlightsEl.innerHTML = highlights
    .map((item) => `<span class="highlight-chip">${escapeHTML(item)}</span>`)
    .join("");
}

function renderProof() {
  const container = document.getElementById("proofGrid");
  const proof = siteContent.proof || [];

  if (!container) return;

  if (!proof.length) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = proof
    .map(
      (item) => `
        <article class="program-card proof-card">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderTeam() {
  const titleEl = document.getElementById("teamTitle");
  const descriptionEl = document.getElementById("teamDescription");
  const gridEl = document.getElementById("teamGrid");
  const team = siteContent.team || {};
  const members = team.members || [];

  if (titleEl) titleEl.textContent = team.title || "";
  if (descriptionEl) descriptionEl.textContent = team.description || "";
  if (!gridEl) return;

  if (!members.length) {
    gridEl.innerHTML = `<div class="empty-note">${escapeHTML(uiText("teamDetailsSoon"))}</div>`;
    return;
  }

  const groups = [];

  members.forEach((member) => {
    const category = member.category || uiText("team");
    const group = groups.find((entry) => entry.category === category);

    if (group) {
      group.members.push(member);
      return;
    }

    groups.push({ category, members: [member] });
  });

  gridEl.innerHTML = groups
    .map(
      (group) => `
        <section class="team-group">
          <div class="team-group-head">
            <h3 class="team-group-title">${escapeHTML(group.category)}</h3>
          </div>
          <div class="team-grid team-group-grid">
            ${group.members
              .map((member) => {
                const role = ["Core Team Member", "मुख्य टीम सदस्य"].includes(member.role)
                  ? ""
                  : member.role || "";

                return `
                  <article class="team-card">
                    <img
                      class="team-image"
                      src="${escapeHTML(resolveAssetPath(member.image) || fallbackImage())}"
                      alt="${escapeHTML(member.name)}"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="team-body">
                      <span class="team-category">${escapeHTML(member.category || uiText("team"))}</span>
                      <h3>${escapeHTML(member.name)}</h3>
                      ${role ? `<p class="team-role">${escapeHTML(role)}</p>` : ""}
                      <p>${escapeHTML(member.bio || "")}</p>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `
    )
    .join("");

  gridEl.querySelectorAll("img").forEach((img) => bindImageFallback(img, ".team-card"));
}

function renderSupport() {
  const titleEl = document.getElementById("supportTitle");
  const descriptionEl = document.getElementById("supportDescription");
  const noteEl = document.getElementById("supportNote");
  const gridEl = document.getElementById("supportGrid");
  const waysEl = document.getElementById("supportWays");
  const highlightsEl = document.getElementById("supportHighlights");
  const priorityTitleEl = document.getElementById("supportPriorityTitle");
  const priorityListEl = document.getElementById("supportPriorityList");
  const waysTitleEl = document.getElementById("supportWaysTitle");
  const itemsTitleEl = document.getElementById("supportItemsTitle");
  const support = siteContent.support || {};
  const items = support.items || [];
  const ways = support.ways || [];
  const highlights = support.highlights || [];
  const priorities = support.priorities || [];

  if (titleEl) titleEl.textContent = support.title || "";
  if (descriptionEl) descriptionEl.textContent = support.description || "";
  if (noteEl) noteEl.textContent = support.note || "";
  if (priorityTitleEl) priorityTitleEl.textContent = support.priorityTitle || "";
  if (waysTitleEl) waysTitleEl.textContent = support.waysTitle || "";
  if (itemsTitleEl) itemsTitleEl.textContent = support.itemsTitle || "";
  if (!gridEl || !waysEl) return;

  if (highlightsEl) {
    highlightsEl.innerHTML = highlights
      .map((item) => `<span class="highlight-chip">${escapeHTML(item)}</span>`)
      .join("");
  }

  if (priorityListEl) {
    priorityListEl.innerHTML = priorities
      .map(
        (item) => `
          <div class="support-priority-item">
            <span class="support-priority-mark">+</span>
            <span>${escapeHTML(item)}</span>
          </div>
        `
      )
      .join("");
  }

  if (!ways.length) {
    waysEl.innerHTML = "";
  } else {
    waysEl.innerHTML = ways
      .map(
        (item) => `
          <article class="support-way">
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
          </article>
        `
      )
      .join("");
  }

  if (!items.length) {
    gridEl.innerHTML = "";
    return;
  }

  gridEl.innerHTML = items
    .map(
      (item) => `
        <article class="support-card">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </article>
      `
    )
    .join("");
}

function updateCardMarkup(item) {
  return `
        <article class="update-card">
          <img
        src="${escapeHTML(resolveAssetPath(item.image) || fallbackImage())}"
        alt="${escapeHTML(item.alt || item.title)}"
        data-caption="${escapeHTML(
          [item.title, item.date, item.location].filter(Boolean).join(" • ") || item.alt || item.title
        )}"
        loading="lazy"
        decoding="async"
      />
      <div class="update-body">
        <div class="update-meta">
          ${item.date ? `<span>${escapeHTML(item.date)}</span>` : ""}
          ${item.location ? `<span>${escapeHTML(item.location)}</span>` : ""}
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </div>
    </article>
  `;
}

function bindUpdateImages(container, targetSelector = ".update-card") {
  container.querySelectorAll("img").forEach((img) => bindImageFallback(img, targetSelector));
  container.querySelectorAll("img").forEach((img) => {
    img.classList.add("zoomable-image");
    img.tabIndex = 0;
  });
}

function renderUpdates() {
  const previewContainer = document.getElementById("updatesGrid");
  const archiveContainer = document.getElementById("updatesArchive");
  const updates = siteContent.updates || [];

  if (previewContainer) {
    const latestUpdates = updates.slice(0, 3);

    if (!latestUpdates.length) {
      previewContainer.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noUpdates"))}</div>`;
    } else {
      previewContainer.innerHTML = latestUpdates.map(updateCardMarkup).join("");
      bindUpdateImages(previewContainer);
    }
  }

  if (!archiveContainer) return;

  if (!updates.length) {
    archiveContainer.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noUpdates"))}</div>`;
    return;
  }

  const groups = [];

  updates.forEach((item) => {
    const match = String(item.date || "").match(/\b(20\d{2})\b/);
    const year = match ? match[1] : "Archive";
    const group = groups.find((entry) => entry.year === year);

    if (group) {
      group.items.push(item);
      return;
    }

    groups.push({ year, items: [item] });
  });

  archiveContainer.innerHTML = groups
    .map(
      (group) => `
        <section class="updates-year-group">
          <div class="updates-year-head">
            <h2 class="updates-year-title">${escapeHTML(group.year)}</h2>
          </div>
          <div class="updates-grid updates-archive-grid">
            ${group.items.map(updateCardMarkup).join("")}
          </div>
        </section>
      `
    )
    .join("");

  bindUpdateImages(archiveContainer);
}

function renderGallery() {
  const previewContainer = document.getElementById("galleryGrid");
  const archiveContainer = document.getElementById("mediaGalleryGrid");
  const gallery = siteContent.gallery || [];

  if (!previewContainer && !archiveContainer) return;

  if (!gallery.length) {
    if (previewContainer) {
      previewContainer.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noGallery"))}</div>`;
    }
    if (archiveContainer) {
      archiveContainer.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noGallery"))}</div>`;
    }
    return;
  }

  const galleryMarkup = (items) =>
    items
      .map((item, index) => {
      const image = typeof item === "string" ? item : item.image;
      const alt =
        typeof item === "string" ? `Mirai Society gallery image ${index + 1}` : item.alt || "";
      const caption = typeof item === "string" ? "" : item.caption || "";

      return `
        <figure class="gallery-item">
          <img
            src="${escapeHTML(resolveAssetPath(image) || fallbackImage())}"
            alt="${escapeHTML(alt)}"
            data-caption="${escapeHTML(caption || alt)}"
            loading="lazy"
            decoding="async"
          />
          ${caption ? `<figcaption>${escapeHTML(caption)}</figcaption>` : ""}
        </figure>
      `;
      })
      .join("");

  if (previewContainer) {
    previewContainer.innerHTML = galleryMarkup(gallery.slice(0, 4));
  }

  if (archiveContainer) {
    archiveContainer.innerHTML = galleryMarkup(gallery);
  }

  [previewContainer, archiveContainer].filter(Boolean).forEach((container) => {
    container.querySelectorAll("img").forEach((img) => bindImageFallback(img, ".gallery-item"));
    container.querySelectorAll("img").forEach((img) => {
      img.classList.add("zoomable-image");
      img.tabIndex = 0;
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) return;

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.classList.remove("lightbox-open");
  }

  function openLightbox(img) {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "";
    const caption = img.getAttribute("data-caption") || alt;

    if (!src) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxCaption.textContent = caption;
    const dialog = lightbox.querySelector("[role='dialog']");
    if (dialog) dialog.setAttribute("aria-label", caption || alt || uiText("imageViewer"));
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  document.addEventListener("click", (event) => {
    const image = event.target.closest(".zoomable-image");

    if (image) {
      openLightbox(image);
      return;
    }

    if (event.target === lightbox || event.target === lightboxClose) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    const activeImage = event.target.closest?.(".zoomable-image");

    if ((event.key === "Enter" || event.key === " ") && activeImage) {
      event.preventDefault();
      openLightbox(activeImage);
      return;
    }

    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

function renderVideos() {
  const previewContainer = document.getElementById("videosGrid");
  const archiveContainer = document.getElementById("mediaVideosGrid");
  const videos = siteContent.videos || [];

  if (!previewContainer && !archiveContainer) return;

  if (!videos.length) {
    if (previewContainer) {
      previewContainer.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noVideos"))}</div>`;
    }
    if (archiveContainer) {
      archiveContainer.innerHTML = `<div class="empty-note">${escapeHTML(uiText("noVideos"))}</div>`;
    }
    return;
  }

  const videoMarkup = (items) =>
    items
      .map((video) => {
      const embedUrl = youtubeEmbed(video.url);

      if (!embedUrl) {
        return `
          <article class="video-card">
            <div class="video-body">
              <h3>${escapeHTML(video.title)}</h3>
              <p>${escapeHTML(video.description || uiText("videoUnavailable"))}</p>
            </div>
          </article>
        `;
      }

      return `
        <article class="video-card">
          <div class="video-frame">
            <iframe
              src="${escapeHTML(embedUrl)}"
              title="${escapeHTML(video.title)}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <div class="video-body">
            <h3>${escapeHTML(video.title)}</h3>
            <p>${escapeHTML(video.description || "")}</p>
          </div>
        </article>
      `;
      })
      .join("");

  if (previewContainer) {
    previewContainer.innerHTML = videoMarkup(videos.slice(0, 4));
  }

  if (archiveContainer) {
    archiveContainer.innerHTML = videoMarkup(videos);
  }
}

function renderContact() {
  const topContactContainer = document.getElementById("topContact");
  const topSocialsContainer = document.getElementById("topSocials");
  const footerContactContainer = document.getElementById("footerContact");
  const footerSocialsContainer = document.getElementById("footerSocials");
  const contact = siteContent.contact || {};
  const email = contact.email || "";
  const mobileNumbers = [
    contact.mobile,
    contact.mobileSecondary,
    contact.phone
  ].filter(Boolean);
  const socialLinks = [];

  const socialEntries = Object.entries(contact)
    .filter(([key]) => !["email", "mobile", "mobileSecondary", "phone"].includes(key))
    .map(([key, value]) => ({
      key,
      label: formatPlatformName(key),
      url: normalizeUrl(value)
    }))
    .filter((entry) => entry.url);

  if (
    !topContactContainer ||
    !topSocialsContainer ||
    !footerContactContainer ||
    !footerSocialsContainer
  ) {
    return;
  }

  socialEntries.forEach((entry, index) => {
    socialLinks.push(
      `<a class="top-social-link" href="${escapeHTML(entry.url)}" target="_blank" rel="noreferrer" aria-label="${escapeHTML(entry.label)}">${socialIcon(entry.label.replace(" 2", ""))}</a>`
    );
  });

  const topContactItems = [];
  const footerContactItems = [];

  if (email) {
    topContactItems.push(
      `<a class="top-contact-link" href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a>`
    );
    footerContactItems.push(
      `<a class="footer-contact-link" href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a>`
    );
  }

  mobileNumbers.forEach((mobile) => {
    topContactItems.push(
      `<a class="top-contact-link" href="tel:${escapeHTML(mobile)}">${escapeHTML(mobile)}</a>`
    );
    footerContactItems.push(
      `<a class="footer-contact-link" href="tel:${escapeHTML(mobile)}">${escapeHTML(mobile)}</a>`
    );
  });

  topContactContainer.innerHTML = topContactItems.join("");
  topSocialsContainer.innerHTML = socialLinks.join("");
  footerContactContainer.innerHTML = footerContactItems.join("");
  footerSocialsContainer.innerHTML = socialLinks.join("");
}

function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", uiText("openMenu"));
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? uiText("closeMenu") : uiText("openMenu"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });
}

function renderTrust() {
  const trust = siteContent.trust || {};
  const regEl = document.getElementById("trustRegistration");
  const regNoteEl = document.getElementById("trustRegNote");
  const taxEl = document.getElementById("trust80G");
  const fundEl = document.getElementById("trustFundGrid");

  if (regEl) regEl.textContent = trust.registration || "";
  if (regNoteEl) regNoteEl.textContent = trust.regNote || "";
  if (taxEl) taxEl.textContent = trust.section80G || "";

  if (fundEl) {
    const items = trust.fundUsage || [];
    fundEl.innerHTML = items
      .map(
        (item) => `
        <div class="fund-item">
          <div class="fund-bar-wrap">
            <div class="fund-bar" style="width:${escapeHTML(String(item.percent))}%"></div>
          </div>
          <div class="fund-label">
            <strong>${escapeHTML(item.label)} <span class="fund-percent">${escapeHTML(String(item.percent))}%</span></strong>
            <span>${escapeHTML(item.description)}</span>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function renderImpactStories() {
  const container = document.getElementById("impactStoriesGrid");
  const stories = siteContent.impactStories || [];

  if (!container || !stories.length) return;

  container.innerHTML = stories
    .map(
      (story) => `
      <article class="story-card story-card-alt">
        <span class="section-kicker">${escapeHTML(story.date || "")}${story.location ? " · " + escapeHTML(story.location) : ""}</span>
        <h3>${escapeHTML(story.title)}</h3>
        <blockquote class="story-quote story-quote-sm">${escapeHTML(story.quote)}</blockquote>
        <p>${escapeHTML(story.description)}</p>
        <div class="highlight-list">
          ${(story.highlights || []).map((h) => `<span class="highlight-chip">${escapeHTML(h)}</span>`).join("")}
        </div>
        <p class="story-attribution">${escapeHTML(story.attribution || "")}</p>
      </article>
    `
    )
    .join("");
}

function renderVolunteer() {
  const titleEl = document.getElementById("volunteerTitle");
  const descEl = document.getElementById("volunteerDescription");
  const waysEl = document.getElementById("volunteerWays");
  const volunteer = siteContent.volunteer || {};

  if (titleEl) titleEl.textContent = volunteer.title || "";
  if (descEl) descEl.textContent = volunteer.description || "";

  if (waysEl) {
    const ways = volunteer.ways || [];
    waysEl.innerHTML = ways
      .map(
        (item) => `
        <div class="volunteer-way">
          <strong>${escapeHTML(item.title)}</strong>
          <span>${escapeHTML(item.description)}</span>
        </div>
      `
      )
      .join("");
  }
}

function initWhatsAppFloat() {
  const btn = document.getElementById("whatsappFloat");
  if (!btn) return;

  const url = siteContent.contact?.whatsapp || "";
  if (!url) {
    btn.style.display = "none";
    return;
  }

  btn.href = url;
}

function handleStaticForm(formId, submitBtnId, successId, errorId, resetLabel) {
  const form = document.getElementById(formId);
  if (!form) return;
  const btn = document.getElementById(submitBtnId);
  const successEl = document.getElementById(successId);
  const errorEl = document.getElementById(errorId);
  const label = resetLabel || btn?.textContent || "Send";
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (btn) { btn.disabled = true; btn.textContent = uiText("sending"); }
    if (successEl) successEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";
    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        if (successEl) successEl.style.display = "block";
        if (btn) btn.style.display = "none";
      } else {
        if (errorEl) errorEl.style.display = "block";
        if (btn) { btn.disabled = false; btn.textContent = label; }
      }
    } catch {
      if (errorEl) errorEl.style.display = "block";
      if (btn) { btn.disabled = false; btn.textContent = label; }
    }
  });
}

function renderSchoolPartnership() {
  const sp = siteContent.schoolPartnership || {};
  const titleEl = document.getElementById("schoolPartnershipTitle");
  const descEl = document.getElementById("schoolPartnershipDescription");
  const statsEl = document.getElementById("programStatsGrid");
  const howEl = document.getElementById("missionHowGrid");
  const whyEl = document.getElementById("whyItMattersGrid");

  if (titleEl) titleEl.textContent = sp.title || "";
  if (descEl) descEl.textContent = sp.description || "";

  if (statsEl) {
    const stats = sp.programStats || [];
    statsEl.innerHTML = stats.map(s => `
      <div class="stat">
        <strong>${escapeHTML(s.value)}</strong>
        <span>${escapeHTML(s.label)}</span>
      </div>
    `).join("");
  }

  if (howEl) {
    const steps = sp.how || [];
    howEl.innerHTML = steps.map(step => `
      <div class="mission-step">
        <div class="mission-step-num">${escapeHTML(step.step)}</div>
        <div class="mission-step-body">
          <h3>${escapeHTML(step.title)}</h3>
          <p>${escapeHTML(step.description)}</p>
        </div>
      </div>
    `).join("");
  }

  if (whyEl) {
    const items = sp.whyItMatters || [];
    whyEl.innerHTML = items.map(item => `
      <article class="program-card difference-card">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }
}

function renderMissionHighlightCards() {
  const container = document.getElementById("missionHighlightCards");
  const highlights = (siteContent.mission || {}).highlights || [];
  if (!container || !highlights.length) return;
  container.innerHTML = highlights.map(item => `
    <article class="program-card proof-card">
      <h3>${escapeHTML(item)}</h3>
    </article>
  `).join("");
}

function init() {
  renderHero();
  renderStats();
  renderAbout();
  renderProof();
  renderDifference();
  renderTeam();
  renderPrograms();
  renderBarriers();
  renderFutureReadiness();
  renderImpactStory();
  renderImpactStories();
  renderSupport();
  renderUpdates();
  renderGallery();
  renderVideos();
  renderContact();
  renderTrust();
  renderVolunteer();
  handleStaticForm("volunteerForm", "volunteerSubmit", "volunteerSuccess", "volunteerError", uiText("sendInterest"));
  handleStaticForm("schoolForm", "schoolSubmit", "schoolSuccess", "schoolError", uiText("submitRegistration"));
  initMenu();
  initLightbox();
  initWhatsAppFloat();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

init();
