import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
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
  private employeesSubscription: Subscription = new Subscription();
  dialogRef: MatDialogRef<EmployeeDialogComponent>;
  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }
  //subscribe to changes on employees list in the service
  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.route.fragment.subscribe((freg) => {
      if (freg === 'archived') {
        this.employees = this.employeeService.getInactiveEmployees();
        this.active = false;

      } else {
        this.employees = this.employeeService.getEmployees();
        this.active = true;
      }
    });
    this.route.queryParams.subscribe((params) => {
      if (!this.dialogRef) {
        if (params.mode === 'add') {
          this.dialog.open(EmployeeDialogComponent, { width: '39rem' });
        }
      }
    });
    this.employeesSubscription = this.employeeService.employeesChanged.subscribe((newEmployees: Employee[]) => { this.employees = newEmployees })
  }

  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }
  addEmployee() {
    this.dialogRef = this.dialog.open(EmployeeDialogComponent, { width: '39rem' });
    this.router.navigate([], { relativeTo: this.route, queryParams: { mode: 'add' } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => { this.dialogRef = undefined }))
      .subscribe(
        (form) => {
          console.log(form);
          this.router.navigate([], { relativeTo: this.route });
        }
      );
  }
  pageChanged(newViewList: Employee[]) {
    this.employeesToShow = newViewList;
  }
  onNavigateToArchivedEmployees() {
    this.router.navigate([], { relativeTo: this.route, fragment: 'archived' });
  }
  onNavigateToActiveEmployees() {
    this.router.navigate([], { relativeTo: this.route });
  }

  showEmployee(empID: number) {
    this.employeeService.activateEmployee(empID);
    this.router.navigate(['HR', 'employees', `${empID}`]);
  }
  editEmployee(empID: number) {
    this.employeeService.onEditEmployee(empID);
    this.router.navigate(['HR', 'employees', `${empID}`]);
  }
  employeeStateChanged(emp: { employee: Employee, newState: boolean }) {
    emp.newState ?
      this.employeeService.unarchiveEmployee(emp.employee.ID)
      : this.employeeService.archiveEmployee(emp.employee.ID);
  }
}
