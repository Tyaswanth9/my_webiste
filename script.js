/* ========================= */
/* DEVICE DETECTION */
/* ========================= */
const isMobile = window.innerWidth <= 768;

/* ========================= */
/* GET ELEMENTS */
/* ========================= */
const container = document.getElementById("landing-text");
const cursor = document.getElementById("cursor");
const overlay = document.getElementById("overlay");
const landingPage = document.getElementById("landing-page");

/* ========================= */
/* LETTER ANIMATION */
/* ========================= */
if (container) {
  const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
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
      span.style.animationDelay = (index * (isMobile ? 0.05 : 0.1)) + "s";

      div.appendChild(span);
      index++;
    });

    container.appendChild(div);
  });
}

/* ========================= */
/* ADD KEYFRAMES */
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
/* FIREWORK FUNCTION */
/* ========================= */
function createFirework() {
  const count = isMobile ? 8 : 15 + Math.floor(Math.random() * 10);

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

    setTimeout(() => fw.remove(), 1000);
  }
}

/* START FIREWORK */
const fireworkInterval = setInterval(
  createFirework,
  isMobile ? 800 : 400
);

/* ========================= */
/* CURSOR GLOW */
/* ========================= */
if (!isMobile && cursor) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

/* ========================= */
/* LANDING EXIT */
/* ========================= */
setTimeout(() => {

  clearInterval(fireworkInterval);

  if (overlay) overlay.style.opacity = 1;

  setTimeout(() => {
    if (landingPage) {
      landingPage.style.display = "none";
    }
  }, isMobile ? 500 : 800);

}, isMobile ? 2000 : 3000);

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
/* =========================================
   COUNTER + SCROLL ANIMATION (IMPROVED)
   ========================================= */
/* =========================================
   COUNTER + SCROLL ANIMATION
   ========================================= */

const counters = document.querySelectorAll(".counter");
const boxes = document.querySelectorAll(".stat-box");

let started = false;

/* INTERSECTION OBSERVER (TRIGGER ON SCROLL) */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !started) {

      started = true;

      // SHOW ANIMATION
      boxes.forEach((box, i) => {
        setTimeout(() => {
          box.classList.add("show");
        }, i * 200);
      });

      // START COUNTING
      counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");
        const speed = +counter.getAttribute("data-speed");

        let count = 0;

        const update = () => {
          const increment = target / speed;

          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(update, 30);
          } else {

            // FINAL FORMAT
            counter.innerText = target + "+";
          }
        };

        update();
      });

    }
  });
}, { threshold: 0.5 });

/* OBSERVE SECTION */
observer.observe(document.getElementById("stats"));
