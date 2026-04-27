/* =========================
   ELEMENTS
   ========================= */
const landingPage = document.getElementById("landing-page");
const overlay = document.getElementById("overlay");
const container = document.getElementById("landing-text");
const cursor = document.getElementById("cursor");

/* =========================
   TEXT CONTENT
   ========================= */
const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
let index = 0;

container.innerHTML = "";

/* =========================
   TEXT ANIMATION (GLOW)
   ========================= */
lines.forEach(line => {
  const div = document.createElement("div");

  line.split("").forEach(char => {
    const span = document.createElement("span");

    span.innerText = char;
    span.style.animationDelay = (index * 0.08) + "s";

    div.appendChild(span);
    index++;
  });

  container.appendChild(div);
});

/* =========================
   FIREWORK FUNCTION
   ========================= */
function createFirework() {

  const count = window.innerWidth < 768 ? 8 : 15;

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.5;

  for (let i = 0; i < count; i++) {
    const fw = document.createElement("div");

    fw.className = "firework";
    fw.style.left = x + "px";
    fw.style.top = y + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = 40 + Math.random() * 50;

    fw.style.setProperty("--dx", distance * Math.cos(angle) + "px");
    fw.style.setProperty("--dy", distance * Math.sin(angle) + "px");

    document.body.appendChild(fw);

    setTimeout(() => fw.remove(), 1000);
  }
}

/* FIREWORK LOOP */
const fireworkInterval = setInterval(createFirework, 400);

/* =========================
   CURSOR GLOW (DESKTOP ONLY)
   ========================= */
if (window.innerWidth > 768 && cursor) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

/* =========================
   EXIT LANDING PAGE
   ========================= */
const displayTime = 2300;

setTimeout(() => {

  clearInterval(fireworkInterval);

  if (overlay) overlay.style.opacity = "1";

  setTimeout(() => {

    landingPage.style.opacity = "0";
    landingPage.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      landingPage.style.display = "none";

      // restore scroll
      document.body.style.overflow = "auto";

    }, 500);

  }, 500);

}, displayTime);


/* =========================================
   TYPEWRITER EFFECT (LOOP) (name and skills)
   ========================================= */

// TEXT CONTENT
const titleText = "Data Analyst";
const skillsText = "SQL • Power BI • Excel • Tableau • Data Visualization";

// TARGET ELEMENTS
const titleElement = document.getElementById("typing-title");
const skillsElement = document.getElementById("typing-skills");

// SPEED CONTROL
const totalDuration = 2500; // typing time
const pauseDuration = 2500; // pause before restart

// CALCULATE SPEED PER LETTER
const titleSpeed = totalDuration / titleText.length;
const skillsSpeed = totalDuration / skillsText.length;

/* =========================================
   TYPE FUNCTION
   ========================================= */
function typeText(element, text, speed, callback) {
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

/* =========================================
   LOOP FUNCTION
   ========================================= */
function startTypingLoop() {

  // TYPE TITLE FIRST
  typeText(titleElement, titleText, titleSpeed, () => {

    // THEN TYPE SKILLS
    typeText(skillsElement, skillsText, skillsSpeed, () => {

      // WAIT → CLEAR → RESTART
      setTimeout(() => {
        titleElement.innerHTML = "";
        skillsElement.innerHTML = "";

        startTypingLoop(); //  LOOP AGAIN

      }, pauseDuration);

    });

  });

}

/* =========================================
   START AFTER PAGE LOAD
   ========================================= */
window.addEventListener("load", () => {
  startTypingLoop();
});

/* =========================================
   COUNTER + SCROLL ANIMATION (RUN ON SCROLL) (this is project and expriance count between the summary and expriance section)
   ========================================= */

const counters = document.querySelectorAll(".counter");
const boxes = document.querySelectorAll(".stat-box");

let isVisible = false;
let loopTimeout;

/* =========================================
   FUNCTION TO RUN ANIMATION
   ========================================= */
function runAnimation() {

  /* SHOW BOXES (STAGGER) */
  boxes.forEach((box, i) => {
    setTimeout(() => {
      box.classList.add("show");
    }, i * 150);
  });

  /* COUNTING */
  counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");
    const duration = +counter.getAttribute("data-speed");

    let start = 0;
    const increment = target / duration;

    const updateCount = () => {
      start += increment;

      if (start < target) {
        counter.innerText = Math.ceil(start);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });

  /* AFTER FINISH → WAIT 2.5s → RESET & RESTART */
  loopTimeout = setTimeout(() => {
    if (!isVisible) return;

    resetAnimation();
    runAnimation();

  }, 2500);
}

/* =========================================
   RESET FUNCTION
   ========================================= */
function resetAnimation() {
  counters.forEach(counter => {
    counter.innerText = "0";
  });

  boxes.forEach(box => {
    box.classList.remove("show");
  });
}

/* =========================================
   INTERSECTION OBSERVER
   ========================================= */
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
  threshold: 0.5
});

/* =========================================
   START OBSERVER
   ========================================= */
const statsSection = document.getElementById("stats");

if (statsSection) {
  observer.observe(statsSection);
}

