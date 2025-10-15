import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../contexts/sound-context';

export default function SoundToggle() {
  const { soundEnabled, toggleSound, playClickSound } = useSound();

  const handleToggle = () => {
    toggleSound();
    if (!soundEnabled) {
      // Play sound when enabling (with a small delay to allow state update)
      setTimeout(() => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = 1200;
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.05);
        } catch (error) {
          console.error('Error playing toggle sound:', error);
        }
      }, 100);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-700 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={soundEnabled ? 'Sound On - Click to mute' : 'Sound Off - Click to enable'}
      aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      <AnimatePresence mode="wait">
        {soundEnabled ? (
          <motion.div
            key="sound-on"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <i className="fas fa-volume-up text-accent text-xl" />
          </motion.div>
        ) : (
          <motion.div
            key="sound-off"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <i className="fas fa-volume-mute text-gray-400 text-xl" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulse effect when enabled */}
      {soundEnabled && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  );
}
