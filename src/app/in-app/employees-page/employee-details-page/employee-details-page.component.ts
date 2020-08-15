import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

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
  HRs: HRUser[] = this.utilsService.getHRs();
  ActiveHR: HRUser = this.HRs[0];
  selectedActives = true;
  departments: Department[];
  sectors: Sector[];
  showMore: boolean;
  editable: boolean;
  salary: number = 500;
  @ViewChild('employeeForm') empForm: NgForm;
  constructor(private departmentService: DepartmentService, private sectorService: SectorService, private employeeService: EmployeeService, private utilsService: UtilsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
    this.route.params.subscribe((params: Params) => {
      if (+params['id'] === NaN) {
        throw new Error(`'${params['id']}': is not a valid employee id`);
      }
      this.employeeID = +params['id'];
      this.employee = this.employeeService.activateEmployee(+params['id']);
    });
    this.employeeID = this.employee.ID;
    this.sectors = this.sectorService.getSectorsOfDepartment(this.employee.departmentID);
    this.showMore = this.employeeService.EditableForm;
    this.editable = this.employeeService.EditableForm;
  }

  onNavigateEmployees() {
    this.employeeService.deactivateActiveEmployee();
    this.router.navigate(['HR', 'employees']);
  }

  onEditEmployee() {
    this.showMore = true;
    this.editable = true;
  }
  onDepartmentChange() {
    this.sectors = this.sectorService.getSectorsOfDepartment(this.empForm.value.departmentID);
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

  }
  addRaise() {

  }
  onUpdateEmployee() {
    if (this.empForm.valid) {
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
      this.employeeService.updateEmployee(this.employee);
      this.onNavigateEmployees();
    }
  }
}
