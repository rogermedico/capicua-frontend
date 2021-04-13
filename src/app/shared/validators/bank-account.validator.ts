import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const letterValues = {
  'A': 10,
  'B': 11,
  'C': 12,
  'D': 13,
  'E': 14,
  'F': 15,
  'G': 16,
  'H': 17,
  'I': 18,
  'J': 19,
  'K': 20,
  'L': 21,
  'M': 22,
  'N': 23,
  'O': 24,
  'P': 25,
  'Q': 26,
  'R': 27,
  'S': 28,
  'T': 29,
  'U': 30,
  'V': 31,
  'W': 32,
  'X': 33,
  'Y': 34,
  'Z': 35,
}

function getModule(num: bigint, divisor: bigint): number {
  return Number((num - (divisor * (num / divisor))));
}

function checkBankAccount(bankAccount: string): boolean {

  /* no value, no error */
  if (!bankAccount) return false;

  const iban: string = bankAccount.replace(/\s+/g, '').toUpperCase();

  /* not exactly 24 chars means error */
  if (iban.length != 24) return true;

  let reorderedIban: string = iban.substr(4) + iban.substr(0, 4);
  reorderedIban = reorderedIban.replace(/[A-Z]/g, function (matched) {
    return letterValues[matched];
  });

  return getModule(BigInt(reorderedIban), BigInt(97)) != 1;

}

export const bankAccountValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return checkBankAccount(control.value) ? { bankAccountValidationResult: true } : null;
}