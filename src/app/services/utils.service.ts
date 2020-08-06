import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  generateAlphabeticString(stringLength: number = 5): string {
    if (stringLength < 2) throw new Error(`the random string 'of lenght: ${stringLength}'    must be at least a long of 2 charachters`);
    let randomString = '';
    let randomAscii = null;
    const asciiLow = 65;
    const asciiHigh = 90;
    for (let i = 0; i < stringLength; i++) {
      randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
      randomString += String.fromCharCode(randomAscii);
    }
    return randomString;
  }
  isArrayHasItems(array: Array<any>): boolean {
    return Array.isArray(array) && array.length > 0;
  }
  generateRandomNumber(numberLenght = 3): number {
    return +(Math.floor(Math.random() * 999999999999).toString().substring(0, numberLenght));
  }
}
