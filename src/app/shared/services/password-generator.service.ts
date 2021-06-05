import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {

  private lowerCharacters: string = 'abcdefghijklmnopqrstuvwxyz';
  private upperCharacters: string = 'ABCDEFGHIJKLMNOPWRSTUVWXYZ';
  private numbers: string = '0123456789';
  private symbols: string = '!@#$%&*?';

  constructor() { }

  generate(length: number = 12, useUpper: boolean = true, useNumbers: boolean = true, useSymbols: boolean = true) {

    const dictionary: string[] = [].concat(
      this.lowerCharacters.split(''),
      useUpper ? this.upperCharacters.split('') : [],
      useNumbers ? this.numbers.split('') : [],
      useSymbols ? this.symbols.split('') : []
    );

    let password: string = '';

    for (let i = 0; i < length; i++) {
      password += dictionary[Math.floor(Math.random() * dictionary.length)];
    }

    //shuffle!
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }
}
