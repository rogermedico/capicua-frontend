import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

function checkDrivingLicences(drivingLicences: string): boolean {

  /* no value, no error */
  if (!drivingLicences) return false;

  const drivingLicencesArr: string[] = drivingLicences.replace(/\s/g, '').split(',').filter(Boolean);

  const someFailure = drivingLicencesArr.find(drivingLicence => {
    if (!drivingLicence.match(/([ABCDE][M12]?){1}/g)) return true;
  })

  if (someFailure) return true;
  else return false;
}

export const drivingLicencesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return checkDrivingLicences(control.value) ? { drivingLicencesValidationResult: true } : null;
}