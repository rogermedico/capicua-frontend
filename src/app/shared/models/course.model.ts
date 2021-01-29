export interface Course {
  name: string;
  number: string;
  expeditionDate: Date;
  validUntil: Date;
}

export interface CourseBackend {
  name: string;
  number: string;
  expedition_date: string;
  valid_until: string;
}
