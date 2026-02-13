const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const actions = document.getElementById("actions");
const footerMsg = document.getElementById("footerMsg");
const heartField = document.querySelector(".heart-field");

const moveNoButton = () => {
  const bounds = actions.getBoundingClientRect();
  const btnBounds = noBtn.getBoundingClientRect();

  const maxX = bounds.width - btnBounds.width;
  const maxY = bounds.height - btnBounds.height;

  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
};

const getDistance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

const handlePointerMove = (event) => {
  const pointerX = event.clientX ?? (event.touches && event.touches[0]?.clientX);
  const pointerY = event.clientY ?? (event.touches && event.touches[0]?.clientY);

  if (pointerX == null || pointerY == null) return;

  const btnBounds = noBtn.getBoundingClientRect();
  const btnCenterX = btnBounds.left + btnBounds.width / 2;
  const btnCenterY = btnBounds.top + btnBounds.height / 2;

  const distance = getDistance(pointerX, pointerY, btnCenterX, btnCenterY);

  if (distance < 120) {
    moveNoButton();
  }
};

const spawnHeart = () => {
  const heart = document.createElement("span");
  heart.className = "floating-heart";

  const startX = Math.random() * window.innerWidth;
  const duration = 6 + Math.random() * 4;
  const size = 12 + Math.random() * 16;

  heart.style.left = `${startX}px`;
  heart.style.bottom = "-20px";
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.animationDuration = `${duration}s`;

  heartField.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
};

let heartTimer = null;

const startHearts = () => {
  if (heartTimer) return;
  heartTimer = setInterval(spawnHeart, 320);
};

const acceptYes = () => {
  footerMsg.textContent = "Yay! Sending love your way. Happy Valentine’s Day!";
  startHearts();
};

const handleNoInteraction = (event) => {
  if (event?.preventDefault) {
    event.preventDefault();
  }
  moveNoButton();
};

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("pointerdown", handleNoInteraction);
noBtn.addEventListener("click", handleNoInteraction);
noBtn.addEventListener("touchstart", handleNoInteraction, { passive: false });

document.addEventListener("mousemove", handlePointerMove);
document.addEventListener("touchmove", handlePointerMove, { passive: true });

yesBtn.addEventListener("click", acceptYes);

startHearts();
