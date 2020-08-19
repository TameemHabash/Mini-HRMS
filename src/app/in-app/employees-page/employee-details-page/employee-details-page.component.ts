import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { SectorService } from 'src/app/services/sector.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HRUser } from 'src/app/models/HRUser.model';
import { Department } from 'src/app/models/department.model';
import { Sector } from 'src/app/models/sector.model';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SalaryService } from 'src/app/services/salary.service';
import { Salary } from 'src/app/models/salary.model';
import { SalaryLog } from 'src/app/models/salaryLog.model';
import { MatDialog } from '@angular/material/dialog';
import { AttendancesDialogComponent } from './attendances-dialog/attendances-dialog.component';

@Component({
  selector: 'app-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.css']
})
export class EmployeeDetailsPageComponent implements OnInit {
  employee: Employee;
  employeeID: number;
  genders: string[] = ['male', 'female'];
  nationalities: string[] = ['jordanian'];
  statuses: string[] = ['single', 'married', 'other'];
  actives = [
    { name: 'active', active: true },
    { name: 'archived', active: false }
  ];
  HRs: HRUser[] = this._utilsService.getHRs();
  ActiveHR: HRUser = this.HRs[0];
  selectedActives = true;
  departments: Department[];
  sectors: Sector[];
  showMore: boolean;
  editable: boolean;
  oldSalaryValue: number;
  salary: Salary;
  salaryLogs: SalaryLog[];
  salarLogsToShow: SalaryLog[];
  @ViewChild('employeeForm') empForm: NgForm;
  constructor(
    private _departmentService: DepartmentService,
    private _sectorService: SectorService,
    private _employeeService: EmployeeService,
    private _salaryService: SalaryService,
    private _utilsService: UtilsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.departments = this._departmentService.getDepartments();
    this._route.params.subscribe((params: Params) => {
      if (+params['id'] === NaN) {
        throw new Error(`'${params['id']}': is not a valid employee id`);
      }
      this.employeeID = +params['id'];
      this.employee = this._employeeService.activateEmployee(+params['id']);
    });
    this.employeeID = this.employee.ID;
    this.sectors = this._sectorService.getSectorsOfDepartment(this.employee.departmentID);
    this.showMore = this._employeeService.EditableForm;
    this.editable = this._employeeService.EditableForm;
    this.salary = this._salaryService.getSalaryByEmployeeID(this.employee.ID);
    this.oldSalaryValue = this.salary.amount;
    this.salaryLogs = this._salaryService.getLogsBySalaryID(this.salary.ID);
    this.salaryLogs.reverse();
  }

  onNavigateEmployees() {
    this._employeeService.deactivateActiveEmployee();
    this._router.navigate(['HR', 'employees']);
  }

  onEditEmployee() {
    this.showMore = true;
    this.editable = true;
  }

  onDepartmentChange() {
    this.sectors = this._sectorService.getSectorsOfDepartment(this.empForm.value.departmentID);
    this.empForm.form.value.sectorID = undefined;
  }

  startDateFilter(date) {
    const day = date.getDay();
    return day !== 5;
  }

  onShowMore() {
    this.showMore = true;
  }

  onShowLess() {
    this.showMore = false;
  }

  onViewAttendances() {
    this._dialog.open(AttendancesDialogComponent, { data: this.employee, width: '650px' });
  }

  addRaise() {

  }

  onUpdateEmployee() {
    if (this.empForm.valid) {
      if (+this.empForm.value.salary !== this.oldSalaryValue) {
        this._salaryService.onEditSalary(this.salary.ID, +this.empForm.value.salary)
      }
      this.employee.name = this.empForm.value.name;
      this.employee.gender = this.empForm.value.gender;
      this.employee.SSN = this.empForm.value.SSN;
      this.employee.telNumber = this.empForm.value.telNumber;
      this.employee.nationality = this.empForm.value.nationality;
      this.employee.nationalID = this.empForm.value.nationalID;
      this.employee.birthDate = this.empForm.value.birthDate;
      this.employee.startDate = this.empForm.value.startDate;
      this.employee.rating = +this.empForm.value.rating;
      this.employee.address = this.empForm.value.address;
      this.employee.status = this.empForm.value.status;
      this.employee.email = this.empForm.value.email;
      this.employee.active = this.empForm.value.active;
      this.employee.departmentID = +this.empForm.value.departmentID;
      this.employee.sectorID = +this.empForm.value.sectorID;
      this.employee.HRID = +this.empForm.value.HRID;
      this._employeeService.updateEmployee(this.employee);
      setTimeout(() => {
        this.onNavigateEmployees();
      }, 200)
    }
  }

  onChangeSlide(newLogsToView: SalaryLog[]) {
    this.salarLogsToShow = newLogsToView;
  }
}
