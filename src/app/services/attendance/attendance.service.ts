import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _attendances: Attendance[];
  private readonly _storeAttendancesKey: string = 'attendancesKey';
  constructor(private seedService: SeedService, private _utilsService: UtilsService) {
    // this._attendances = this.seedService.getAttendances();
    // this._saveAttendancesToStore();
    this._attendances = this._getAttendancesFromStore();
  }

  private _getAttendancesFromStore(): Attendance[] {
    const parsedAttendancesList: any[] = this._utilsService.fetchData(this._storeAttendancesKey);
    const attendancesList: Attendance[] = parsedAttendancesList.map((att) => {
      const attendance = new Attendance(att.attendanceID, att.employeeID, new Date(att.attendanceDate), att.entry ? new Date(att.entry) : undefined, att.leave ? new Date(att.leave) : undefined, att.dailyHours);
      return attendance;
    });
    return attendancesList;
  }

  private _saveAttendancesToStore(): void {
    this._utilsService.saveData(this._storeAttendancesKey, this._attendances);
  }

  getAttendancesByEmployeeID(empID: number): Attendance[] {
    return this._attendances.filter((att) => att.employeeID === empID);
  }

  // getHoursDifferenceFromTwoDates(date1: Date, date2: Date): number {
  //   let diff = (date2.getTime() - date1.getTime()) / 1000;
  //   diff /= (60 * 60);
  //   return Math.abs(Math.round(diff));
  // }
}
