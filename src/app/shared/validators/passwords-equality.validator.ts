import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordsEqualityValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password').value;
  const password2 = control.get('passwordConfirmation').value;
  if (password == null || password == '') return null;
  if (password !== password2) control.get('passwordConfirmation').setErrors({ passwordMismatch: true });
  console.log(password !== password2)
  return password !== password2 ? { passwordMismatch: true } : null;
}