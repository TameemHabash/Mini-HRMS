import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {
  selectedDepartment: Department = null;
  selectedDepartmentLastName: string = '';
  selectedDepartmentLastDescription: string = '';
  @ViewChild('departmentName', { static: true }) DepartmentNameElement: ElementRef;
  @ViewChild('departmentDescription', { static: true }) DepartmentDescriptionElement: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public recivedDept: Department, private deptService: DepartmentService) { }

  ngOnInit(): void {
    if (this.recivedDept) {
      this.selectedDepartment = this.recivedDept;
      this.selectedDepartmentLastName = this.selectedDepartment.name;
      this.selectedDepartmentLastDescription = this.selectedDepartment.description;
    }

    if (this.selectedDepartment) {
      this.DepartmentNameElement.nativeElement.value = this.selectedDepartment.name;
      this.DepartmentDescriptionElement.nativeElement.value = this.selectedDepartment.description;
    }

  }

  onUpdateDept(): void {
    if (this.selectedDepartmentLastName !== this.DepartmentNameElement.nativeElement.value || this.selectedDepartmentLastDescription !== this.DepartmentDescriptionElement.nativeElement.value) {
      this.deptService.setDepartmentAttributes(this.selectedDepartment.ID, this.DepartmentNameElement.nativeElement.value, this.DepartmentDescriptionElement.nativeElement.value);
    }
  }
  onAddDept() {
    if (this.DepartmentNameElement.nativeElement.value !== '' && this.DepartmentDescriptionElement.nativeElement.value !== '') {
      this.deptService.createDepartment(-1, this.DepartmentNameElement.nativeElement.value, this.DepartmentDescriptionElement.nativeElement.value);
    }
  }
}
