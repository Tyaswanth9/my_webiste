/* =========================================
   LANDING PAGE TEXT ANIMATION (FIXED)
   ========================================= */

// GET ELEMENT
const container = document.getElementById("landing-text");

/* CLEAR OLD CONTENT (IMPORTANT FIX) */
container.innerHTML = "";

/* TEXT LINES */
const lines = ["WELCOME", "TO", "MY PORTFOLIO"];

let delayIndex = 0;

/* CREATE TEXT */
lines.forEach(line => {

  const div = document.createElement("div");

  line.split("").forEach(char => {

    const span = document.createElement("span");

    span.innerText = char;

    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(40px)";
    span.style.color = "#ffffff";

    span.style.textShadow =
      "0 0 5px #fff, 0 0 10px #ff4d4d, 0 0 20px #ff1a1a";

    /* ANIMATION */
    span.style.animation = "rise 0.6s ease forwards";
    span.style.animationDelay = (delayIndex * 0.08) + "s";

    div.appendChild(span);

    delayIndex++;
  });

  /* SPACE BETWEEN LINES */
  div.style.marginBottom = "10px";

  container.appendChild(div);
});

/* =========================================
   ADD KEYFRAMES (IMPORTANT)
   ========================================= */
const style = document.createElement("style");

style.innerHTML = `
@keyframes rise {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

document.head.appendChild(style);

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

