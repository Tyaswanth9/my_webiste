/* =========================================================
   PORTFOLIO JS (FIXED STRUCTURE)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const landingPage = document.getElementById("landing-page");
  const overlay = document.getElementById("overlay");
  const container = document.getElementById("landing-text");
  const cursor = document.getElementById("cursor");

  /* =========================
     TYPE LANDING TEXT
  ========================= */
  const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
  let index = 0;

  if (container) {
    container.innerHTML = "";

    lines.forEach(line => {
      const div = document.createElement("div");

      line.split("").forEach(char => {
        const span = document.createElement("span");

        span.innerText = char;
        span.style.opacity = "0";
        span.style.transform = "translateY(40px)";
        span.style.animation = "rise 0.6s forwards";
        span.style.animationDelay = (index * 0.08) + "s";

        div.appendChild(span);
        index++;
      });

      container.appendChild(div);
    });
  }

  /* =========================
     FIREWORKS
  ========================= */
  function createFirework() {
    const fw = document.createElement("div");
    fw.className = "firework";
    document.body.appendChild(fw);

    setTimeout(() => fw.remove(), 1000);
  }

  const fireworkInterval = setInterval(createFirework, 400);

  /* =========================
     CURSOR
  ========================= */
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  /* =========================
     LANDING EXIT
  ========================= */
  setTimeout(() => {
    clearInterval(fireworkInterval);

    if (landingPage) {
      landingPage.style.display = "none";
    }

  }, 3000);

});

/* =========================================================
   STATS ANIMATION (SAFE)
   ========================================================= */
window.addEventListener("load", () => {

  const counters = document.querySelectorAll(".counter");
  const boxes = document.querySelectorAll(".stat-box");

  function runAnimation() {
    boxes.forEach((box, i) => {
      setTimeout(() => box.classList.add("show"), i * 150);
    });

    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;

      const update = () => {
        count++;
        counter.innerText = count;

        if (count < target) {
          requestAnimationFrame(update);
        }
      };

      update();
    });
  }

  runAnimation();
});
