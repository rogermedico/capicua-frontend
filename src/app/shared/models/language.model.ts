import { LANGUAGES, LANGUAGE_LEVELS } from '@constants/language.constant';

export interface Language {
  name: LANGUAGES;
  level: LANGUAGE_LEVELS;
  finishDate?: string;
}
