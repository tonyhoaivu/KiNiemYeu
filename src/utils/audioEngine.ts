import { SongTrack } from '../types';

export type SynthPreset = 'pianoLove' | 'starlightLofi' | 'musicBox' | 'moonlight' | 'sunshineLove';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.7;
  private currentPreset: SynthPreset = 'pianoLove';
  private currentTrack: SongTrack | null = null;
  private step: number = 0;
  private audioElement: HTMLAudioElement | null = null;
  private analyserNode: AnalyserNode | null = null;
  private listeners: Set<(isPlaying: boolean, currentTrack: SongTrack | null) => void> = new Set();

  constructor() {
    // Lazy audio context init on user gesture
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;

      this.masterGain.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: (isPlaying: boolean, currentTrack: SongTrack | null) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying, this.currentTrack));
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): SongTrack | null {
    return this.currentTrack;
  }

  // Play a single harmonic note
  private playNote(freq: number, startTime: number, duration: number, type: 'piano' | 'musicbox' | 'lofi' | 'harp' | 'bell') {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    if (type === 'piano') {
      osc.type = 'triangle';
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime);
      gain2.gain.setValueAtTime(0.12, startTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.7);
      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(startTime);
      osc2.stop(startTime + duration);
    } else if (type === 'musicbox') {
      osc.type = 'sine';
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 3, startTime);
      gain2.gain.setValueAtTime(0.08, startTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.5);
      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(startTime);
      osc2.stop(startTime + duration);
    } else if (type === 'harp') {
      osc.type = 'triangle';
    } else if (type === 'bell') {
      osc.type = 'sine';
    } else {
      osc.type = 'sine';
    }

    osc.frequency.setValueAtTime(freq, startTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(type === 'musicbox' ? 3400 : type === 'bell' ? 2800 : 1800, startTime);

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(type === 'musicbox' ? 0.35 : 0.45, startTime + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private scheduleSynthStep() {
    if (!this.isPlaying || !this.ctx) return;

    // Chords variations for presets
    const chordsPiano = [
      { base: 261.63, notes: [261.63, 329.63, 392.00, 523.25, 659.25], bass: 130.81 },
      { base: 196.00, notes: [196.00, 246.94, 293.66, 392.00, 493.88], bass: 98.00 },
      { base: 220.00, notes: [220.00, 261.63, 329.63, 440.00, 523.25], bass: 110.00 },
      { base: 164.81, notes: [164.81, 246.94, 329.63, 392.00, 493.88], bass: 82.41 },
      { base: 174.61, notes: [174.61, 220.00, 261.63, 349.23, 440.00], bass: 87.31 },
      { base: 261.63, notes: [261.63, 329.63, 392.00, 523.25, 587.33], bass: 130.81 },
      { base: 174.61, notes: [174.61, 220.00, 261.63, 349.23, 440.00], bass: 87.31 },
      { base: 196.00, notes: [196.00, 246.94, 293.66, 392.00, 493.88], bass: 98.00 },
    ];

    const chordsMoonlight = [
      { base: 220.00, notes: [220.00, 261.63, 329.63, 440.00, 523.25], bass: 110.00 },
      { base: 174.61, notes: [174.61, 220.00, 261.63, 349.23, 440.00], bass: 87.31 },
      { base: 261.63, notes: [261.63, 329.63, 392.00, 523.25, 659.25], bass: 130.81 },
      { base: 196.00, notes: [196.00, 246.94, 293.66, 392.00, 493.88], bass: 98.00 },
    ];

    const chords = this.currentPreset === 'moonlight' ? chordsMoonlight : chordsPiano;

    const chordIdx = Math.floor(this.step / 4) % chords.length;
    const noteInBar = this.step % 4;
    const currentChord = chords[chordIdx];
    const now = this.ctx.currentTime;

    const instrumentType =
      this.currentPreset === 'musicBox'
        ? 'musicbox'
        : this.currentPreset === 'starlightLofi'
        ? 'lofi'
        : this.currentPreset === 'moonlight'
        ? 'harp'
        : this.currentPreset === 'sunshineLove'
        ? 'bell'
        : 'piano';

    if (noteInBar === 0) {
      this.playNote(currentChord.bass, now, 2.0, instrumentType);
    }

    const melodyIndex = (this.step * 2) % currentChord.notes.length;
    const highNote = currentChord.notes[melodyIndex];
    this.playNote(highNote, now, 1.0, instrumentType);

    setTimeout(() => {
      if (this.isPlaying && this.ctx) {
        const fillIndex = (melodyIndex + 2) % currentChord.notes.length;
        const multiplier = this.currentPreset === 'musicBox' ? 2 : 1;
        this.playNote(currentChord.notes[fillIndex] * multiplier, this.ctx.currentTime, 0.6, instrumentType);
      }
    }, 240);

    this.step++;
    const tempo =
      this.currentPreset === 'musicBox'
        ? 520
        : this.currentPreset === 'starlightLofi'
        ? 620
        : this.currentPreset === 'moonlight'
        ? 660
        : this.currentPreset === 'sunshineLove'
        ? 450
        : 480;

    this.timerId = window.setTimeout(() => this.scheduleSynthStep(), tempo);
  }

  public playPreset(preset: SynthPreset, trackInfo?: SongTrack) {
    this.stopAudioElement();
    this.initCtx();
    this.currentPreset = preset;
    if (trackInfo) {
      this.currentTrack = trackInfo;
    }
    this.isPlaying = true;
    this.step = 0;
    this.scheduleSynthStep();
    this.notify();
  }

  public playTrack(track: SongTrack) {
    this.currentTrack = track;
    if (track.type === 'synth' && track.synthPreset) {
      this.playPreset(track.synthPreset, track);
    } else if (track.audioUrl || track.customDataUrl) {
      this.playAudioSource(track.audioUrl || track.customDataUrl || '', track);
    }
  }

  public playAudioSource(src: string, trackInfo?: SongTrack) {
    this.stopSynth();
    if (trackInfo) {
      this.currentTrack = trackInfo;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.audioElement = new Audio(src);
    this.audioElement.volume = this.volume;
    this.audioElement.loop = true;
    this.audioElement.crossOrigin = 'anonymous';

    this.audioElement.play().catch(e => {
      console.warn('Playback error or policy blocked:', e);
    });
    this.isPlaying = true;
    this.notify();
  }

  public playCustomFile(file: File, title?: string) {
    const url = URL.createObjectURL(file);
    const customTrack: SongTrack = {
      id: `custom-${Date.now()}`,
      title: title || file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Bài hát tải lên',
      type: 'custom',
      audioUrl: url,
      duration: 'Bài riêng',
    };
    this.playAudioSource(url, customTrack);
    return customTrack;
  }

  public togglePlay(defaultTrack?: SongTrack) {
    if (this.isPlaying) {
      this.pause();
    } else {
      if (this.audioElement && this.audioElement.src) {
        this.audioElement.play().catch(() => {});
        this.isPlaying = true;
        this.notify();
      } else if (defaultTrack) {
        this.playTrack(defaultTrack);
      } else {
        this.playPreset('pianoLove');
      }
    }
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynth();
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }

  private stopSynth() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private stopAudioElement() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
  }

  public stop() {
    this.pause();
    this.stopAudioElement();
  }
}

export const romanticAudio = new RomanticAudioEngine();
