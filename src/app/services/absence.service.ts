import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence.model';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  absencesChanged: Subject<Absence[]> = new Subject();
  allAbsences: Absence[];
  activeEmployeesAbsences: Absence[];
  employees: Employee[];
  constructor(private _employeeService: EmployeeService) {
    this.employees = this._employeeService.getEmployees();
    this.allAbsences = [
      new Absence(1, 1, new Date(2020, 7, 5, 8), true, 'Pathological absence'),
      new Absence(2, 1, new Date(2020, 7, 11, 8), false),
      new Absence(3, 2, new Date(2020, 7, 11), true, 'Suspicion of COVID-19'),
      new Absence(4, 3, new Date(2020, 7, 13), false),
      new Absence(5, 4, new Date(2020, 7, 11), true, 'Work permit'),
      new Absence(6, 4, new Date(2020, 7, 16), false),
      new Absence(7, 5, new Date(2020, 7, 11), true, 'Suspicion of COVID-19'),
      new Absence(8, 6, new Date(2020, 7, 7), false),
      new Absence(8, 6, new Date(2020, 7, 11), true, 'Suspicion of COVID-19'),
      new Absence(9, 7, new Date(2020, 7, 11), true, 'Suspicion of COVID-19'),
    ];

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
    this.activeEmployeesAbsences[targetAbsenceIndex].excuse = newExuse;
    this.activeEmployeesAbsences[targetAbsenceIndex].absenceDescription = newDescription;
    this.absencesChanged.next(this.activeEmployeesAbsences.slice());
  }
}
