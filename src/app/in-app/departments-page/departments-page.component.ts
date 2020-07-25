import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements AfterContentInit {
  departments: Department[];
  constructor(private departmentsServ: DepartmentService, private dialog: MatDialog) { }

  ngAfterContentInit(): void {
    this.departments = this.departmentsServ.getDepartments();
  }
  onAddDepartment() {
    this.dialog.open(DepartmentDialogComponent);
  }
  onShowDepartmentDetails(department) {
    this.dialog.open(DepartmentDialogComponent, { data: department });
  }
}
