/* =========================================================
   PORTFOLIO JAVASCRIPT (PRODUCTION FIXED VERSION)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const landingPage = document.getElementById("landing-page");
  const overlay = document.getElementById("overlay");
  const container = document.getElementById("landing-text");
  const cursor = document.getElementById("cursor");

  const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
  let index = 0;

  if (container) {

    container.innerHTML = "";

    lines.forEach(line => {

      const div = document.createElement("div");

      line.split("").forEach(char => {

        const span = document.createElement("span");

        span.innerText = char;
        span.style.display = "inline-block";
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

  if (!document.getElementById("rise-style")) {

    const style = document.createElement("style");

    style.id = "rise-style";
    style.innerHTML = `
      @keyframes rise {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createFirework() {

    const fw = document.createElement("div");
    fw.className = "firework";

    document.body.appendChild(fw);

    setTimeout(() => fw.remove(), 1000);
  }

  const fireworkInterval = setInterval(createFirework, 400);

  if (cursor) {

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  setTimeout(() => {

    clearInterval(fireworkInterval);

    if (landingPage) {
      landingPage.style.display = "none";
    }

  }, 3000);

});

/* TYPEWRITER */
const titleText = "Data Analyst";
const skillsText = "SQL • Power BI • Excel • Tableau";

const titleElement = document.getElementById("typing-title");
const skillsElement = document.getElementById("typing-skills");

function typeText(element, text) {

  if (!element) return;

  let i = 0;

  function typing() {

    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    }
  }

  typing();
}

window.addEventListener("load", () => {
  typeText(titleElement, titleText);
  typeText(skillsElement, skillsText);
});

/* COUNTER */
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

  const target = +counter.dataset.target;
  let count = 0;

  function update() {

    if (count < target) {
      count++;
      counter.innerText = count;
      setTimeout(update, 20);
    }
  }

  update();
});
