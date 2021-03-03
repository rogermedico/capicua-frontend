import { LANGUAGE_NAMES, LANGUAGE_LEVELS } from '@constants/language.constant';

export interface Language {
  id?: number;
  name: LANGUAGE_NAMES;
  level: LANGUAGE_LEVELS;
  finishDate: Date;
}

export interface LanguageBackend {
  id: number;
  name: string;
  level: string;
  finish_date: string;
}

export interface LanguageBackendSent {
  id: number;
  user_id: number;
  name: string;
  level: string;
  finish_date: string;
}