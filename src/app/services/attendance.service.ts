import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _attendances: Attendance[];
  private readonly _storeAttendancesKey: string = 'attendancesKey';
  constructor(private _utilsService: UtilsService) {
    // this._attendances = [
    //   new Attendance(1, 1, new Date(2020, 6, 29), new Date(2020, 6, 29, 8), new Date(2020, 6, 29, 17), 9),
    //   new Attendance(2, 1, new Date(2020, 6, 30), new Date(2020, 6, 30, 8), new Date(2020, 6, 30, 17), 9),
    //   new Attendance(3, 1, new Date(2020, 6, 31), new Date(2020, 6, 31, 8), new Date(2020, 6, 31, 17), 9),
    //   new Attendance(4, 1, new Date(2020, 7, 1), new Date(2020, 7, 1, 8), new Date(2020, 7, 1, 17), 9),
    //   new Attendance(5, 1, new Date(2020, 7, 2), new Date(2020, 7, 2, 8), new Date(2020, 7, 2, 17), 9),
    //   new Attendance(6, 1, new Date(2020, 7, 3), new Date(2020, 7, 3, 8), new Date(2020, 7, 3, 20), 12),
    //   new Attendance(7, 1, new Date(2020, 7, 4), new Date(2020, 7, 4, 8), new Date(2020, 7, 4, 17), 9),
    //   new Attendance(8, 1, new Date(2020, 7, 5, 8)),
    //   new Attendance(9, 1, new Date(2020, 7, 6), new Date(2020, 7, 6, 8), new Date(2020, 7, 6, 17), 9),
    //   new Attendance(10, 1, new Date(2020, 7, 7), new Date(2020, 7, 7, 8), new Date(2020, 7, 7, 17), 9),
    //   new Attendance(11, 1, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(12, 1, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(13, 1, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(14, 1, new Date(2020, 7, 11, 8)),
    //   new Attendance(15, 1, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(16, 1, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
    //   new Attendance(17, 1, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(18, 1, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),



    //   new Attendance(19, 2, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(20, 2, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(21, 2, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(22, 2, new Date(2020, 7, 11)),
    //   new Attendance(23, 2, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(24, 2, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
    //   new Attendance(25, 2, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(26, 2, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),


    //   new Attendance(27, 3, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(28, 3, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(29, 3, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(32, 3, new Date(2020, 7, 11), new Date(2020, 7, 11, 8), new Date(2020, 7, 11, 17), 9),
    //   new Attendance(31, 3, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(30, 3, new Date(2020, 7, 13)),
    //   new Attendance(33, 3, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(34, 3, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),


    //   new Attendance(35, 4, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(36, 4, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(37, 4, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(38, 4, new Date(2020, 7, 11)),
    //   new Attendance(39, 4, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(40, 4, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
    //   new Attendance(41, 4, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(42, 4, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),
    //   new Attendance(67, 4, new Date(2020, 7, 16)),


    //   new Attendance(43, 5, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(44, 5, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(45, 5, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(46, 5, new Date(2020, 7, 11)),
    //   new Attendance(47, 5, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(48, 5, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
    //   new Attendance(49, 5, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(50, 5, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),

    //   new Attendance(68, 6, new Date(2020, 7, 7)),
    //   new Attendance(51, 6, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(52, 6, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(53, 6, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(54, 6, new Date(2020, 7, 11)),
    //   new Attendance(55, 6, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(56, 6, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
    //   new Attendance(57, 6, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(58, 6, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),


    //   new Attendance(59, 7, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
    //   new Attendance(60, 7, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
    //   new Attendance(61, 7, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
    //   new Attendance(62, 7, new Date(2020, 7, 11)),
    //   new Attendance(63, 7, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
    //   new Attendance(64, 7, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
    //   new Attendance(65, 7, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
    //   new Attendance(66, 7, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),
    // ];
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
