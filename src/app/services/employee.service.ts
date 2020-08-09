import { Injectable } from '@angular/core';
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
  constructor(private departmentSecvice: DepartmentService, private sectorService: SectorService) {
    //here will be the get request from the server for employees
    this.allEmployees = [
      new Employee(1, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'Jordanian', '9942000001', '1994-10-12', '2018-6-25', 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 3, 6, 1),
      new Employee(2, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'Jordanian', '9952000003', '1995-4-16', '2017-5-6', 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 3, 5, 1),
      new Employee(3, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'Jordanian', '9961000004', '1996-10-5', '2020-9-6', 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 3, 6, 1),
      new Employee(4, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'Jordanian', '9951000005', '1995-11-9', '2019-6-20', 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 3, 6, 1),
      new Employee(5, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'Jordanian', '9952000006', '1995-12-5', '2017-5-22', 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', false, 2, 4, 1),
      new Employee(6, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'Jordanian', '9952000007', '1995-5-16', '2020-7-1', 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 2, 3, 1),
      new Employee(7, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'Jordanian', '9981000008', '1998-11-5', '2020-8-1', 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(8, 'wesam sameer', 'male', '817-82-5966', '+962790000003', 'Jordanian', '9981000008', '1998-11-5', '2020-8-1', 7.9, 'amman - airport street', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(9, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'Jordanian', '9942000001', '1994-10-12', '2018-6-25', 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 2, 3, 1),
      new Employee(10, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'Jordanian', '9952000003', '1995-4-16', '2017-5-6', 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 2, 4, 1),
      new Employee(11, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'Jordanian', '9961000004', '1996-10-5', '2020-9-6', 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 4, 1),
      new Employee(12, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'Jordanian', '9951000005', '1995-11-9', '2019-6-20', 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 4, 1),
      new Employee(13, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'Jordanian', '9952000006', '1995-12-5', '2017-5-22', 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 3, 5, 1),
      new Employee(14, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'Jordanian', '9952000007', '1995-5-16', '2020-7-1', 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 3, 6, 1),
      new Employee(15, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'Jordanian', '9981000008', '1998-11-5', '2020-8-1', 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 2, 1),
      new Employee(16, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'Jordanian', '9942000001', '1994-10-12', '2018-6-25', 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 2, 1),
      new Employee(17, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'Jordanian', '9952000003', '1995-4-16', '2017-5-6', 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 1, 1, 1),
      new Employee(18, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'Jordanian', '9961000004', '1996-10-5', '2020-9-6', 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 1, 2, 1),
      new Employee(19, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'Jordanian', '9951000005', '1995-11-9', '2019-6-20', 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', false, 1, 2, 1),
      new Employee(20, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'Jordanian', '9952000006', '1995-12-5', '2017-5-22', 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 1, 2, 1),
      new Employee(21, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'Jordanian', '9952000007', '1995-5-16', '2020-7-1', 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 1, 2, 1),
      new Employee(22, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'Jordanian', '9981000008', '1998-11-5', '2020-8-1', 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 1, 1),
    ];
    this._separateEmployees();
  }

  private _separateEmployees(): void {
    this.activeEmployees = this.allEmployees.filter((emp) => emp.active === true);
    this.inactiveEmployees = this.allEmployees.filter((emp) => emp.active === false);
  }

  getEmployees(): Employee[] {
    return this.activeEmployees.slice();
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
}
