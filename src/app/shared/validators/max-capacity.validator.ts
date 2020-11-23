import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const maxCapacityValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const miniumCapacity = control.get('miniumCapacity').value;
  const maxCapacity = control.get('maxCapacity').value;
  if (maxCapacity == null || maxCapacity == '') return null;
  return miniumCapacity > maxCapacity ? { maxCapacityValidationResult: true } : null;
}