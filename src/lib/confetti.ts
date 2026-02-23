import confetti from "canvas-confetti";

export function fireConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#6C5CE7", "#00B894", "#FDCB6E", "#E17055", "#74B9FF"],
  });
}

export function fireBigConfetti() {
  const end = Date.now() + 1500;
  const colors = ["#6C5CE7", "#00B894", "#FDCB6E", "#E17055", "#74B9FF", "#FFD700"];
  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.6 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

/** Massive legendary celebration — screen-filling confetti storm */
export function fireEpicConfetti() {
  const colors = ["#FFD700", "#FFA500", "#FF4500", "#6C5CE7", "#00B894", "#E17055", "#FF69B4"];
  // Initial burst from center
  confetti({
    particleCount: 150,
    spread: 360,
    origin: { x: 0.5, y: 0.4 },
    colors,
    startVelocity: 45,
    gravity: 0.8,
    ticks: 300,
  });
  // Continuous side cannons
  const end = Date.now() + 3000;
  const frame = () => {
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.5 },
      colors,
      startVelocity: 35,
    });
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.5 },
      colors,
      startVelocity: 35,
    });
    confetti({
      particleCount: 4,
      angle: 90,
      spread: 120,
      origin: { x: 0.5, y: 0 },
      colors,
      startVelocity: 25,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
