// TEXT ANIMATION
const lines = ["WELCOME", "TO", "MY PORTFOLIO"];
const container = document.getElementById("landing-text");

let index = 0;

lines.forEach(line => {
  const div = document.createElement("div");

  line.split("").forEach(char => {
    const span = document.createElement("span");

    span.innerText = char;
    span.style.opacity = 0;
    span.style.transform = "translateY(50px)";
    span.style.animation = "rise 0.7s forwards";
    span.style.animationDelay = (index * 0.1) + "s";

    div.appendChild(span);
    index++;
  });

  container.appendChild(div);
});

// REDIRECT
setTimeout(() => {
  document.getElementById("landing-page").style.display = "none";
}, 3000);