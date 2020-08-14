import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { SectorService } from 'src/app/services/sector.service';
import { Department } from 'src/app/models/department.model';
import { Sector } from 'src/app/models/sector.model';
import { HRUser } from 'src/app/models/HRUser.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  genders: string[] = ['male', 'female'];
  nationalities: string[] = ['Jordanian'];
  statuses: string[] = ['Single', 'Married', 'Other'];
  actives = [
    { name: 'Active', active: true },
    { name: 'Archived', active: false }
  ];
  HRs: HRUser[] = this.utilsService.getHRs();
  ActiveHR: HRUser = this.HRs[0];

  selectedActives = true;
  departments: Department[];
  sectors: Sector[];
  @ViewChild('employeeForm') empForm: NgForm;
  constructor(private dialogRef: MatDialogRef<EmployeeDialogComponent>, private departmentService: DepartmentService, private sectorService: SectorService, private employeeService: EmployeeService, private utilsService: UtilsService) {

  }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  onDepartmentChange() {
    this.sectors = this.sectorService.getSectorsOfDepartment(this.empForm.value.departmentID);
  }

  startDateFilter(date) {
    const day = date.getDay();
    return day !== 5;
  }

  onAddEmployee(form: NgForm) {
    if (form.valid) {
      const newEmp = new Employee(
        this.employeeService.newEmployeeID(),
        form.value.name,
        form.value.gender,
        form.value.SSN,
        form.value.telNumber,
        form.value.nationality,
        form.value.nationalID,
        form.value.birthDate,
        form.value.startDate,
        +form.value.rating,
        form.value.address,
        form.value.status,
        form.value.email,
        true,
        +form.value.departmentID,
        +form.value.sectorID,
        +form.value.HRID);
      this.employeeService.addEmployee(newEmp);
    }
    console.log(form);
  }
}
