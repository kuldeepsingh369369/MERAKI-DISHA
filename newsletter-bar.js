(function () {
  const DISMISS_KEY = "mirai_bar_dismissed_until";
  const SUBSCRIBED_KEY = "mirai_bar_subscribed";
  const DISMISS_DAYS = 7;

  function isDismissed() {
    if (localStorage.getItem(SUBSCRIBED_KEY)) return true;
    const until = localStorage.getItem(DISMISS_KEY);
    if (!until) return false;
    return Date.now() < parseInt(until, 10);
  }

  function setDismissed() {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, String(until));
  }

  function clearDismissed() {
    localStorage.removeItem(DISMISS_KEY);
  }

  function buildBar() {
    const bar = document.createElement("div");
    bar.className = "newsletter-bar";
    bar.id = "newsletterBar";
    bar.setAttribute("aria-label", "Stay updated");
    bar.setAttribute("role", "complementary");
    bar.innerHTML = `
      <div class="newsletter-bar-inner">
        <div class="newsletter-bar-copy">
          <strong>Get field updates</strong>
          <span>Stay connected to the work on the ground.</span>
        </div>
        <form class="newsletter-bar-form" id="newsletterBarForm" action="https://api.staticforms.xyz/submit" method="POST">
          <input type="hidden" name="accessKey" value="sf_2d95c0e7ead6546ba848cecc" />
          <input type="hidden" name="subject" value="Newsletter Sign-up — Mirai Society" />
          <div class="newsletter-bar-inputs" id="newsletterBarInputs">
            <input type="email" name="email" placeholder="your@email.com" required aria-label="Email address" />
            <button type="submit" class="btn btn-primary" id="newsletterBarSubmit">Subscribe</button>
          </div>
          <p class="newsletter-bar-success" id="newsletterBarSuccess" style="display:none;">
            You are subscribed! We will keep you updated from the field.
          </p>
        </form>
        <button class="newsletter-bar-close" id="newsletterBarClose" aria-label="Dismiss">×</button>
      </div>
    `;
    document.body.appendChild(bar);
    return bar;
  }

  function showBar(bar) {
    bar.classList.add("visible");
  }

  function hideBar(bar) {
    bar.classList.remove("visible");
  }

  const bar = buildBar();

  // Show after scrolling 40% — only if not dismissed
  let shown = false;
  window.addEventListener("scroll", function () {
    if (shown || isDismissed()) return;
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrolled >= 0.4) {
      showBar(bar);
      shown = true;
    }
  }, { passive: true });

  // Close button — dismiss for 7 days
  document.getElementById("newsletterBarClose").addEventListener("click", function () {
    hideBar(bar);
    setDismissed();
  });

  // Footer "Get field updates" links — reopen the bar
  document.addEventListener("click", function (e) {
    const link = e.target.closest(".js-open-newsletter-bar");
    if (!link) return;
    e.preventDefault();
    clearDismissed();
    showBar(bar);
    shown = true;
  });

  // Form submission
  document.getElementById("newsletterBarForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById("newsletterBarSubmit");
    const successEl = document.getElementById("newsletterBarSuccess");
    const inputsEl = document.getElementById("newsletterBarInputs");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: new FormData(this),
      });
      const json = await res.json();

      if (json.success) {
        inputsEl.style.display = "none";
        successEl.style.display = "block";
        localStorage.setItem(SUBSCRIBED_KEY, "1");
        setTimeout(() => hideBar(bar), 4000);
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = "Subscribe";
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = "Subscribe";
    }
  });
})();