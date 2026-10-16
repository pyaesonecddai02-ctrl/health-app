// Pure Web Audio API Nature Sound Generator
// 100% offline, zero external file dependencies, ultra lightweight

class NatureSoundEngine {
  constructor() {
    this.ctx = null;
    this.currentSound = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.noiseNode = null;
    this.filterNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate pink/brown soothing noise buffer
  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration for softer, organic sound
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  play(type = 'forest', volume = 0.25) {
    this.init();
    this.stop();

    const buffer = this.createNoiseBuffer();
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    this.filterNode = this.ctx.createBiquadFilter();
    this.gainNode = this.ctx.createGain();

    if (type === 'rain') {
      // Gentle rainfall sound
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(volume * 0.7, this.ctx.currentTime);
    } else if (type === 'waves') {
      // Ocean surf modulation
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(350, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.8, this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(volume * 0.8, this.ctx.currentTime);

      // LFO for surf swelling
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // wave every 8 seconds
      lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);
      lfo.start();
    } else {
      // Forest Breeze & Leaves
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.gainNode.gain.setValueAtTime(volume * 0.6, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);
      lfo.start();
    }

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.noiseNode.start(0);
    this.isPlaying = true;
    this.currentSound = type;
  }

  // Play harmonious Tibetan singing bowl chime on goal achievement
  playChime() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // 528 Hz - Solfeggio frequency for healing & vitality

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.3);
    } catch {
      // ignore
    }
  }

  setVolume(volume) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  stop() {
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // already stopped
      }
      this.noiseNode = null;
    }
    this.isPlaying = false;
    this.currentSound = null;
  }
}

export const soundEngine = new NatureSoundEngine();
