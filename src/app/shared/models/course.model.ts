export interface Course {
  id: number;
  name: string;
  number: string;
  expeditionDate: Date;
  validUntil: Date;
}

export interface CourseBackend {
  id: number;
  name: string;
  number: string;
  expedition_date: string;
  valid_until: string;
}

export interface CourseBackendSent {
  user_id: number;
  course_id: number;
  number: string;
  expedition_date: string;
  valid_until: string;
}

export interface CourseType {
  id: number,
  name: string
}