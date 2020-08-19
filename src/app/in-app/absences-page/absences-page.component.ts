import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbsenceService } from 'src/app/services/absence.service';
import { Absence } from 'src/app/models/absence.model';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-absences-page',
  templateUrl: './absences-page.component.html',
  styleUrls: ['./absences-page.component.css']
})
export class AbsencesPageComponent implements OnInit, OnDestroy {
  absences: Absence[];
  absencesToShow: Absence[];
  selectedAbsence: Absence;
  supscription: Subscription;
  inEditMode: boolean;
  employees: Employee[];
  constructor(private _absenceService: AbsenceService) { }


  ngOnInit(): void {
    this.employees = this._absenceService.getEmployees();
    this.absences = this._absenceService.getAbsences();
    this.supscription = this._absenceService.absencesChanged.subscribe((newAbsences: Absence[]) => {
      this.absences = newAbsences;
    });
  }

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }

  getemployeeNameByID(empID: number): string {
    return this.employees.find((emp => emp.ID === empID)).name;
  }

  onEditAbsence(absence: Absence) {
    this.selectedAbsence = absence;
    this.inEditMode = true;
  }

  onUpdateAbsence() {
    this._absenceService.editAbsence(this.selectedAbsence.ID, this.selectedAbsence.excuse, this.selectedAbsence.absenceDescription);
    this.inEditMode = false;
    this.selectedAbsence = null;
  }

  changeDescription(newDescription: string) {
    if (newDescription.trim() === '') {
      this.selectedAbsence.absenceDescription = undefined;
    } else {
      this.selectedAbsence.absenceDescription = newDescription.trim();
    }
  }

  onChangeSlide(newAbsencesToView: Absence[]) {
    this.absencesToShow = newAbsencesToView;
  }
}
