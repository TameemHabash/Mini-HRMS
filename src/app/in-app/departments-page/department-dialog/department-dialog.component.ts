import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {
  selectedDepartment: Department = null;
  selectedDepartmentLastName: string = '';
  selectedDepartmentLastDescription: string = '';
  selectedDepartmentLastManager: Employee;
  managerFormConrol = new FormControl();
  selectedManager: Employee;
  depertmentEmployees: Employee[];
  filteredEmployees: Observable<Employee[]>;
  @ViewChild('departmentName', { static: true }) DepartmentNameElement: ElementRef;
  @ViewChild('departmentDescription', { static: true }) DepartmentDescriptionElement: ElementRef;
  @ViewChild('manager', { static: true }) managerElement: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public recivedData: { department: Department, manager: Employee }, private deptService: DepartmentService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    if (this.recivedData) {
      this.selectedDepartment = this.recivedData.department;
      this.selectedDepartmentLastName = this.selectedDepartment.name;
      this.selectedDepartmentLastDescription = this.selectedDepartment.description;
      this.depertmentEmployees = this.employeeService.getEmployeesByDepartmentID(this.selectedDepartment.ID);
      if (this.recivedData.manager) {
        this.selectedManager = this.recivedData.manager;
      }
      this.filteredEmployees = this.managerFormConrol.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.depertmentEmployees.slice())
        );
    }

    if (this.selectedDepartment) {
      this.DepartmentNameElement.nativeElement.value = this.selectedDepartment.name;
      this.DepartmentDescriptionElement.nativeElement.value = this.selectedDepartment.description;
    }

    if (this.selectedManager) {
      this.managerFormConrol.setValue(this.selectedManager);
      this.selectedDepartmentLastManager = this.managerFormConrol.value;
    }

  }

  private _filter(name: string): Employee[] {
    const filterValue = name.toLowerCase();

    return this.depertmentEmployees.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  diplayEmployee(emp: Employee): string {
    return emp && emp.name ? emp.name : '';
  }
  onUpdateDept(): void {
    if (this.selectedDepartmentLastName !== this.DepartmentNameElement.nativeElement.value || this.selectedDepartmentLastDescription !== this.DepartmentDescriptionElement.nativeElement.value || this.managerFormConrol?.value?.ID !== this.selectedDepartmentLastManager?.ID) {
      this.deptService.setDepartmentAttributes(this.selectedDepartment.ID, this.DepartmentNameElement.nativeElement.value, this.DepartmentDescriptionElement.nativeElement.value, this.managerFormConrol?.value?.ID);
    }
  }
  onAddDept() {
    if (this.DepartmentNameElement.nativeElement.value !== '' && this.DepartmentDescriptionElement.nativeElement.value !== '') {
      this.deptService.createDepartment(-1, this.DepartmentNameElement.nativeElement.value, this.DepartmentDescriptionElement.nativeElement.value);
    }
  }
}
