import React from 'react';
import { Volume2, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioControlsProps {
  onTextToSpeech: () => void;
  disabled: boolean;
  isTextToSpeechLoading: boolean;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onTextToSpeech,
  disabled,
  isTextToSpeechLoading,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTextToSpeech}
      disabled={isTextToSpeechLoading || disabled}
      className="flex items-center justify-center px-10 py-4 bg-purple-600 text-white text-xl rounded-xl hover:bg-purple-700 transition-colors"
    >
      {isTextToSpeechLoading ? (
        <Loader className="animate-spin" style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.75rem' }} />
      ) : (
        <>
          <Volume2 style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.75rem' }} />
          <span>Speak</span>
        </>
      )}
    </motion.button>
  );
};

export default AudioControls;