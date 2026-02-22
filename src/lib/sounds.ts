const ctx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

export function playPop() {
  try {
    const a = ctx();
    const o = a.createOscillator();
    const g = a.createGain();
    o.connect(g);
    g.connect(a.destination);
    o.frequency.setValueAtTime(587, a.currentTime);
    o.frequency.exponentialRampToValueAtTime(880, a.currentTime + 0.08);
    g.gain.setValueAtTime(0.3, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, a.currentTime + 0.15);
    o.start(a.currentTime);
    o.stop(a.currentTime + 0.15);
  } catch {}
}

export function playBigWin() {
  try {
    const a = ctx();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const o = a.createOscillator();
      const g = a.createGain();
      o.connect(g);
      g.connect(a.destination);
      o.frequency.setValueAtTime(freq, a.currentTime + i * 0.1);
      g.gain.setValueAtTime(0.25, a.currentTime + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.01, a.currentTime + i * 0.1 + 0.2);
      o.start(a.currentTime + i * 0.1);
      o.stop(a.currentTime + i * 0.1 + 0.2);
    });
  } catch {}
}
