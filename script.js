function createHeart(backgroundColor, heartColor, text = "black") {
  const heartContainer = document.createElement('div');
  heartContainer.classList.add('heart-container');

  const heart = document.createElement('div');
  heart.classList.add('heart'); // Use a class instead of an id

  const leftSide = document.createElement('div');
  leftSide.classList.add('left');
  const leftInnerDiv = document.createElement('div');
  leftInnerDiv.style.background = heartColor;
  leftSide.appendChild(leftInnerDiv);

  const rightSide = document.createElement('div');
  rightSide.classList.add('right');
  const rightInnerDiv = document.createElement('div');
  rightInnerDiv.style.background = heartColor;
  rightSide.appendChild(rightInnerDiv);

  heart.appendChild(leftSide);
  heart.appendChild(rightSide);

  heartContainer.appendChild(heart);

  const textElement = document.createElement('h1');
  textElement.textContent = "idk what to put here so     hai"; // Set the text content
   textElement.style.color = text; // Set the text color
//   textElement.style.fontSize = '1.5rem'; // Set the font size
//   textElement.style.fontFamily = 'Arial, sans-serif'; // Set the font family
//   textElement.style.right = "50%"
   document.body.style.backgroundColor = backgroundColor;
  heart.appendChild(textElement);

  // Append the heart container to an existing container on your page

  document.body.appendChild(heartContainer);
}
createHeart('#F7E1DF ', '#FF6347  ', "#1D1D1D   " );
setTimeout(() => {
  // Function to calculate the curve for the heart shape
function getcurve(x, max, maxnum, outsidecurve = true) {
  x = (x / max);
  let curve;

  if (outsidecurve)
    curve = Math.cos((x * Math.PI) + Math.PI / 2);
  else
    curve = Math.sin(x * Math.PI);

  return maxnum * curve;
}

// Function to get the rotation angle of an element
function getRotationAngle(element) {
  const style = window.getComputedStyle(element);
  const transform = style.transform || style.webkitTransform;

  if (transform && transform !== 'none') {
    const values = transform.split('(')[1].split(')')[0].split(',');
    const angle = Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
    return (angle < 0 ? angle + 360 : angle);
  } else {
    return 0;
  }
}

// Create 400 heart particles
for (let i = 0; i < 50; i++) {
  let element = document.createElement('div');
  element.classList.add('particle-heart');
  document.body.appendChild(element);
}

// Set up and animate each heart particle
const elements = document.getElementsByClassName('particle-heart');
const elementArray = Array.from(elements);

elementArray.forEach((element) => {
  // Initial setup
  let angle = Math.random() * 360;

  // Using pixel values for center position
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  // Using pixel values for particle size
  let particleSize = 20;
  let speed = 2;

  // Calculate initial position based on particle size
  let left = centerX - particleSize / 2;
  let top = centerY - particleSize / 2;

  let t = -angle * (Math.PI / 180);
  left += (16 * Math.pow(Math.sin(t), 3)) * 5
  top -= (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 5;

  const matrix = new DOMMatrix(getComputedStyle(element).transform);

  // Set the desired X and Y translations
  const translateX = -50; // Using a numeric value, not a string
  const translateY = -50; // Using a numeric value, not a string
  element.style.transformOrigin = 'center';

  // Apply the initial rotation and translation
  matrix.translateSelf(translateX, translateY);
  element.style.transform = matrix.toString();
  let random = Math.random();

  // Animation loop
  let angleChange = 0;
  let angleDirection = (random - 0.5) + 0.4 * ((random - 0.5 > 0) ? 1 : -1);

  setInterval(() => {
    angleChange += 1 * angleDirection;
      angle += angleChange * 0.05+ 0.1*(Math.random()-0.5);
    // Reverse the angle direction when it exceeds a threshold
    if (Math.abs(angleChange) > 40) angleDirection *= -1;

    // Update position
    top -= Math.cos(angle * (Math.PI / 180)) * speed;
    left -= Math.sin(angle * (Math.PI / 180)) * speed;

    // Apply the rotation
    element.style.left = left + "px";
    element.style.top = top + "px";
    element.style.transform = `rotate(${-angle}deg)`;
    element.style.transformOrigin = 'center';

    // Check and remove the element if opacity is 0
    const opacity = parseFloat(getComputedStyle(element).opacity);
    if (opacity === 0) element.remove();

    // Randomly decrease opacity
    if (Math.random() < 0.2) element.style.opacity = opacity - 0.05;

    // Reset angle when it exceeds 359
    if (angle > 359) angle = 0;
  }, 10);
});

// Delay the animation start by 1800 milliseconds


}, 3000);


