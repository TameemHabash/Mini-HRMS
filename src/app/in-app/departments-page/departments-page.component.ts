import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { Sector } from 'src/app/models/sector.model';
import { Employee } from 'src/app/models/employee.model';
import { Subscription } from 'rxjs';
import { DeleteDepartmentDialogComponent } from './delete-department-dialog/delete-department-dialog.component';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit, OnDestroy {
  departments: Department[];
  // deletedDialog: MatDialogRef<DeleteDepartmentDialogComponent>;
  dialogRef: MatDialogRef<DepartmentDialogComponent>;
  private departmentSubscription: Subscription = new Subscription();
  private deleteDepartmentSubscription: Subscription = new Subscription();
  constructor(private departmentsService: DepartmentService, private employeeService: EmployeeService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departments = this.departmentsService.getDepartments();
    this.route.queryParams
      .subscribe((queryParams) => {
        if (!this.dialogRef) {
          if (queryParams.mode === 'show-and-edit') {
            const targetDeapartment = this.departmentsService.getDepartmentByID(+queryParams.id);
            this.dialog.open(DepartmentDialogComponent, { data: { department: targetDeapartment, manager: this.employeeService.getEmployeeByID(targetDeapartment.managerID) } });
          }
          else if (queryParams.mode === 'add') {
            this.dialog.open(DepartmentDialogComponent);
          }
        }
      });
    this.departmentSubscription = this.departmentsService.departmentsChanged.subscribe((newDepartments: Department[]) => { this.departments = newDepartments });
    this.deleteDepartmentSubscription = this.departmentsService.departmentDeleted.subscribe((deletedDeptDetails: { deptID: number, deptName: string, sectorsCount: number }) => {
      this.dialog.open(DeleteDepartmentDialogComponent, { data: deletedDeptDetails });
    });
  }
  ngOnDestroy() {
    this.departmentSubscription.unsubscribe();
    this.deleteDepartmentSubscription.unsubscribe();
  }
  onAddDepartment() {
    this.dialogRef = this.dialog.open(DepartmentDialogComponent);
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'add' } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => { this.dialogRef = undefined }))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
    //need to subscribe to employees observable to change number of employees and the manager if changes too
  }
  onShowDepartmentDetails(department: Department, manager: Employee) {
    this.dialogRef = this.dialog.open(DepartmentDialogComponent, { data: { department: department, manager: manager } });
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

  getManagerForDepartment(managerID: number): Employee {
    return this.employeeService.getEmployeeByID(managerID);
  }
}
