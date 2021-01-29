import { LANGUAGE_NAMES, LANGUAGE_LEVELS } from '@constants/language.constant';

export interface Language {
  name: LANGUAGE_NAMES;
  level: LANGUAGE_LEVELS;
  finishDate: Date;
}

export interface LanguageBackend {
  name: string;
  level: string;
  finish_date: string;
}