import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.model';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
import { DatabaseService } from '../database/database.service';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _selectedEmpID: number;
  selectedEmpAttendancesChanged: Subject<Attendance[]> = new Subject<Attendance[]>();
  private _lastAttListLength: number = 0;
  private _attendances: Attendance[] = [];
  private readonly _attendancesStoreKey: string = 'attendance';
  constructor(private seedService: SeedService, private _databaseService: DatabaseService) {
    // this._attendances = this.seedService.getAttendances();
    // this._attendances.forEach((attendace) => {
    //   this._databaseService.addItem(this._attendancesStoreKey, attendace);
    // });

    this._getAttendancesFromStore()
      .pipe(map((attObjectsList): Attendance[] => {
        return attObjectsList.map((attObj: any) => new Attendance(attObj));
      }), take(1))
      .subscribe((attList: Attendance[]) => {
        this._attendances = attList;
        this.getAttendancesByEmployeeID(this._selectedEmpID);
      });
  }

  private _getAttendancesFromStore(): Observable<object[]> {
    return this._databaseService.getAll(this._attendancesStoreKey);
  }

  getAttendancesByEmployeeID(empID: number): Attendance[] {
    this._selectedEmpID = empID;
    if (this._lastAttListLength === 0 && this._attendances.length !== 0) {
      this._lastAttListLength = this._attendances.length;
      this.selectedEmpAttendancesChanged.next(this._attendances.filter((att) => att.employeeID === empID));
    }
    return this._attendances.filter((att) => att.employeeID === empID);
  }
}