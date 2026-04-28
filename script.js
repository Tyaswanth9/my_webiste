/* =========================================================
   PORTFOLIO JS (FINAL OLD VERSION + LOADER FIX)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const landingPage = document.getElementById("landing-page");
  const cursor = document.getElementById("cursor");
  const container = document.getElementById("landing-text");

  /* =========================================================
     LANDING TEXT
     ========================================================= */
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

  /* =========================================================
     RISE ANIMATION
     ========================================================= */
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

  /* =========================================================
     CURSOR EFFECT
     ========================================================= */
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  /* =========================================================
     LANDING EXIT
     ========================================================= */
  setTimeout(() => {

    if (landingPage) {
      landingPage.style.display = "none";
    }

  }, 3000);

});

/* =========================================================
   PAGE LOADER (FIXED)
   ========================================================= */
window.addEventListener("load", () => {

  const loader = document.getElementById("page-loader");

  if (loader) {
    loader.classList.add("hide");
  }
});

/* =========================================================
   TYPEWRITER
   ========================================================= */

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

/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

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
