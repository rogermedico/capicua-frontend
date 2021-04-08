import { HomeDocument, HomeDocumentBackend } from "./document.model";

export interface HomePost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  documents: HomeDocument[];
}

export interface HomePostBackend {
  id: number;
  title: string;
  body: string;
  created_at: string;
  documents: HomeDocumentBackend[];
}