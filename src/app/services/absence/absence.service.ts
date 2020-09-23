import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence.model';
import { Observable, Subject } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../../models/employee.model';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
import { map, take } from 'rxjs/operators';
import { DatabaseService } from '../database/database.service';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  absencesChanged: Subject<Absence[]> = new Subject();
  allAbsences: Absence[] = [];
  activeEmployeesAbsences: Absence[] = [];
  employees: Employee[] = [];
  private readonly _absencesStoreKey: string = 'absence';
  constructor(private seedService: SeedService, private _databaseService: DatabaseService, private _employeeService: EmployeeService, private _utilsService: UtilsService) {
    this.employees = this._employeeService.getEmployees();
    this.employeesChanged().pipe(take(1)).subscribe((empList) => { this.employees = empList });
    // this.allAbsences = this.seedService.getAbsences();
    // this.allAbsences.forEach((abs) => { this._databaseService.addItem(this._absencesStoreKey, abs) });

    this._getAbsencesFromStore()
      .pipe(map((absObjectsList: any[]): Absence[] => {
        return absObjectsList.map((absObj) => new Absence(absObj));
      }), take(1))
      .subscribe((attList: Absence[]) => {
        this.allAbsences = attList;
      this._separateActvieEmployeesAbsences();
        this.absencesChanged.next(this.activeEmployeesAbsences);
      });
  }

  private _getAbsencesFromStore(): Observable<object[]> {
    return this._databaseService.getAll(this._absencesStoreKey);
  }

  private _separateActvieEmployeesAbsences(): void {
    this.activeEmployeesAbsences = this.allAbsences.filter((abs) => {
      const employee = this.employees.find((emp) => emp.ID === abs.empID);
      return employee !== undefined;
    });
  }
  employeesChanged(): Subject<Employee[]> {
    return this._employeeService.employeesChanged;
  }
  getEmployees(): Employee[] {
    return this.employees
  }
  getAbsences(): Absence[] {
    return this.activeEmployeesAbsences.slice();
  }
  getAbsencesByEmployeeID(empID: number): Absence[] {
    return this.activeEmployeesAbsences.filter((abs) => abs.empID === empID);
  }

  editAbsence(absID: number, newExuse: boolean, newDescription: string): void {
    const targetAbsenceIndex = this.activeEmployeesAbsences.findIndex((abs) => abs.ID === absID);
    this.allAbsences[targetAbsenceIndex].excuse = newExuse;
    this.allAbsences[targetAbsenceIndex].absenceDescription = newDescription;
    this._databaseService.editItem(this._absencesStoreKey, this.allAbsences[targetAbsenceIndex])
      .pipe(take(1))
      .subscribe(() => {
      this._separateActvieEmployeesAbsences();
      this.absencesChanged.next(this.activeEmployeesAbsences.slice());
      });
  }
}
