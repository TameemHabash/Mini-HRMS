import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence.model';
import { Subject } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../../models/employee.model';
import { UtilsService } from '../utils/utils.service';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  absencesChanged: Subject<Absence[]> = new Subject();
  allAbsences: Absence[];
  activeEmployeesAbsences: Absence[];
  employees: Employee[];
  private readonly _storeAbsencesKey: string = 'absencesKey';
  constructor(private _employeeService: EmployeeService, private _utilsService: UtilsService) {
    this.employees = this._employeeService.getEmployees();
    // this.allAbsences = [
    //   new Absence(1, 1, new Date(2020, 2, 5, 8), true, 'Pathological absence'),
    //   new Absence(2, 1, new Date(2020, 2, 11, 8), false),
    //   new Absence(3, 2, new Date(2020, 4, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(4, 3, new Date(2020, 3, 13), false),
    //   new Absence(5, 4, new Date(2020, 5, 11), true, 'Work permit'),
    //   new Absence(6, 4, new Date(2020, 2, 16), false),
    //   new Absence(7, 5, new Date(2020, 6, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(8, 6, new Date(2020, 4, 7), false),
    //   new Absence(8, 6, new Date(2020, 2, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(9, 7, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(10, 8, new Date(2020, 6, 7), false),
    //   new Absence(11, 8, new Date(2020, 5, 7), false),
    //   new Absence(12, 8, new Date(2020, 4, 7), false),
    //   new Absence(13, 9, new Date(2020, 3, 7), false),
    //   new Absence(14, 13, new Date(2020, 7, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(15, 10, new Date(2020, 3, 7), false),
    //   new Absence(16, 11, new Date(2020, 2, 7), false),
    //   new Absence(17, 11, new Date(2020, 5, 7), false),
    //   new Absence(18, 10, new Date(2020, 7, 7), false),
    //   new Absence(19, 14, new Date(2020, 0, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(20, 15, new Date(2020, 0, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(21, 13, new Date(2020, 4, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(22, 17, new Date(2020, 3, 7), false),
    //   new Absence(23, 16, new Date(2020, 5, 7), false),
    //   new Absence(24, 18, new Date(2020, 6, 7), false),
    //   new Absence(25, 22, new Date(2020, 4, 7), false),
    //   new Absence(26, 21, new Date(2020, 4, 7), false),
    //   new Absence(27, 19, new Date(2020, 4, 7), false),
    //   new Absence(28, 22, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(29, 15, new Date(2020, 2, 7), false),
    //   new Absence(30, 18, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(31, 22, new Date(2020, 4, 7), false),
    //   new Absence(32, 6, new Date(2020, 5, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(33, 13, new Date(2020, 5, 7), false),
    //   new Absence(34, 10, new Date(2020, 2, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(35, 20, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(36, 14, new Date(2020, 2, 11), true, 'Suspicion of COVID-19'),
    //   new Absence(37, 14, new Date(2020, 3, 7), false),
    //   new Absence(38, 9, new Date(2020, 1, 7), false),
    //   new Absence(39, 20, new Date(2020, 2, 7), false),
    //   new Absence(40, 9, new Date(2020, 3, 7), false),
    //   new Absence(41, 16, new Date(2020, 3, 7), false),
    //   new Absence(42, 17, new Date(2020, 7, 7), false),
    //   new Absence(43, 13, new Date(2020, 7, 7), false),

    // ];
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
