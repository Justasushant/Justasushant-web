import { createContext, useContext, useState, ReactNode } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playHoverSound = () => {
    if (!soundEnabled) return;
    
    try {
      // Generate smooth, warm hover sound with harmonics
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create two oscillators for richer sound
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      // Low-pass filter for warmth
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      filter.Q.value = 1;
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Deep, warm tones (musical interval - perfect fifth)
      osc1.frequency.value = 220; // A3
      osc2.frequency.value = 330; // E4
      osc1.type = 'sine';
      osc2.type = 'sine';
      
      // Smooth fade in and out
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
      
      osc1.start(audioContext.currentTime);
      osc2.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + 0.15);
      osc2.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.error('Error playing hover sound:', error);
    }
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    
    try {
      // Generate sophisticated click sound with layered tones
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Bass thump for body
      const bassOsc = audioContext.createOscillator();
      const bassGain = audioContext.createGain();
      bassOsc.connect(bassGain);
      bassGain.connect(audioContext.destination);
      bassOsc.frequency.value = 80;
      bassOsc.type = 'sine';
      bassGain.gain.setValueAtTime(0.15, audioContext.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
      
      // Mid tone for clarity
      const midOsc = audioContext.createOscillator();
      const midGain = audioContext.createGain();
      midOsc.connect(midGain);
      midGain.connect(audioContext.destination);
      midOsc.frequency.value = 440; // A4
      midOsc.type = 'triangle';
      midGain.gain.setValueAtTime(0.08, audioContext.currentTime);
      midGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.06);
      
      // High transient for definition
      const highOsc = audioContext.createOscillator();
      const highGain = audioContext.createGain();
      const highFilter = audioContext.createBiquadFilter();
      highFilter.type = 'highpass';
      highFilter.frequency.value = 1000;
      highOsc.connect(highFilter);
      highFilter.connect(highGain);
      highGain.connect(audioContext.destination);
      highOsc.frequency.value = 2200;
      highOsc.type = 'sine';
      highGain.gain.setValueAtTime(0.03, audioContext.currentTime);
      highGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);
      
      // Start all oscillators
      bassOsc.start(audioContext.currentTime);
      midOsc.start(audioContext.currentTime);
      highOsc.start(audioContext.currentTime);
      
      bassOsc.stop(audioContext.currentTime + 0.08);
      midOsc.stop(audioContext.currentTime + 0.06);
      highOsc.stop(audioContext.currentTime + 0.03);
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playHoverSound, playClickSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
