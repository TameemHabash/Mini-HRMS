import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Department } from 'src/app/models/department.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee/employee.service';
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
  private _dialogRef: MatDialogRef<DepartmentDialogComponent>;
  private _departmentSubscription: Subscription = new Subscription();
  private _deleteDepartmentSubscription: Subscription = new Subscription();
  constructor(private _departmentsService: DepartmentService, private _employeeService: EmployeeService, private _dialog: MatDialog, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.departments = this._departmentsService.getDepartments();
    this._route.queryParams
      .subscribe((queryParams) => {
        if (!this._dialogRef) {
          if (queryParams.mode === 'show-and-edit') {
            if (this._departmentsService.getDepartments().length === 0) {
              this._departmentsService.departmentsChanged.pipe(take(1)).subscribe(() => {
                const targetDeapartment = this._departmentsService.getDepartmentByID(+queryParams.id);
                this._showDepartmentDetailsWhenEmployeesAreLoaded(targetDeapartment);
              });
            } else {
              const targetDeapartment = this._departmentsService.getDepartmentByID(+queryParams.id);
              this._showDepartmentDetailsWhenEmployeesAreLoaded(targetDeapartment);
            }
          }
          else if (queryParams.mode === 'add') {
            this._departmentsService.inAddMode = true;
            this._dialogRef = this._dialog.open(DepartmentDialogComponent);
            this._addListnerOnCloseDepartmentDetailsDialog();
          }
        }
      });

    if (this._route.snapshot.fragment === 'sectors') {
      this._router.navigate([], { relativeTo: this._route });
    }

    this._departmentSubscription = this._departmentsService.departmentsChanged.subscribe((newDepartments: Department[]) => { this.departments = newDepartments });
    this._deleteDepartmentSubscription = this._departmentsService.departmentDeleted.subscribe((deletedDeptDetails: { deptID: number, deptName: string, sectorsCount: number }) => {
      this._dialog.open(DeleteDepartmentDialogComponent, { data: deletedDeptDetails });
    });
  }
  ngOnDestroy() {
    this._departmentSubscription.unsubscribe();
    this._deleteDepartmentSubscription.unsubscribe();
  }
  private _showDepartmentDetailsWhenEmployeesAreLoaded(targetDeapartment: Department): void {
    if (this._employeeService.getEmployees().length === 0) {
      this._employeeService.employeesChanged.pipe(take(1)).subscribe(() => {
        this._dialogRef = this._dialog.open(DepartmentDialogComponent, { data: { department: targetDeapartment, manager: this._employeeService.getEmployeeByID(targetDeapartment.managerID) } });
        this._addListnerOnCloseDepartmentDetailsDialog();
      });
    } else {
      this._dialogRef = this._dialog.open(DepartmentDialogComponent, { data: { department: targetDeapartment, manager: this._employeeService.getEmployeeByID(targetDeapartment.managerID) } });
      this._addListnerOnCloseDepartmentDetailsDialog();
    }
  }
  onAddDepartment() {
    this._departmentsService.inAddMode = true;
    this._dialogRef = this._dialog.open(DepartmentDialogComponent);
    this._router.navigate([], { relativeTo: this._route, fragment: 'department', queryParams: { mode: 'add' } });
    this._dialogRef.afterClosed()
      .pipe(finalize(() => { this._dialogRef = undefined }))
      .subscribe(
        () => {
          this._departmentsService.inAddMode = false;
          this._router.navigate([], { relativeTo: this._route });
        }
      );
    //need to subscribe to employees observable to change number of employees and the manager if changes too
  }
  onShowDepartmentDetails(department: Department, manager: Employee) {
    this._dialogRef = this._dialog.open(DepartmentDialogComponent, { data: { department: department, manager: manager } });
    this._router.navigate([], { relativeTo: this._route, fragment: 'department', queryParams: { mode: 'show-and-edit', id: department.ID } });
    this._addListnerOnCloseDepartmentDetailsDialog();
  }

  private _addListnerOnCloseDepartmentDetailsDialog(): void {
    this._dialogRef.afterClosed()
      .pipe(finalize(() => { this._dialogRef = undefined }))
      .subscribe(
        () => {
          this._router.navigate([], { relativeTo: this._route });
        }
      );
  }
  getEmployeesNumberForDepartment(deptID: number): number {
    return this._employeeService.getEmployeesNumberByDepartmentID(deptID);
  }

  getSectorsForDepartment(deptID: number): Sector[] {
    return this._departmentsService.getSectorsByDepartmentID(deptID);
  }

  getManagerForDepartment(managerID: number): Employee {
    return this._employeeService.getEmployeeByID(managerID);
  }
}
