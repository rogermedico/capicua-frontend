export interface Education {
  id: number;
  name: string;
  finishDate: Date;
  finished: boolean;
}

export interface EducationBackend {
  id: number;
  user_id: number;
  name: string;
  finish_date: string;
  finished: boolean;
}

export interface EducationBackendSent {
  id: number;
  user_id: number;
  name: string;
  finish_date: string;
  finished: boolean;
}
