import { Injectable } from '@angular/core';
import { HRUser } from '../../models/HRUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private _HRs: HRUser[] = [
    // here will get the HRs from the HR service
    new HRUser(1, 'rahaf malas', 'a1', 'rahaf.malas@gmail.com', '../../assets/imgs/HRImgs/rahaf.jpg'),
    new HRUser(2, 'tameem habash', 'a12', 'tameem.habash@gmail.com', '../../assets/imgs/HRImgs/tameem.jpg'),
    new HRUser(3, 'abdelrahaman tamimi', 'a123', 'abdelrahaman.altamimi@gmail.com', '../../assets/imgs/HRImgs/abd.jpg'),
    new HRUser(4, 'jehad adwan', 'a1234', 'jehad.adwan@gmail.com', '../../assets/imgs/HRImgs/jehad.jpg')
  ];
  //set ActiveHR when login and reset it when logout
  private _activeHR: HRUser = this._HRs[1];

  constructor(private _router: Router) { }
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
  isArrayHasItems(array: any): boolean {
    return Array.isArray(array) && array.length > 0;
  }
  generateRandomNumber(numberLenght = 3): number {
    return +(Math.floor(Math.random() * 999999999999).toString().substring(0, numberLenght));
  }

  getHRs(): HRUser[] {
    return this._HRs.slice();
  }
  getActiveHR(): HRUser {
    return this._activeHR;
  }

  setActiveHR(activeHR: HRUser) {
    this._activeHR = activeHR;
  }

  login(username: string, password: string): boolean {
    const HR = this._HRs.find((hr) => hr.userName.toLowerCase() === username.toLowerCase());
    if (HR?.userName.toLowerCase() === username.toLowerCase() && HR?.password === password) {
      this.setActiveHR(HR);
      this._router.navigate(['HR', 'home']);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this._activeHR = this._HRs[1];
    this._router.navigate(['login']);
  }

  fetchData(key: string): any[] {
    const data = JSON.parse(localStorage.getItem(key));
    if (this._isArrayHasItems(data)) {
      return data;
    }
    return [];
  }

  saveData(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private _isArrayHasItems(array: any) {
    return Array.isArray(array) && array.length > 0;
  }
}
