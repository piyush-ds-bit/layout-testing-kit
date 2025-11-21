// Sound effects utility for pipeline animation
class SoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Whoosh sound when data flows
  playFlow() {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Ping sound when reaching a step
  playReceive() {
    this.playTone(800, 0.1, 'sine', 0.08);
  }

  // Processing sound (subtle beep)
  playProcess() {
    this.playTone(400, 0.15, 'triangle', 0.06);
  }

  // Success ding on completion
  playComplete() {
    if (!this.enabled || !this.audioContext) return;
    
    // Two-tone success sound
    setTimeout(() => this.playTone(600, 0.1, 'sine', 0.08), 0);
    setTimeout(() => this.playTone(800, 0.15, 'sine', 0.08), 100);
  }

  // Final success when entire pipeline completes
  playSuccess() {
    if (!this.enabled || !this.audioContext) return;
    
    // Ascending chord
    setTimeout(() => this.playTone(523, 0.2, 'sine', 0.06), 0);    // C
    setTimeout(() => this.playTone(659, 0.2, 'sine', 0.06), 100);  // E
    setTimeout(() => this.playTone(784, 0.3, 'sine', 0.06), 200);  // G
  }
}

export const soundEffects = new SoundEffects();
