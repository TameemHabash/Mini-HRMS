import { Injectable } from '@angular/core';
import { DepartmentService } from '../department/department.service';
import { SectorService } from '../sector/sector.service';
import { Employee } from '../../models/employee.model';
import { Subject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
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
  constructor(private seedService: SeedService, private _departmentSecvice: DepartmentService, private _sectorService: SectorService, private _utilsService: UtilsService) {
    //here will be the get request from the server for employees
    // this._allEmployees = this.seedService.getEmployees();
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
