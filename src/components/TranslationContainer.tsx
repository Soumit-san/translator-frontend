import React, { useState, useRef } from 'react';
import { ArrowRightLeft, Loader, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import AudioControls from './AudioControls';
import { translateText, textToSpeech } from '../services/api';

const TranslationContainer: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTTSLoading, setIsTTSLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    try {
      setIsTranslating(true);
      const response = await translateText({
        text: sourceText,
        source_lang: sourceLang,
        target_lang: targetLang,
      });
      setTranslatedText(response.translated_text);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!translatedText.trim()) return;

    try {
      setIsTTSLoading(true);
      const audioUrl = await textToSpeech({
        text: translatedText,
        lang: targetLang,
      });
      setAudioSrc(audioUrl);
      
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
    } finally {
      setIsTTSLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-12 bg-white rounded-3xl shadow-xl"
    >
      <div className="flex flex-col space-y-12">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between space-x-8">
              <LanguageSelector
                value={sourceLang}
                onChange={setSourceLang}
                label="Source Language"
                id="source-lang"
                excludeLanguage={targetLang}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapLanguages}
                className="mt-8 p-4 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Swap languages"
              >
                <ArrowRightLeft style={{ width: '1.75rem', height: '1.75rem' }} />
              </motion.button>
              <LanguageSelector
                value={targetLang}
                onChange={setTargetLang}
                label="Target Language"
                id="target-lang"
                excludeLanguage={sourceLang}
              />
            </div>
            
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-64 p-6 text-xl border rounded-2xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <div className="absolute bottom-4 right-4 text-base text-gray-500">
                {sourceText.length} / 5000
              </div>
            </div>
            
            <div className="flex space-x-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTranslate}
                disabled={isTranslating || !sourceText.trim()}
                className="flex-1 flex items-center justify-center px-10 py-4 bg-indigo-600 text-white text-xl rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {isTranslating ? (
                  <>
                    <Loader className="animate-spin" style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.75rem' }} />
                    <span>Translating...</span>
                  </>
                ) : (
                  <span>Translate</span>
                )}
              </motion.button>
              
              <AudioControls 
                onTextToSpeech={handleTextToSpeech}
                disabled={isTranslating}
                isTextToSpeechLoading={isTTSLoading}
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="h-[72px]"></div>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={translatedText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-64 p-6 border rounded-2xl bg-gray-50 overflow-auto relative"
                >
                  {translatedText ? (
                    <p className="text-xl text-gray-800">{translatedText}</p>
                  ) : (
                    <p className="text-xl text-gray-400 italic">Translation will appear here</p>
                  )}
                  {translatedText && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 p-3 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {copied ? <Check size={28} /> : <Copy size={28} />}
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <audio ref={audioRef} className="hidden">
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </motion.div>
  );
};

export default TranslationContainer;