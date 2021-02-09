import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

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

export const dniValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return checkLetter(control.value) ? { nifValidationResult: true } : null;
}