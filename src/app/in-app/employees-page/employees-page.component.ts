import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit, OnDestroy {
  employees: Employee[];
  employeesToShow: Employee[];
  active: boolean = true;
  private _employeesSubscription: Subscription = new Subscription();
  dialogRef: MatDialogRef<EmployeeDialogComponent>;
  constructor(
    public employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog) { }
  //subscribe to changes on employees list in the service
  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this._route.fragment.subscribe((freg) => {
      if (freg === 'archived') {
        this.employees = this.employeeService.getInactiveEmployees();
        this.active = false;

      } else {
        this.employees = this.employeeService.getEmployees();
        this.active = true;
      }
    });
    this._route.queryParams.subscribe((params) => {
      if (!this.dialogRef) {
        if (params.mode === 'add') {
          this._dialog.open(EmployeeDialogComponent, { width: '39rem' });
        }
      }
    });
    this._employeesSubscription = this.employeeService.employeesChanged.subscribe((newEmployees: Employee[]) => { this.employees = newEmployees })
  }

  ngOnDestroy() {
    this._employeesSubscription.unsubscribe();
  }
  addEmployee() {
    this.dialogRef = this._dialog.open(EmployeeDialogComponent, { width: '39rem' });
    this._router.navigate([], { relativeTo: this._route, queryParams: { mode: 'add' } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => { this.dialogRef = undefined }))
      .subscribe(
        (form) => {
          console.log(form);
          this._router.navigate([], { relativeTo: this._route });
        }
      );
  }
  pageChanged(newViewList: Employee[]) {
    this.employeesToShow = newViewList;
  }
  onNavigateToArchivedEmployees() {
    this._router.navigate([], { relativeTo: this._route, fragment: 'archived' });
  }
  onNavigateToActiveEmployees() {
    this._router.navigate([], { relativeTo: this._route });
  }

  showEmployee(empID: number) {
    this.employeeService.activateEmployee(empID);
    this._router.navigate(['HR', 'employees', `${empID}`]);
  }
  editEmployee(empID: number) {
    this.employeeService.onEditEmployee(empID);
    this._router.navigate(['HR', 'employees', `${empID}`]);
  }
  employeeStateChanged(emp: { employee: Employee, newState: boolean }) {
    emp.newState ?
      this.employeeService.unarchiveEmployee(emp.employee.ID)
      : this.employeeService.archiveEmployee(emp.employee.ID);
  }
}
