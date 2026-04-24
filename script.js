/* ========================= */
/* LANDING PAGE SCRIPT */
/* ========================= */

/* ========================= */
/* LETTER ANIMATION */
/* ========================= */
const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
const container = document.getElementById("landing-text");

let index = 0;

lines.forEach(line => {
  const div = document.createElement("div");

  line.split("").forEach(char => {
    const span = document.createElement("span");

    span.innerText = char;
    span.style.display = "inline-block";
    span.style.opacity = 0;
    span.style.transform = "translateY(50px)";
    span.style.color = "#fff";

    span.style.textShadow =
      "0 0 2px #fff, 0 0 6px #ff4d4d, 0 0 12px #ff1a1a, 0 0 20px #ff1a1a";

    span.style.animation = "rise 0.7s forwards";
    span.style.animationDelay = (index * 0.1) + "s";

    div.appendChild(span);
    index++;
  });

  container.appendChild(div);
});

/* ========================= */
/* DYNAMIC KEYFRAMES + FIREWORK STYLE */
/* ========================= */
const style = document.createElement("style");

style.innerHTML = `
@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
    text-shadow: 0 0 3px #fff,
                 0 0 10px #ff4d4d,
                 0 0 20px #ff1a1a,
                 0 0 30px #ff0000;
  }
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  animation: explode 1s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.5) translate(var(--dx), var(--dy));
    opacity: 0;
  }
}
`;

document.head.appendChild(style);

/* ========================= */
/* FIREWORK EFFECT */
/* ========================= */
function createFirework() {
  const count = 15 + Math.floor(Math.random() * 10);

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.5;

  for (let i = 0; i < count; i++) {
    const fw = document.createElement("div");

    fw.className = "firework";
    fw.style.left = x + "px";
    fw.style.top = y + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = 50 + Math.random() * 50;

    fw.style.setProperty("--dx", distance * Math.cos(angle) + "px");
    fw.style.setProperty("--dy", distance * Math.sin(angle) + "px");

    document.body.appendChild(fw);

    setTimeout(() => {
      fw.remove();
    }, 1000);
  }
}

/* Start Fireworks */
const fireworkInterval = setInterval(createFirework, 400);

/* ========================= */
/* CURSOR GLOW FOLLOW */
/* ========================= */
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ========================= */
/* LANDING PAGE EXIT */
/* ========================= */
setTimeout(() => {
  /* Stop fireworks */
  clearInterval(fireworkInterval);

  /* Fade overlay */
  const overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;

  /* Hide landing page */
  setTimeout(() => {
    document.getElementById("landing-page").style.display = "none";
  }, 800);

}, 3000);
