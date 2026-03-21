const updatesGrid = document.getElementById("updatesGrid");
const galleryGrid = document.getElementById("galleryGrid");
const postModal = document.getElementById("postModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");
const modalVideo = document.getElementById("modalVideo");

function youtubeEmbed(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    const videoId = parsed.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch (error) {
    return url;
  }
}

function renderUpdates() {
  if (!updates.length) {
    updatesGrid.innerHTML =
      '<div class="empty-note">No updates yet. Add your first daily story in data.js.</div>';
    return;
  }

  updatesGrid.innerHTML = updates
    .map(
      (post, index) => `
        <article class="card update-card">
          <div class="update-thumb">
            <img src="${post.coverImage || post.images?.[0] || ""}" alt="${post.title}" />
          </div>
          <div class="update-body">
            <div class="date">${post.date}</div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div class="media-row">
              <a class="media-link" href="#" data-index="${index}">View details</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-index]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(Number(link.dataset.index));
    });
  });
}

function renderGallery() {
  const allImages = updates.flatMap((post) => post.images || []);

  if (!allImages.length) {
    galleryGrid.innerHTML =
      '<div class="empty-note">Gallery will appear automatically when you add images.</div>';
    return;
  }

  galleryGrid.innerHTML = allImages
    .map(
      (img, index) =>
        `<img src="${img}" alt="Mirai Society gallery image ${index + 1}" loading="lazy" />`
    )
    .join("");
}

function openModal(index) {
  const post = updates[index];
  if (!post) return;

  modalTitle.textContent = post.title;
  modalDate.textContent = post.date;
  modalDescription.textContent = post.description;

  modalGallery.innerHTML = (post.images || []).length
    ? post.images.map((img) => `<img src="${img}" alt="${post.title}" />`).join("")
    : '<div class="empty-note">No photos added for this update yet.</div>';

  modalVideo.innerHTML = post.video
    ? `<iframe
         src="${youtubeEmbed(post.video)}"
         title="${post.title} video"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         allowfullscreen
       ></iframe>`
    : '<div class="empty-note">No video link for this update.</div>';

  postModal.classList.add("active");
  postModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModalFn() {
  postModal.classList.remove("active");
  postModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeModalFn);

postModal.addEventListener("click", (event) => {
  if (event.target === postModal) {
    closeModalFn();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModalFn();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

renderUpdates();
renderGallery();
