import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence.model';
import { Subject } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../../models/employee.model';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  absencesChanged: Subject<Absence[]> = new Subject();
  allAbsences: Absence[];
  activeEmployeesAbsences: Absence[];
  employees: Employee[];
  private readonly _storeAbsencesKey: string = 'absencesKey';
  constructor(private seedService: SeedService, private _employeeService: EmployeeService, private _utilsService: UtilsService) {
    this.employees = this._employeeService.getEmployees();
    // this.allAbsences = this.seedService.getAbsences();
    // this._saveAbsencesToStore();
    this.allAbsences = this._getAbsencesFromStore();
    this._separateActvieEmployeesAbsences();
  }

  private _getAbsencesFromStore(): Absence[] {
    const parsedAbsencesList: any[] = this._utilsService.fetchData(this._storeAbsencesKey);
    const absenceList: Absence[] = parsedAbsencesList.map((abs) => {
      const absence = new Absence(abs.absenceID, abs.employeeID, new Date(abs.absenceDate), abs.excuse, abs.absenceDescription);
      return absence;
    });
    return absenceList;
  }

  private _saveAbsencesToStore(): void {
    this._utilsService.saveData(this._storeAbsencesKey, this.allAbsences);
  }
  private _separateActvieEmployeesAbsences(): void {
    this.activeEmployeesAbsences = this.allAbsences.filter((abs) => {
      const employee = this.employees.find((emp) => emp.ID === abs.empID);
      return employee !== undefined;
    });
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
    this._saveAbsencesToStore();
    this._separateActvieEmployeesAbsences();
    this.absencesChanged.next(this.activeEmployeesAbsences.slice());
  }
}
