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

});

var canvas = document.getElementById("space");
var ctx = canvas.getContext("2d");
var particles = [];

// Set canvas size to cover the whole window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
  ctx.fillStyle = "#f545ffff";
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

function alert(){
  document.getElementById("overlay").style.display = "block";
}


document.addEventListener('DOMContentLoaded', () => {
  const token = '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'; // Replace with your GitHub token

  const daysOfWeek = document.getElementById('days-of-week');
  const calendarGrid = document.getElementById('calendar-grid');

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let currentDate = new Date();

  function fetchGitHubContributions() {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();
      
      const query = `
      {
          viewer {
              contributionsCollection {
                  contributionCalendar {
                      weeks {
                          contributionDays {
                              date
                              contributionCount
                          }
                      }
                  }
              }
          }
      }`;

      return fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
      }).then(response => response.json());
  }

  function renderCalendar(contributions) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

      // Clear previous content
      daysOfWeek.innerHTML = '';
      calendarGrid.innerHTML = '';

      // Render days of the week
      dayNames.forEach(day => {
          const dayElement = document.createElement('div');
          dayElement.className = 'day-of-week';
          dayElement.textContent = day;
          daysOfWeek.appendChild(dayElement);
      });

      // Add empty cells for the days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
          const emptyCell = document.createElement('div');
          emptyCell.className = 'date-cell';
          calendarGrid.appendChild(emptyCell);
      }

      // Add cells for each day of the month with contribution levels
      const contributionsMap = new Map(contributions.map(c => [new Date(c.date).getDate(), c.contributionCount]));
      for (let day = 1; day <= lastDateOfMonth; day++) {
          const dateCell = document.createElement('div');
          dateCell.className = 'date-cell';
          dateCell.textContent = day;

          // Set contribution level based on fetched data
          const contributionCount = contributionsMap.get(day) || 0;
          const level = getContributionLevel(contributionCount);
          dateCell.classList.add(level);

          calendarGrid.appendChild(dateCell);
      }
  }

  function getContributionLevel(count) {
    if (count >= 12) return 'very-high';  // For the darkest green
    if (count >= 8) return 'high';        // For the dark green
    if (count >= 1) return 'medium';      // For the light green
    return 'low';                         // For the lightest gray
}


  function updateCalendar() {
      fetchGitHubContributions().then(data => {
          if (data.data) {
              const contributions = data.data.viewer.contributionsCollection.contributionCalendar.weeks.flatMap(week => week.contributionDays);
              const filteredContributions = contributions.filter(c => {
                  const contributionDate = new Date(c.date);
                  return contributionDate.getFullYear() === currentDate.getFullYear() &&
                         contributionDate.getMonth() === currentDate.getMonth();
              });
              renderCalendar(filteredContributions);
          } else {
              console.error('No contribution data found');
          }
      }).catch(error => console.error('Error fetching data:', error));
  }

  // Initial render
  updateCalendar();
});
