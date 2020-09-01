import { Injectable } from '@angular/core';
import { DepartmentService } from './department.service';
import { SectorService } from './sector.service';
import { Employee } from '../models/employee.model';
import { Subject } from 'rxjs';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _activeEmployees: Employee[];
  private _inactiveEmployees: Employee[];
  private _allEmployees: Employee[];
  employeesChanged: Subject<Employee[]> = new Subject();
  private _activeEmployee: Employee;
  private _EditableForm: boolean = false;
  private readonly _storeEmployeeKey: string = 'employeeKey';
  constructor(private _departmentSecvice: DepartmentService, private _sectorService: SectorService, private _utilsService: UtilsService) {
    //here will be the get request from the server for employees
    // this._allEmployees = [
    //   new Employee(1, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2017, 6, 9), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 2, 1),
    //   new Employee(2, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 3, 6, 1),
    //   new Employee(3, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 5, 1),
    //   new Employee(4, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2018, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 4, 1),
    //   new Employee(5, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2019, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', false, 1, 1, 1),
    //   new Employee(6, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 2, 5, 1),
    //   new Employee(7, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 3, 6, 1),
    //   new Employee(8, 'sajeda sarhan', 'male', '817-82-5966', '+962790000003', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
    //   new Employee(9, 'marwan rawashdeh', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2020, 6, 7), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 2, 4, 1),
    //   new Employee(10, 'batool attmeh', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 2, 4, 1),
    //   new Employee(11, 'rahaf malas', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 4, 1),
    //   new Employee(12, 'abdelrahaman al-tamimi', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2020, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 5, 1),
    //   new Employee(13, 'suzan rami', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 3, 6, 1),
    //   new Employee(14, 'abdallah shawabkeh', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 3, 6, 1),
    //   new Employee(15, 'aseel osama', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 3, 1),
    //   new Employee(16, 'abdalla alkhaldi', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2020, 6, 7), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 3, 1),
    //   new Employee(17, 'mahmmud hammad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 1, 1, 1),
    //   new Employee(18, 'saman mubaideen', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 1, 2, 1),
    //   new Employee(19, 'nedal al tarazi', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2020, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', false, 1, 2, 1),
    //   new Employee(20, 'abdalla al madhon', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 1, 3, 1),
    //   new Employee(21, 'duha hindi', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 1, 2, 1),
    //   new Employee(22, 'saddam saaydeh', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
    //   new Employee(23, 'walaa khalifah', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 3, 1),
    //   new Employee(24, 'araj saad"', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 1, 1),
    //   new Employee(25, 'ahmad emaishat', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
    //   new Employee(26, 'lina hamdan', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 3, 1),
    //   new Employee(27, 'hammam al nemer', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 1, 1),
    //   new Employee(28, 'sanad sameer', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
    //   new Employee(29, 'sameer aladwan', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 3, 1),
    //   new Employee(30, 'dina alkhateeb', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 1, 1),
    // ];
    // this._saveEmployeesInStore();
    this._allEmployees = this._getEmployeesFromStore();
    this._separateEmployees();
  }
  private _getEmployeesFromStore(): Employee[] {
    const parsedEmployeesList: any[] = this._utilsService.fetchData(this._storeEmployeeKey);
    const employeesList: Employee[] = parsedEmployeesList.map((emp) => {
      const employee = new Employee(
        emp._ID,
        emp.name,
        emp.gender,
        emp.SSN,
        emp.telNumber,
        emp.nationality,
        emp.nationalID,
        emp.birthDate,
        emp.startDate,
        emp.rating,
        emp.address,
        emp.status,
        emp.email,
        emp.active,
        emp.departmentID,
        emp.sectorID,
        emp.HRID);
      return employee;
    });
    return employeesList;
  }

  private _saveEmployeesInStore() {
    this._utilsService.saveData(this._storeEmployeeKey, this._allEmployees);
  }

  private _separateEmployees(): void {
    this._activeEmployees = this._allEmployees.filter((emp) => emp.active === true);
    this._inactiveEmployees = this._allEmployees.filter((emp) => emp.active === false);
  }

  newEmployeeID(): number {
    return this._allEmployees.length + 1
  }

  getEmployees(): Employee[] {
    return this._activeEmployees.slice();
  }

  get EditableForm() {
    return this._EditableForm;
  }

  get activeEmployee() {
    return this._activeEmployee;
  }

  activateEmployee(empID: number): Employee {
    this._activeEmployee = this._allEmployees.find((emp) => emp.ID === empID);
    return this._activeEmployee;
  }

  onEditEmployee(empID: number): Employee {
    this._activeEmployee = this._allEmployees.find((emp) => emp.ID === empID);
    this._EditableForm = true;
    return this._activeEmployee;
  }
  deactivateActiveEmployee(): void {
    this._activeEmployee = null;
    this._EditableForm = false;
  }

  addEmployee(newEmployee: Employee): void {
    this._allEmployees.push(newEmployee);
    this._saveEmployeesInStore();
    this._separateEmployees();
    this.employeesChanged.next(this._activeEmployees.slice());
  }

  getDepartmentName(deptID: number): string {
    return this._departmentSecvice.getDepartmentNameByID(deptID);
  }
  getSectorNameByID(sectorID: number): string {
    return this._sectorService.getSectorNameByID(sectorID);
  }

  getEmployeesNumberByDepartmentID(deptID: number): number {
    let employeesNumber: number = 0;
    this._activeEmployees.forEach((emp) => {
      if (emp.departmentID === deptID) {
        employeesNumber++;
      }
    });
    return employeesNumber;
  }

  getEmployeeNameByID(empID: number): string {
    if (empID) {
      return this._activeEmployees.find((emp) => emp.ID === empID).name;
    }
    return '';
  }

  getEmployeeByID(empID: number): Employee {
    if (empID) {
      return this._activeEmployees.find((emp) => emp.ID === empID);
    }
    return null;
  }
  getEmployeesByDepartmentID(deptID: number): Employee[] {
    return this._activeEmployees.filter((emp) => emp.departmentID === deptID);
  }

  getInactiveEmployees(): Employee[] {
    return this._inactiveEmployees.slice();
  }

  archiveEmployee(empID: number): void {
    this._allEmployees[this._allEmployees.findIndex((emp) => emp.ID === empID)].active = false;
    this._saveEmployeesInStore();
    this._separateEmployees();
    this.employeesChanged.next(this._activeEmployees.slice());
  }

  unarchiveEmployee(empID: number): void {
    this._allEmployees[this._allEmployees.findIndex((emp) => emp.ID === empID)].active = true;
    this._saveEmployeesInStore();
    this._separateEmployees();
    this.employeesChanged.next(this._inactiveEmployees.slice());
  }

  getEmployeesCount(): number {
    return this._activeEmployees.length;
  }

  updateEmployee(updatedEmployee: Employee) {
    const targetEmployeeIndex = this._allEmployees.findIndex((emp) => emp.ID === updatedEmployee.ID);
    this._allEmployees.splice(targetEmployeeIndex, 1, updatedEmployee);
    this._saveEmployeesInStore();
    this._separateEmployees();
  }
}
