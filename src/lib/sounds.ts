const ctx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

export function playPop() {
  try {
    const a = ctx();
    // Bright "ding" — short, sparkly, matches confetti energy
    const o = a.createOscillator();
    const o2 = a.createOscillator();
    const g = a.createGain();
    o.type = "triangle";
    o2.type = "sine";
    o.connect(g);
    o2.connect(g);
    g.connect(a.destination);
    o.frequency.setValueAtTime(1200, a.currentTime);
    o.frequency.exponentialRampToValueAtTime(1800, a.currentTime + 0.06);
    o2.frequency.setValueAtTime(2400, a.currentTime);
    o2.frequency.exponentialRampToValueAtTime(3200, a.currentTime + 0.04);
    g.gain.setValueAtTime(0.18, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, a.currentTime + 0.12);
    o.start(a.currentTime);
    o2.start(a.currentTime);
    o.stop(a.currentTime + 0.12);
    o2.stop(a.currentTime + 0.12);
  } catch {}
}

export function playBigWin() {
  try {
    const a = ctx();
    const notes = [784, 988, 1175, 1568];
    notes.forEach((freq, i) => {
      const o = a.createOscillator();
      const o2 = a.createOscillator();
      const g = a.createGain();
      o.type = "triangle";
      o2.type = "sine";
      o.connect(g);
      o2.connect(g);
      g.connect(a.destination);
      const t = a.currentTime + i * 0.09;
      o.frequency.setValueAtTime(freq, t);
      o2.frequency.setValueAtTime(freq * 2, t);
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      o.start(t);
      o2.start(t);
      o.stop(t + 0.18);
      o2.stop(t + 0.18);
    });
  } catch {}
}
