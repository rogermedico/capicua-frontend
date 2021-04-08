import { USER_DOCUMENTS } from "@constants/user-documents.constant";

export interface UserDocument {
  name: USER_DOCUMENTS;
  file: string | boolean;
}

export interface PersonalDocument {
  id: number;
  userId: number;
  name: string;
  file: string;
  createdAt: Date;
}

export interface PersonalDocumentBackend {
  id: number;
  user_id: number;
  original_name: string;
  created_at: string;
}

export interface HomeDocument {
  id: number;
  homePostId: number;
  name: string;
  file: string;
  createdAt: Date;
}

export interface HomeDocumentBackend {
  id: number;
  home_post_id: number;
  original_name: string;
  created_at: string;
}