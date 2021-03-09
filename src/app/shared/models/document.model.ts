import { SafeResourceUrl } from "@angular/platform-browser";
import { USER_DOCUMENTS } from "@constants/documents.constant";

export interface UserDocument {
  name: USER_DOCUMENTS,
  file: SafeResourceUrl | boolean;
}