const KAIKOU_CONFIG = window.KAIKOU_CONFIG || {};
const downloadConfig = KAIKOU_CONFIG.download || {};
const contactConfig = KAIKOU_CONFIG.contact || {};
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const downloadLinks = document.querySelectorAll("[data-apk-download]");
const contactEmailLinks = document.querySelectorAll("[data-contact-email]");
const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));

downloadLinks.forEach((link) => {
  link.href = downloadConfig.apkUrl || "#download";
  link.setAttribute("download", "");
  link.setAttribute("rel", "noopener");
});

const setText = (selector, text) => {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = text;
  }
};

setText("[data-app-version]", downloadConfig.version || "--");
setText("[data-app-platform]", downloadConfig.platform || "--");
setText("[data-app-size]", downloadConfig.fileSize || "--");
setText("[data-app-updated]", downloadConfig.updated || "--");

contactEmailLinks.forEach((link) => {
  if (!contactConfig.email) {
    return;
  }

  link.textContent = contactConfig.email;
  link.href = `mailto:${contactConfig.email}`;
});

const closeMenu = () => {
  if (!navMenu || !navToggle) {
    return;
  }

  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const updateHeader = () => {
  if (!header) {
    return;
  }

  header.dataset.elevated = String(window.scrollY > 8);
};

const updateStickyOffset = () => {
  if (!header) {
    return;
  }

  document.documentElement.style.setProperty("--sticky-offset", `${header.offsetHeight}px`);
};

const getHashTarget = (hash) => {
  if (!hash || hash === "#") {
    return null;
  }

  try {
    return document.querySelector(hash);
  } catch {
    return null;
  }
};

const scrollToHash = (hash, behavior = "smooth") => {
  const target = getHashTarget(hash);
  if (!target) {
    return false;
  }

  const targetTopGap = window.matchMedia("(max-width: 720px)").matches ? 40 : 36;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - targetTopGap);
  window.scrollTo({ top, behavior });
  return true;
};

const updateActiveNav = () => {
  if (!navLinks.length) {
    return;
  }

  const offset = (header?.offsetHeight || 0) + 40;
  let activeHash = navLinks[0].hash;

  navLinks.forEach((link) => {
    const target = document.querySelector(link.hash);
    if (target && target.offsetTop - offset <= window.scrollY) {
      activeHash = link.hash;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.hash === activeHash);
  });
};

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || !getHashTarget(hash)) {
      return;
    }

    event.preventDefault();
    closeMenu();
    history.pushState(null, "", hash);
    scrollToHash(hash);
    updateActiveNav();
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", () => {
  updateStickyOffset();
  updateActiveNav();
});
window.addEventListener("load", () => {
  updateStickyOffset();
  if (window.location.hash) {
    const correctHashScroll = () => {
      updateStickyOffset();
      scrollToHash(window.location.hash, "instant");
      updateActiveNav();
    };

    window.setTimeout(correctHashScroll, 180);
    window.setTimeout(correctHashScroll, 650);
  }
  updateActiveNav();
});
updateHeader();
updateStickyOffset();
updateActiveNav();

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
