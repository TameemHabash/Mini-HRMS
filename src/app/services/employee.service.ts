import { Injectable, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { DepartmentService } from './department.service';
import { SectorService } from './sector.service';
import { Employee } from '../models/employee.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private activeEmployees: Employee[];
  private inactiveEmployees: Employee[];
  private allEmployees: Employee[];
  employeesChanged: Subject<Employee[]> = new Subject();
  private _activeEmployee: Employee;
  private _EditableForm: boolean = false;
  constructor(private departmentSecvice: DepartmentService, private sectorService: SectorService) {
    //here will be the get request from the server for employees
    this.allEmployees = [
      new Employee(1, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2017, 6, 9), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 2, 1),
      new Employee(2, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 3, 6, 1),
      new Employee(3, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 5, 1),
      new Employee(4, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2018, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 4, 1),
      new Employee(5, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2019, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', false, 1, 1, 1),
      new Employee(6, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 3, 5, 1),
      new Employee(7, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 3, 6, 1),
      new Employee(8, 'wesam sameer', 'male', '817-82-5966', '+962790000003', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(9, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2020, 6, 7), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 2, 3, 1),
      new Employee(10, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 2, 4, 1),
      new Employee(11, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 4, 1),
      new Employee(12, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2020, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 4, 1),
      new Employee(13, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 3, 5, 1),
      new Employee(14, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 3, 6, 1),
      new Employee(15, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 2, 1),
      new Employee(16, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2020, 6, 7), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 2, 1),
      new Employee(17, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 1, 1, 1),
      new Employee(18, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 1, 2, 1),
      new Employee(19, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2020, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', false, 1, 2, 1),
      new Employee(20, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 1, 3, 1),
      new Employee(21, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 1, 2, 1),
      new Employee(22, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 1, 1),
    ];
    this._separateEmployees();
  }

  private _separateEmployees(): void {
    this.activeEmployees = this.allEmployees.filter((emp) => emp.active === true);
    this.inactiveEmployees = this.allEmployees.filter((emp) => emp.active === false);
  }

  newEmployeeID(): number {
    return this.allEmployees.length + 1
  }

  getEmployees(): Employee[] {
    return this.activeEmployees.slice();
  }

  get EditableForm() {
    return this._EditableForm;
  }

  get activeEmployee() {
    return this._activeEmployee;
  }

  activateEmployee(empID: number): Employee {
    this._activeEmployee = this.allEmployees.find((emp) => emp.ID === empID);
    return this._activeEmployee;
  }

  onEditEmployee(empID: number): Employee {
    this._activeEmployee = this.allEmployees.find((emp) => emp.ID === empID);
    this._EditableForm = true;
    return this._activeEmployee;
  }
  deactivateActiveEmployee(): void {
    this._activeEmployee = null;
    this._EditableForm = false;
  }

  addEmployee(newEmployee: Employee): void {
    this.allEmployees.push(newEmployee);
    this._separateEmployees();
    this.employeesChanged.next(this.activeEmployees.slice());
  }

  getDepartmentName(deptID: number): string {
    return this.departmentSecvice.getDepartmentNameByID(deptID);
  }
  getSectorNameByID(sectorID: number): string {
    return this.sectorService.getSectorNameByID(sectorID);
  }

  getEmployeesNumberByDepartmentID(deptID: number): number {
    let employeesNumber: number = 0;
    this.activeEmployees.forEach((emp) => {
      if (emp.departmentID === deptID) {
        employeesNumber++;
      }
    });
    return employeesNumber;
  }

  getEmployeeNameByID(empID: number): string {
    if (empID) {
      return this.activeEmployees.find((emp) => emp.ID === empID).name;
    }
    return '';
  }

  getEmployeeByID(empID: number): Employee {
    if (empID) {
      return this.activeEmployees.find((emp) => emp.ID === empID);
    }
    return null;
  }
  getEmployeesByDepartmentID(deptID: number): Employee[] {
    return this.activeEmployees.filter((emp) => emp.departmentID === deptID);
  }

  getInactiveEmployees(): Employee[] {
    return this.inactiveEmployees.slice();
  }

  archiveEmployee(empID: number): void {
    this.allEmployees[this.allEmployees.findIndex((emp) => emp.ID === empID)].active = false;
    this._separateEmployees();
    this.employeesChanged.next(this.activeEmployees.slice());
  }

  unarchiveEmployee(empID: number): void {
    this.allEmployees[this.allEmployees.findIndex((emp) => emp.ID === empID)].active = true;
    this._separateEmployees();
    this.employeesChanged.next(this.inactiveEmployees.slice());
  }

  getEmployeesCount(): number {
    return this.activeEmployees.length;
  }

  updateEmployee(updatedEmployee: Employee) {
    const targetEmployeeIndex = this.allEmployees.findIndex((emp) => emp.ID === updatedEmployee.ID);
    this.allEmployees.splice(targetEmployeeIndex, 1, updatedEmployee);
    this._separateEmployees();
  }
}
