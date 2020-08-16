import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  AbsencesChanged: Subject<Absence[]> = new Subject();
  absences: Absence[];
  constructor() {
    this.absences = [
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
  }
  getAbsences(): Absence[] {
    return this.absences.slice();
  }
  getAbsencesByEmployeeID(empID: number): Absence[] {
    return this.absences.filter((abs) => abs.empID === empID);
  }

  editAbsence(absID: number, newExuse: boolean, newDescription: string): void {
    const targetAbsenceIndex = this.absences.findIndex((abs) => abs.ID === absID);
    this.absences[targetAbsenceIndex].excuse = newExuse;
    this.absences[targetAbsenceIndex].absenceDescription = newDescription;
    this.AbsencesChanged.next(this.absences.slice());
  }
}
