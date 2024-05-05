let valueDisplays = document.querySelectorAll(".num");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = -1;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const marquee = document.querySelector(".Marquee");

  marquee.addEventListener("mouseenter", function () {
    // Disable scrolling on the body
    body.style.overflow = "none";
  });

  marquee.addEventListener("mouseleave", function () {
    // Re-enable scrolling on the body
    body.style.overflow = "auto";
  });

  // Function to handle horizontal scrolling when the mouse moves inside the .Marquee
  marquee.addEventListener("mousemove", function (e) {
    // Calculate the distance moved by the mouse
    const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;

    // Adjust the scrollLeft of the .Marquee to scroll horizontally
    marquee.scrollLeft -= movementX;
  });
});

var canvas = document.getElementById("space");
var ctx = canvas.getContext("2d");
var particles = [];

// Set canvas size to cover the whole window
canvas.width = window.innerWidth;
canvas.height = document.body.clientHeight;


function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height; // Use window height for spawn area
  this.vx = Math.random() - 0.5;
  this.vy = Math.random() - 0.5;
  this.size = Math.random() * 2 + 1;
}

Particle.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;

  if (
    this.x < 0 ||
    this.x > canvas.width ||
    this.y < 0 ||
    this.y > canvas.height
  ) {
    // Respawn the particle if it goes out of bounds
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }
};

Particle.prototype.draw = function () {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
};

function createParticles() {
  for (var i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function updateParticles() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}

function loop() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(loop);
}

createParticles();
loop();
