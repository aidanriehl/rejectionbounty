const ctx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

/** Achievement unlocked / level-up chime */
export function playPop() {
  try {
    const a = ctx();
    const t = a.currentTime;
    // Three-note rising chime (C6 → E6 → G6)
    const notes = [1047, 1319, 1568];
    notes.forEach((freq, i) => {
      const o = a.createOscillator();
      const o2 = a.createOscillator();
      const g = a.createGain();
      o.type = "sine";
      o2.type = "triangle";
      o2.detune.value = 5; // slight chorus
      o.connect(g);
      o2.connect(g);
      g.connect(a.destination);
      const start = t + i * 0.1;
      o.frequency.setValueAtTime(freq, start);
      o2.frequency.setValueAtTime(freq * 1.5, start);
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.18, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.005, start + 0.25);
      o.start(start);
      o2.start(start);
      o.stop(start + 0.25);
      o2.stop(start + 0.25);
    });
  } catch {}
}

/** Confetti burst / accomplishment fanfare */
export function playBigWin() {
  try {
    const a = ctx();
    const t = a.currentTime;
    // Triumphant arpeggio: C5 → E5 → G5 → C6 → E6 → G6, then sustained chord
    const arp = [523, 659, 784, 1047, 1319, 1568];
    arp.forEach((freq, i) => {
      const o = a.createOscillator();
      const o2 = a.createOscillator();
      const g = a.createGain();
      o.type = "sine";
      o2.type = "triangle";
      o2.detune.value = 7;
      o.connect(g);
      o2.connect(g);
      g.connect(a.destination);
      const start = t + i * 0.08;
      o.frequency.setValueAtTime(freq, start);
      o2.frequency.setValueAtTime(freq * 1.5, start);
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.14, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.01, start + 0.35);
      o.start(start);
      o2.start(start);
      o.stop(start + 0.35);
      o2.stop(start + 0.35);
    });

    // Final sustained major chord (C5+E5+G5) with shimmer
    const chord = [523, 659, 784];
    const chordStart = t + arp.length * 0.08;
    chord.forEach((freq) => {
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = "sine";
      o.detune.value = Math.random() * 6 - 3;
      o.connect(g);
      g.connect(a.destination);
      o.frequency.setValueAtTime(freq, chordStart);
      g.gain.setValueAtTime(0, chordStart);
      g.gain.linearRampToValueAtTime(0.1, chordStart + 0.05);
      g.gain.exponentialRampToValueAtTime(0.005, chordStart + 0.6);
      o.start(chordStart);
      o.stop(chordStart + 0.6);
    });
  } catch {}
}
