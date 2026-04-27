/* =========================================================
   LANDING PAGE 3D PARTICLES (RESPONSIVE)
   ========================================================= */

/* =========================
   DEVICE DETECTION
   ========================= */
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth <= 1024;

/* =========================
   PERFORMANCE SETTINGS
   ========================= */
const particleCount = isMobile ? 8 : isTablet ? 14 : 24;
const depthRange   = isMobile ? 80 : isTablet ? 150 : 260;
const fireSpeed    = isMobile ? 700 : isTablet ? 500 : 350;

/* =========================
   FIREWORK FUNCTION
   ========================= */
function createFirework() {

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.6;

  for (let i = 0; i < particleCount; i++) {

    const fw = document.createElement("div");
    fw.className = "firework";

    fw.style.left = x + "px";
    fw.style.top  = y + "px";

    /* ANGLE + DISTANCE */
    const angle = Math.random() * 2 * Math.PI;
    const distance = 50 + Math.random() * 80;

    const dx = distance * Math.cos(angle);
    const dy = distance * Math.sin(angle);

    fw.style.setProperty("--dx", dx + "px");
    fw.style.setProperty("--dy", dy + "px");

    /* 3D DEPTH */
    const dz = (Math.random() * depthRange - depthRange / 2);
    fw.style.setProperty("--dz", dz + "px");

    document.body.appendChild(fw);

    /* REMOVE PARTICLE */
    setTimeout(() => {
      fw.remove();
    }, 1000);
  }
}

/* =========================
   START ANIMATION
   ========================= */
const fireworkInterval = setInterval(createFirework, fireSpeed);

/* =========================
   CURSOR EFFECT (DESKTOP)
   ========================= */
const cursor = document.getElementById("cursor");

if (!isMobile && cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });
}
  
/* ========================= */
/* PROJECT CLICK LOADER */
/* ========================= */
document.querySelectorAll(".project-card").forEach(card => {

  card.addEventListener("click", function(e) {

    e.preventDefault();

    const link = this.getAttribute("href");
    const loader = document.getElementById("page-loader");

    if (loader) loader.classList.add("active");

    setTimeout(() => {
      window.location.href = link;
    }, 1001);

  });

});

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

        startTypingLoop(); // 🔁 LOOP AGAIN

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

