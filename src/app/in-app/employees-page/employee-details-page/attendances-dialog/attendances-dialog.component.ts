import { Component, OnInit, Inject } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { Attendance } from 'src/app/models/attendance.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-attendances-dialog',
  templateUrl: './attendances-dialog.component.html',
  styleUrls: ['./attendances-dialog.component.css']
})
export class AttendancesDialogComponent implements OnInit {
  attendaces: Attendance[];
  attendacesToShow: Attendance[];
  constructor(@Inject(MAT_DIALOG_DATA) public employee: Employee, private _attendaceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendaces = this._attendaceService.getAttendancesByEmployeeID(this.employee.ID);
    this.attendaces.reverse();
  }

  onChangeSlide(newattendacesToView: Attendance[]) {
    this.attendacesToShow = newattendacesToView;
  }
}
