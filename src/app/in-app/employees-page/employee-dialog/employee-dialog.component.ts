import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { SectorService } from 'src/app/services/sector.service';
import { Department } from 'src/app/models/department.model';
import { Sector } from 'src/app/models/sector.model';
import { HRUser } from 'src/app/models/HRUser.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { UtilsService } from 'src/app/services/utils.service';
import { SalaryService } from 'src/app/services/salary.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
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
  @ViewChild('employeeForm') empForm: NgForm;
  rateControl = new FormControl("", [Validators.max(20000), Validators.min(350)])
  constructor(private _departmentService: DepartmentService,
    private _sectorService: SectorService,
    private _employeeService: EmployeeService,
    private _utilsService: UtilsService,
    private _salaryService: SalaryService) { }

  ngOnInit(): void {
    this.departments = this._departmentService.getDepartments();
  }

  onDepartmentChange() {
    this.sectors = this._sectorService.getSectorsOfDepartment(this.empForm.value.departmentID);
  }

  startDateFilter(date) {
    const day = date.getDay();
    return day !== 5;
  }

  onAddEmployee() {
    if (this.empForm.valid && this.empForm.value.salary >= 350) {
      const newEmp = new Employee(
        this._employeeService.newEmployeeID(),
        this.empForm.value.name,
        this.empForm.value.gender,
        this.empForm.value.SSN,
        this.empForm.value.telNumber,
        this.empForm.value.nationality,
        this.empForm.value.nationalID,
        this.empForm.value.birthDate,
        this.empForm.value.startDate,
        +this.empForm.value.rating,
        this.empForm.value.address,
        this.empForm.value.status,
        this.empForm.value.email,
        true,
        +this.empForm.value.departmentID,
        +this.empForm.value.sectorID,
        +this.empForm.value.HRID);
      this._employeeService.addEmployee(newEmp);
      this._salaryService.onAddEmployee(newEmp.ID, +this.empForm.value.salary);
    }
  }
}
