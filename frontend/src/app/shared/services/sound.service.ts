import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audioContext: AudioContext | null = null;

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('⚠️ Web Audio API not supported:', error);
    }
  }

  playGreatResetSound(type: 'reset_only' | 'reset_and_optimize'): void {
    if (!this.audioContext) {
      console.warn('⚠️ Audio context not available');
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      if (type === 'reset_and_optimize') {
        this.playRefreshSound(oscillator, gainNode);
      } else {
        this.playClearSound(oscillator, gainNode);
      }
    } catch (error) {
      console.error('❌ Error playing sound:', error);
    }
  }

  private playClearSound(oscillator: OscillatorNode, gainNode: GainNode): void {
    oscillator.frequency.setValueAtTime(440, this.audioContext!.currentTime); // A4 note
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext!.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.5);

    oscillator.start(this.audioContext!.currentTime);
    oscillator.stop(this.audioContext!.currentTime + 0.5);
  }

  private playRefreshSound(oscillator: OscillatorNode, gainNode: GainNode): void {
    const frequencies = [523.25, 659.25, 783.99];

    frequencies.forEach((freq, index) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();

      osc.connect(gain);
      gain.connect(this.audioContext!.destination);

      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime + index * 0.1);
      osc.type = 'sine';

      gain.gain.setValueAtTime(0.2, this.audioContext!.currentTime + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext!.currentTime + index * 0.1 + 0.8
      );

      osc.start(this.audioContext!.currentTime + index * 0.1);
      osc.stop(this.audioContext!.currentTime + index * 0.1 + 0.8);
    });
  }
}
