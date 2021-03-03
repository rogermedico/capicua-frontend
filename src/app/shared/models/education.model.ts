export interface Education {
  id?: number;
  name: string;
  finishDate: Date;
  finished: boolean;
}

export interface EducationBackend {
  id: number;
  name: string;
  finish_date: string;
  finished: boolean;
}

export interface EducationBackendSent {
  id: number;
  name: string;
  finish_date: string;
  finished: boolean;
}
