function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "";
}

function setImage(id, src, alt = "") {
  const el = document.getElementById(id);
  if (el && src) {
    el.src = src;
    el.alt = alt;
  }
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
  setText("heroTitle", siteContent.hero.title);
  setText("heroSubtitle", siteContent.hero.subtitle);
  setImage("heroImage", siteContent.hero.image, siteContent.hero.title);
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
  setText("aboutTitle", siteContent.about.title);
  setText("aboutDescription", siteContent.about.description);
  setText("missionTitle", siteContent.mission.title);
  setText("missionDescription", siteContent.mission.description);
}

function renderPrograms() {
  const container = document.getElementById("programsGrid");
  const programs = siteContent.programs || [];

  if (!container) return;

  if (!programs.length) {
    container.innerHTML = '<div class="empty-note">No programs added yet.</div>';
    return;
  }

  container.innerHTML = programs
    .map(
      (item) => `
        <article class="program-card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join("");
}

function renderUpdates() {
  const container = document.getElementById("updatesGrid");
  const updates = siteContent.updates || [];

  if (!container) return;

  if (!updates.length) {
    container.innerHTML = '<div class="empty-note">No updates added yet.</div>';
    return;
  }

  container.innerHTML = updates
    .map(
      (item) => `
        <article class="update-card">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="update-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGallery() {
  const container = document.getElementById("galleryGrid");
  const gallery = siteContent.gallery || [];

  if (!container) return;

  if (!gallery.length) {
    container.innerHTML = '<div class="empty-note">No gallery images added yet.</div>';
    return;
  }

  container.innerHTML = gallery
    .map(
      (img, index) =>
        `<img src="${img}" alt="Mirai Society gallery image ${index + 1}" loading="lazy" />`
    )
    .join("");
}

function renderVideos() {
  const container = document.getElementById("videosGrid");
  const videos = siteContent.videos || [];

  if (!container) return;

  if (!videos.length) {
    container.innerHTML = '<div class="empty-note">No videos added yet.</div>';
    return;
  }

  container.innerHTML = videos
    .map((video) => {
      const embedUrl = youtubeEmbed(video.url);

      return `
        <article class="video-card">
          <div class="video-frame">
            <iframe
              src="${embedUrl}"
              title="${video.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
          <div class="video-body">
            <h3>${video.title}</h3>
            <p>${video.description || ""}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderContact() {
  const container = document.getElementById("contactActions");
  const contact = siteContent.contact || {};
  const actions = [];

  if (contact.email) {
    actions.push(
      `<a class="btn btn-primary" href="mailto:${contact.email}">Email Us</a>`
    );
  }

  if (contact.instagram) {
    actions.push(
      `<a class="btn btn-secondary" href="${contact.instagram}" target="_blank" rel="noreferrer">Instagram</a>`
    );
  }

  if (contact.youtube) {
    actions.push(
      `<a class="btn btn-secondary" href="${contact.youtube}" target="_blank" rel="noreferrer">YouTube</a>`
    );
  }

  container.innerHTML = actions.join("");
}

function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function init() {
  renderHero();
  renderStats();
  renderAbout();
  renderPrograms();
  renderUpdates();
  renderGallery();
  renderVideos();
  renderContact();
  initMenu();
  document.getElementById("year").textContent = new Date().getFullYear();
}

init();
