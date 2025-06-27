export interface TranslationRequest {
  text: string;
  source_lang: string;
  target_lang: string;
}

export interface TranslationResponse {
  translated_text: string;
  source_lang: string;
  target_lang: string;
}

export interface TTSRequest {
  text: string;
  lang: string;
}

export interface Language {
  code: string;
  name: string;
}