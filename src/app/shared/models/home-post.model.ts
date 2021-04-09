import { HomeDocument, HomeDocumentBackend } from "./document.model";

export interface HomePost {
  id: number;
  title: string;
  body: string;
  position: number;
  createdAt: Date;
  documents: HomeDocument[];
}

export interface HomePostBackend {
  id: number;
  title: string;
  body: string;
  position: number;
  created_at: string;
  documents: HomeDocumentBackend[];
}

export interface HomePostSend {
  title: string;
  body: string;
}