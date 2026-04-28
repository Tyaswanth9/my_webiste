/* =========================================================
   PORTFOLIO JAVASCRIPT (PRODUCTION FIXED VERSION)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENT REFERENCES
     ========================================================= */
  const landingPage = document.getElementById("landing-page");
  const overlay = document.getElementById("overlay");
  const container = document.getElementById("landing-text");
  const cursor = document.getElementById("cursor");

  /* =========================================================
     LANDING TEXT CONTENT
     ========================================================= */
  const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
  let index = 0;

  /* =========================================================
     TEXT ANIMATION (LANDING PAGE)
     ========================================================= */
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

  /* =========================================================
     SAFE KEYFRAME INJECTION (PREVENT DUPLICATE)
     ========================================================= */
  if (!document.getElementById("rise-style")) {

    const style = document.createElement("style");

    style.id = "rise-style";
    style.innerHTML = `
      @keyframes rise {
        to {
          opacity: 1;
          transform: translateY(0);
          text-shadow: 0 0 5px #fff, 0 0 10px #ff4d4d;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* =========================================================
     FIREWORK SYSTEM
     ========================================================= */
  function createFirework() {

    const count = 12;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;

    for (let i = 0; i < count; i++) {

      const fw = document.createElement("div");
      fw.className = "firework";

      fw.style.left = x + "px";
      fw.style.top = y + "px";

      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 50;

      fw.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      fw.style.setProperty("--dy", Math.sin(angle) * distance + "px");

      document.body.appendChild(fw);

      setTimeout(() => fw.remove(), 1000);
    }
  }

  /* FIREWORK LOOP */
  const fireworkInterval = setInterval(createFirework, 400);

  /* =========================================================
     CURSOR EFFECT (DESKTOP ONLY)
     ========================================================= */
  if (cursor) {

    document.addEventListener("mousemove", (e) => {

      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
  }

  /* =========================================================
     LANDING EXIT CONTROL
     ========================================================= */
  setTimeout(() => {

    clearInterval(fireworkInterval);

    /* SHOW OVERLAY FADE */
    if (overlay) {
      overlay.classList.add("active");
    }

    setTimeout(() => {

      if (landingPage) {

        landingPage.style.opacity = "0";
        landingPage.style.transition = "0.6s ease";
        landingPage.style.pointerEvents = "none";

        setTimeout(() => {

          landingPage.style.display = "none";

          document.body.classList.remove("landing-active");
          document.body.style.overflow = "";

          if (overlay) {
            overlay.classList.remove("active");
          }

        }, 600);
      }

    }, 500);

  }, 3000);

});

/* =========================================================
   TYPEWRITER EFFECT (NAME + SKILLS LOOP)
   ========================================================= */

const titleText = "Data Analyst";
const skillsText = "SQL • Power BI • Excel • Tableau • Data Visualization";

const titleElement = document.getElementById("typing-title");
const skillsElement = document.getElementById("typing-skills");

const totalDuration = 2500;
const pauseDuration = 2500;

const titleSpeed = totalDuration / titleText.length;
const skillsSpeed = totalDuration / skillsText.length;

/* TYPE FUNCTION */
function typeText(element, text, speed, callback) {

  if (!element) return;

  let index = 0;
  element.innerHTML = "";

  function type() {

    if (index < text.length) {

      element.innerHTML += text.charAt(index);
      index++;

      setTimeout(type, speed);

    } else {

      if (callback) callback();
    }
  }

  type();
}

/* LOOP FUNCTION */
function startTypingLoop() {

  typeText(titleElement, titleText, titleSpeed, () => {

    typeText(skillsElement, skillsText, skillsSpeed, () => {

      setTimeout(() => {

        if (titleElement) titleElement.innerHTML = "";
        if (skillsElement) skillsElement.innerHTML = "";

        startTypingLoop();

      }, pauseDuration);

    });

  });
}

/* START TYPEWRITER ON LOAD */
window.addEventListener("load", () => {
  startTypingLoop();
});

/* =========================================================
   COUNTER + SCROLL ANIMATION (STATS SECTION)
   ========================================================= */

const counters = document.querySelectorAll(".counter");
const boxes = document.querySelectorAll(".stat-box");

let isVisible = false;
let loopTimeout;

/* RUN ANIMATION */
function runAnimation() {

  boxes.forEach((box, i) => {

    setTimeout(() => {
      box.classList.add("show");
    }, i * 150);
  });

  counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");
    const duration = +counter.getAttribute("data-speed");

    let start = 0;
    const increment = target / duration;

    function updateCount() {

      start += increment;

      if (start < target) {

        counter.innerText = Math.ceil(start);
        requestAnimationFrame(updateCount);

      } else {

        counter.innerText = target + "+";
      }
    }

    updateCount();
  });

  /* LOOP RESET */
  loopTimeout = setTimeout(() => {

    if (!isVisible) return;

    resetAnimation();
    runAnimation();

  }, 2500);
}

/* RESET ANIMATION */
function resetAnimation() {

  counters.forEach(counter => {
    counter.innerText = "0";
  });

  boxes.forEach(box => {
    box.classList.remove("show");
  });
}

/* =========================================================
   INTERSECTION OBSERVER (SCROLL DETECTION)
   ========================================================= */
const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      if (!isVisible) {
        isVisible = true;
        runAnimation();
      }

    } else {

      isVisible = false;

      clearTimeout(loopTimeout);
      resetAnimation();
    }

  });

}, {
  threshold: 0.2
});

/* OBSERVE STATS SECTION */
const statsSection = document.getElementById("stats");

if (statsSection) {
  observer.observe(statsSection);
}


/* =========================================================
   SKILLS ANIMATION (SCROLL REVEAL) (between the skills and project section)
   ========================================================= */

/* =========================================================
   SPHERE TOUCH CONTROL (MOBILE FRIENDLY)
   ========================================================= */

const sphere = document.querySelector(".sphere");

let rotateX = 10;
let rotateY = 0;

document.addEventListener("mousemove", (e) => {
  rotateY = (e.clientX / window.innerWidth) * 360;
  sphere.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
});
