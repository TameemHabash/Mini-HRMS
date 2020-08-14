import { Injectable } from '@angular/core';
import { HRUser } from '../models/HRUser.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  HRs: HRUser[] = [
    // here will get the HRs from the HR service
    new HRUser(1, 'rahaf malas', 'rahaf.malas', 'rahaf.malas@gmail.com', 'emptyURL'),
    new HRUser(2, 'tameem habash', 'rahaf.malas', 'rahaf.malas@gmail.com', 'emptyURL'),
    new HRUser(3, 'abdelrahaman al-tamimi', 'rahaf.malas', 'rahaf.malas@gmail.com', 'emptyURL'),
    new HRUser(4, 'jehad adwan', 'rahaf.malas', 'rahaf.malas@gmail.com', 'emptyURL')
  ];
  //set ActiveHR when login and reset it when logout
  ActiveHR: HRUser = this.HRs[0];

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

  getHRs(): HRUser[] {
    return this.HRs.slice();
  }
}
