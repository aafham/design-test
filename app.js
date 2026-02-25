const root = document.documentElement;
const siteHeader = document.getElementById("siteHeader");
const tiltCard = document.getElementById("tiltCard");
const reveals = document.querySelectorAll(".reveal");
const toggle = document.getElementById("themeToggle");
const orderForm = document.getElementById("orderForm");
const toast = document.getElementById("toast");
const orderSection = document.getElementById("order");
const whatsappFloat = document.getElementById("whatsappFloat");
const whatsappMobile = document.getElementById("whatsappMobile");
const navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  if (toggle) {
    const checked = theme === "dark";
    toggle.setAttribute("aria-checked", checked ? "true" : "false");
  }
};

applyTheme(getInitialTheme());

if (toggle) {
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
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

window.addEventListener(
  "scroll",
  () => {
    if (!siteHeader) {
      return;
    }
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

if (tiltCard && !prefersReducedMotion) {
  tiltCard.addEventListener("pointermove", (event) => {
    const box = tiltCard.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    const rotateY = clamp((x / box.width - 0.5) * 8, -4, 4);
    const rotateX = clamp((0.5 - y / box.height) * 8, -4, 4);
    tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

if (prefersReducedMotion) {
  reveals.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((item) => revealObserver.observe(item));
}

const scrollToWithOffset = (target) => {
  const headerOffset = siteHeader ? siteHeader.offsetHeight + 16 : 96;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id) {
      return;
    }
    const section = document.querySelector(id);
    if (!section) {
      return;
    }
    event.preventDefault();
    scrollToWithOffset(section);
    history.replaceState(null, "", id);
  });
});

if (navLinks.length > 0) {
  const sectionMap = Array.from(navLinks)
    .map((link) => {
      const id = link.getAttribute("href");
      if (!id) {
        return null;
      }
      const section = document.querySelector(id);
      if (!section) {
        return null;
      }
      return { id, link, section };
    })
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === id);
    });
  };

  if (sectionMap.length > 0) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = `#${visible[0].target.id}`;
          setActive(id);
        }
      },
      {
        rootMargin: "-34% 0px -54% 0px",
        threshold: [0.2, 0.4, 0.6]
      }
    );

    sectionMap.forEach((item) => navObserver.observe(item.section));
  }
}

const setWhatsAppHidden = (hidden) => {
  [whatsappFloat, whatsappMobile].forEach((node) => {
    if (!node) {
      return;
    }
    node.classList.toggle("wa-hidden", hidden);
  });
};

if (orderSection) {
  const waObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setWhatsAppHidden(entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );
  waObserver.observe(orderSection);
}

const showToast = (message) => {
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2300);
};

if (orderForm) {
  const fullName = document.getElementById("fullName");
  const phoneNumber = document.getElementById("phoneNumber");
  const eventDate = document.getElementById("eventDate");
  const cakeType = document.getElementById("cakeType");
  const submitOrderBtn = document.getElementById("submitOrderBtn");
  const phonePattern = /^\+60\s1\d-\d{4}\s\d{3}$/;

  if (eventDate) {
    eventDate.min = new Date().toISOString().split("T")[0];
  }

  const getErrorNode = (fieldName) => orderForm.querySelector(`[data-error-for="${fieldName}"]`);

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

  const formatPhoneInput = (rawValue) => {
    let digits = rawValue.replace(/\D/g, "");
    if (digits.startsWith("60")) {
      digits = digits.slice(2);
    }
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    digits = digits.slice(0, 9);

    if (digits.length === 0) {
      return "";
    }
    if (digits.length <= 2) {
      return `+60 ${digits}`;
    }
    if (digits.length <= 6) {
      return `+60 ${digits.slice(0, 2)}-${digits.slice(2)}`;
    }
    return `+60 ${digits.slice(0, 2)}-${digits.slice(2, 6)} ${digits.slice(6)}`;
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

  const isFormReady = () => {
    if (!fullName || !phoneNumber || !eventDate || !cakeType) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = eventDate.value ? new Date(eventDate.value) : null;
    return (
      fullName.value.trim().length >= 2 &&
      phonePattern.test(phoneNumber.value.trim()) &&
      !!selectedDate &&
      selectedDate >= today &&
      !!cakeType.value
    );
  };

  const syncSubmitState = () => {
    if (!submitOrderBtn) {
      return;
    }
    const ready = isFormReady();
    submitOrderBtn.disabled = !ready;
    submitOrderBtn.setAttribute("aria-disabled", ready ? "false" : "true");
  };

  syncSubmitState();

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
        target.value = formatPhoneInput(target.value);
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

      syncSubmitState();
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
    syncSubmitState();
  });
}
