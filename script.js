let valueDisplays = document.querySelectorAll(".num");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = -1;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue +=1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector('body');
  const marquee = document.querySelector('.Marquee');

  marquee.addEventListener('mouseenter', function() {
    // Disable scrolling on the body
    body.style.overflow = 'none';
  });

  marquee.addEventListener('mouseleave', function() {
    // Re-enable scrolling on the body
    body.style.overflow = 'auto';
  });

  // Function to handle horizontal scrolling when the mouse moves inside the .Marquee
  marquee.addEventListener('mousemove', function(e) {
    // Calculate the distance moved by the mouse
    const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    
    // Adjust the scrollLeft of the .Marquee to scroll horizontally
    marquee.scrollLeft -= movementX;
  });
});
