import { useState, useEffect, useCallback } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import 'lamejs';

// Ensure Lame is available globally
declare global {
  interface Window {
    Lame: any;
  }
}

interface AudioRecorderState {
  isRecording: boolean;
  isBlocked: boolean;
  audioURL: string | null;
  audioFile: File | null;
  recorder: MicRecorder | null;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isBlocked: false,
    audioURL: null,
    audioFile: null,
    recorder: null,
  });

  useEffect(() => {
    // Initialize recorder
    const recorder = new MicRecorder({ bitRate: 128 });
    setState((prev) => ({ ...prev, recorder }));

    // Check for microphone permission
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setState((prev) => ({ ...prev, isBlocked: false }));
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isBlocked: true }));
      });

    // Clean up
    return () => {
      if (state.audioURL) {
        URL.revokeObjectURL(state.audioURL);
      }
    };
  }, []);

  const startRecording = useCallback(() => {
    if (state.recorder && !state.isBlocked) {
      state.recorder
        .start()
        .then(() => {
          setState((prev) => ({ ...prev, isRecording: true }));
        })
        .catch((error: Error) => {
          console.error('Error starting recording:', error);
        });
    }
  }, [state.recorder, state.isBlocked]);

  const stopRecording = useCallback(() => {
    if (state.recorder && state.isRecording) {
      state.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]: [Buffer[], Blob]) => {
          const audioFile = new File(buffer, 'recording.mp3', {
            type: blob.type,
            lastModified: Date.now(),
          });
          const audioURL = URL.createObjectURL(blob);
          setState((prev) => ({
            ...prev,
            isRecording: false,
            audioURL,
            audioFile,
          }));
        })
        .catch((error: Error) => {
          console.error('Error stopping recording:', error);
        });
    }
  }, [state.recorder, state.isRecording]);

  const clearRecording = useCallback(() => {
    if (state.audioURL) {
      URL.revokeObjectURL(state.audioURL);
      setState((prev) => ({
        ...prev,
        audioURL: null,
        audioFile: null,
      }));
    }
  }, [state.audioURL]);

  return {
    isRecording: state.isRecording,
    isBlocked: state.isBlocked,
    audioURL: state.audioURL,
    audioFile: state.audioFile,
    startRecording,
    stopRecording,
    clearRecording,
  };
};