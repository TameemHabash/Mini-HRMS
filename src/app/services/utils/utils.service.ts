import { Injectable } from '@angular/core';
import { HRUser } from '../../models/HRUser.model';
import { Router } from '@angular/router';
import { SeedService } from '../seed/seed.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private _HRs: HRUser[];
  //set ActiveHR when login and reset it when logout
  private _activeHR: HRUser;

  constructor(private seedService: SeedService, private _router: Router) {
    this._HRs = this.seedService.getHRs();
    this._activeHR = this._HRs[1];
  }
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
