const root = document.documentElement;
const siteHeader = document.getElementById("siteHeader");
const tiltCard = document.getElementById("tiltCard");
const reveals = document.querySelectorAll(".reveal");
const toggle = document.getElementById("themeToggle");
const loader = document.getElementById("loader");
const themeFade = document.getElementById("themeFade");
const orderForm = document.getElementById("orderForm");
const toast = document.getElementById("toast");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getPreferredTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  if (toggle) {
    const isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
};

const playThemeTransition = (nextTheme) => {
  if (!themeFade || prefersReducedMotion) {
    applyTheme(nextTheme);
    return;
  }

  themeFade.classList.add("is-active");

  window.setTimeout(() => {
    applyTheme(nextTheme);
  }, 120);

  window.setTimeout(() => {
    themeFade.classList.remove("is-active");
  }, 380);
};

applyTheme(getPreferredTheme());

if (toggle) {
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    playThemeTransition(next);
    localStorage.setItem("theme", next);
  });
}

if (!prefersReducedMotion) {
  let frameRequested = false;
  let nextX = 50;
  let nextY = 50;

  window.addEventListener("pointermove", (event) => {
    nextX = (event.clientX / window.innerWidth) * 100;
    nextY = (event.clientY / window.innerHeight) * 100;
    if (frameRequested) {
      return;
    }
    frameRequested = true;
    window.requestAnimationFrame(() => {
      root.style.setProperty("--mx", `${nextX}%`);
      root.style.setProperty("--my", `${nextY}%`);
      frameRequested = false;
    });
  });
}

window.addEventListener("scroll", () => {
  if (!siteHeader) {
    return;
  }
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
});

if (tiltCard && !prefersReducedMotion) {
  tiltCard.addEventListener("pointermove", (event) => {
    const box = tiltCard.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    const rotateY = clamp((x / box.width - 0.5) * 10, -5, 5);
    const rotateX = clamp((0.5 - y / box.height) * 10, -5, 5);

    tiltCard.style.transform = `perspective(920px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "perspective(920px) rotateX(0deg) rotateY(0deg)";
  });
}

if (prefersReducedMotion) {
  reveals.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach((item, index) => {
    item.style.transitionDelay = `${index * 90}ms`;
    observer.observe(item);
  });
}

const showToast = (message) => {
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
};

if (orderForm) {
  const fullName = document.getElementById("fullName");
  const phoneNumber = document.getElementById("phoneNumber");
  const eventDate = document.getElementById("eventDate");
  const cakeType = document.getElementById("cakeType");
  const phonePattern = /^\+60\s1\d-\d{4}\s\d{3}$/;

  if (eventDate) {
    eventDate.min = new Date().toISOString().split("T")[0];
  }

  const getErrorNode = (fieldName) =>
    orderForm.querySelector(`[data-error-for="${fieldName}"]`);

  const setFieldError = (field, message) => {
    if (!field) {
      return;
    }
    field.setAttribute("aria-invalid", message ? "true" : "false");
    const node = getErrorNode(field.name);
    if (node) {
      node.textContent = message || "";
    }
  };

  const validate = () => {
    let isValid = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!fullName || fullName.value.trim().length < 2) {
      setFieldError(fullName, "Please enter at least 2 characters.");
      isValid = false;
    } else {
      setFieldError(fullName, "");
    }

    if (!phoneNumber || !phonePattern.test(phoneNumber.value.trim())) {
      setFieldError(phoneNumber, "Use format: +60 1X-XXXX XXX");
      isValid = false;
    } else {
      setFieldError(phoneNumber, "");
    }

    const selectedDate = eventDate && eventDate.value ? new Date(eventDate.value) : null;
    if (!selectedDate) {
      setFieldError(eventDate, "Please select an event date.");
      isValid = false;
    } else if (selectedDate < today) {
      setFieldError(eventDate, "Event date cannot be in the past.");
      isValid = false;
    } else {
      setFieldError(eventDate, "");
    }

    if (!cakeType || !cakeType.value) {
      setFieldError(cakeType, "Please select a cake type.");
      isValid = false;
    } else {
      setFieldError(cakeType, "");
    }

    return isValid;
  };

  ["input", "change", "blur"].forEach((eventName) => {
    orderForm.addEventListener(eventName, (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
        return;
      }
      if (target.name === "fullName") {
        setFieldError(target, target.value.trim().length >= 2 ? "" : "Please enter at least 2 characters.");
      }
      if (target.name === "phoneNumber") {
        setFieldError(target, phonePattern.test(target.value.trim()) ? "" : "Use format: +60 1X-XXXX XXX");
      }
      if (target.name === "eventDate") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = target.value ? new Date(target.value) : null;
        if (!selected) {
          setFieldError(target, "Please select an event date.");
        } else if (selected < today) {
          setFieldError(target, "Event date cannot be in the past.");
        } else {
          setFieldError(target, "");
        }
      }
      if (target.name === "cakeType") {
        setFieldError(target, target.value ? "" : "Please select a cake type.");
      }
    });
  });

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    orderForm.reset();
    [fullName, phoneNumber, eventDate, cakeType].forEach((field) => setFieldError(field, ""));
    showToast("Order request sent. We will contact you shortly.");
  });
}

window.addEventListener("load", () => {
  window.setTimeout(() => {
    if (loader) {
      loader.classList.add("is-hidden");
    }
  }, prefersReducedMotion ? 160 : 800);
});
