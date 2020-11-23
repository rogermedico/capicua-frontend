import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

function checkLetter(nif: string): boolean {
  const letter: string = nif.slice(-1);
  const number: number = parseInt(nif.slice(0, nif.length - 1));

  /* no number means nif validation error, so error = true */
  if (number == NaN) return true;

  /* nif test passed means no error, so error = false */
  if ("TRWAGMYFPDXBNJZSQVHLCKE".charAt(number % 23) == letter.toUpperCase()) return false;

  /* nif test failed means nif validation error, so error = true */
  else return true;
}

export const nifValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const nationality = control.get('nationality').value;
  if (nationality != 'ES') return null;
  const nif = control.get('nif').value;
  if (nif == null || nif == '') return null;
  return checkLetter(nif) ? { nifValidationResult: true } : null;
}