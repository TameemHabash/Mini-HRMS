import { Injectable } from '@angular/core';
import { DepartmentService } from '../department/department.service';
import { SectorService } from '../sector/sector.service';
import { Employee } from '../../models/employee.model';
import { Observable, Subject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
import { DatabaseService } from '../database/database.service';
import { map, take } from 'rxjs/operators';
import { Department } from 'src/app/models/department.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _activeEmployees: Employee[] = [];
  private _inactiveEmployees: Employee[] = [];
  private _allEmployees: Employee[] = [];
  employeesChanged: Subject<Employee[]> = new Subject();
  private _activeEmployee: Employee;
  private _EditableForm: boolean = false;
  private readonly _employeeStoreKey: string = 'employee';
  private _currentIsActiveEmployeesList: boolean = true;
  constructor(private seedService: SeedService, private _databaseService: DatabaseService, private _departmentSecvice: DepartmentService, private _sectorService: SectorService, private _utilsService: UtilsService) {
    //here will be the get request from the server for employees
    // const employeesFromStore: Employee[] = this.seedService.getEmployees();
    // employeesFromStore.forEach((employee) => {
    // this._databaseService.addItem(this._employeeStoreKey, employee);
    // });
    this._getEmployeesFromStore()
      .pipe(map((employeesObjectsList): Employee[] => {
        return employeesObjectsList.map((objEmp: any) => new Employee(objEmp));
      }), take(1))
      .subscribe((StoredEmployeesList) => {
        this._allEmployees = StoredEmployeesList;
        this._separateEmployees();
        this.employeesChanged.next(this._currentIsActiveEmployeesList ? this._activeEmployees : this._inactiveEmployees);
      });
  }
  private _getEmployeesFromStore(): Observable<Employee[]> {
    return this._databaseService.getAll(this._employeeStoreKey);
  }

  private _updateEmployeeInStore(updatedEmployee: Employee) {
    const targetIndex = this._allEmployees.findIndex((emp) => emp.ID === updatedEmployee.ID);
    this._allEmployees.splice(targetIndex, 1, this._allEmployees[targetIndex]);
    this._databaseService.editItem(this._employeeStoreKey, updatedEmployee);
  }
  private _separateEmployees(): void {
    this._activeEmployees = this._allEmployees.filter((emp) => emp.active === true);
    this._inactiveEmployees = this._allEmployees.filter((emp) => emp.active === false);
  }

  newEmployeeID(): number {
    let newID: number = 1;
    this._allEmployees.forEach((emp) => {
      if (emp.ID >= newID)
        newID = emp.ID + 1;
    });
    return newID;
  }

  getEmployees(): Employee[] {
    this._currentIsActiveEmployeesList = true;
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
    this._databaseService.addItem(this._employeeStoreKey, newEmployee).pipe(map((newEmployee) => {
      return new Employee(newEmployee);
    }), take(1))
      .subscribe((newEmp) => {
        this._allEmployees.push(newEmp);
      this._separateEmployees();
      this.employeesChanged.next(this._activeEmployees.slice());
      });
  }

  getDepartmentName(deptID: number): string {
    return this._departmentSecvice.getDepartmentNameByID(deptID);
  }

  deprtmentsChanged(): Subject<Department[]> {
    return this._departmentSecvice.departmentsChanged;
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
    this._currentIsActiveEmployeesList = false;
    return this._inactiveEmployees.slice();
  }

  archiveEmployee(empID: number): void {
    const targetEmployee = this._allEmployees[this._allEmployees.findIndex((emp) => emp.ID === empID)];
    targetEmployee.active = false;
    this._updateEmployeeInStore(targetEmployee);
    this._separateEmployees();
    this.employeesChanged.next(this._activeEmployees.slice());
  }

  unarchiveEmployee(empID: number): void {
    const targetEmployee = this._allEmployees[this._allEmployees.findIndex((emp) => emp.ID === empID)];
    targetEmployee.active = true;
    this._updateEmployeeInStore(targetEmployee);
    this._separateEmployees();
    this.employeesChanged.next(this._inactiveEmployees.slice());
  }

  getEmployeesCount(): number {
    return this._activeEmployees.length;
  }

  updateEmployee(updatedEmployee: Employee) {
    const targetEmployeeIndex = this._allEmployees.findIndex((emp) => emp.ID === updatedEmployee.ID);
    this._allEmployees.splice(targetEmployeeIndex, 1, updatedEmployee);
    this._updateEmployeeInStore(updatedEmployee);
    this._separateEmployees();
  }
}
