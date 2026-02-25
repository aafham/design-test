const root = document.documentElement;
const tiltCard = document.getElementById("tiltCard");
const reveals = document.querySelectorAll(".reveal");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

window.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  root.style.setProperty("--mx", `${x}%`);
  root.style.setProperty("--my", `${y}%`);
});

if (tiltCard) {
  tiltCard.addEventListener("pointermove", (event) => {
    const box = tiltCard.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    const rotateY = clamp((x / box.width - 0.5) * 16, -8, 8);
    const rotateX = clamp((0.5 - y / box.height) * 16, -8, 8);

    tiltCard.style.transform = `perspective(920px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "perspective(920px) rotateX(0deg) rotateY(0deg)";
  });
}

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
