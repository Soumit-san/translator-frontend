import axios from 'axios';
import { TranslationRequest, TranslationResponse, TTSRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const translateText = async (
  request: TranslationRequest
): Promise<TranslationResponse> => {
  try {
    const response = await api.post<TranslationResponse>('/translate', request);
    return response.data;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

export const textToSpeech = async (request: TTSRequest): Promise<string> => {
  try {
    const response = await api.post<Blob>('/tts', request, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Text-to-speech error:', error);
    throw error;
  }
};