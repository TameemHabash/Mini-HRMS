import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { Sector } from 'src/app/models/sector.model';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit {
  departments: Department[];
  dialogRef: MatDialogRef<DepartmentDialogComponent>;
  constructor(private departmentsService: DepartmentService, private employeeService: EmployeeService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departments = this.departmentsService.getDepartments();
    this.route.queryParams
      .subscribe((queryParams) => {
        if (!this.dialogRef) {
          if (queryParams.mode === 'show-and-edit') {
            this.dialog.open(DepartmentDialogComponent, { data: this.departmentsService.getDepartmentByID(+queryParams.id) });
          }
          else if (queryParams.mode === 'add') {
            this.dialog.open(DepartmentDialogComponent);
          }
        }
      });
  }
  onAddDepartment() {
    this.dialogRef = this.dialog.open(DepartmentDialogComponent);
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'add' } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
    //need to subscribe to department observable
    //need to subscribe to employees observable to change number of employees and the manager if changes too
  }
  onShowDepartmentDetails(department: Department) {
    this.dialogRef = this.dialog.open(DepartmentDialogComponent, { data: department });
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'show-and-edit', id: department.ID } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => { this.dialogRef = undefined }))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
  }

  getEmployeesNumberForDepartment(deptID: number): number {
    return this.employeeService.getEmployeesNumberByDepartmentID(deptID);
  }

  getSectorsForDepartment(deptID: number): Sector[] {
    return this.departmentsService.getSectorsByDepartmentID(deptID);
  }

  getManagerNameForDepartment(managerID: number): string {
    return this.employeeService.getEmployeeNameByID(managerID);
  }
}
