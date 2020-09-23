import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { Attendance } from 'src/app/models/attendance.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attendances-dialog',
  templateUrl: './attendances-dialog.component.html',
  styleUrls: ['./attendances-dialog.component.css']
})
export class AttendancesDialogComponent implements OnInit, OnDestroy {
  attendaces: Attendance[];
  attendacesToShow: Attendance[];
  private _attSubscription: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public employee: Employee, private _attendaceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendaces = this._attendaceService.getAttendancesByEmployeeID(this.employee.ID);
    this.attendaces.reverse();
    this._attSubscription = this._attendaceService.selectedEmpAttendancesChanged.subscribe((attList: Attendance[]) => {
      this.attendaces = attList;
    });
  }
  ngOnDestroy() {
    this._attSubscription.unsubscribe();
  }
  onChangeSlide(newattendacesToView: Attendance[]) {
    this.attendacesToShow = newattendacesToView;
  }
}
