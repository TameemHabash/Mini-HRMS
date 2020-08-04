import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() departmentName: string;
  @Input() sectorName: string;
  @Input() activePage: boolean;
  @Output() employeeStateChange: EventEmitter<{ employee: Employee, newState: boolean }> = new EventEmitter();
  @Output() showEmployeeDetails: EventEmitter<Employee> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  onEditEmployee() {
    this.showEmployeeDetails.emit(this.employee);
  }

  onArchive() {
    //open confirmation dialog
    if (true) {
      this.employeeStateChange.emit({ employee: this.employee, newState: false });
    }
  }

  onUnarchive() {
    //open confirmation dialog
    if (true) {
      this.employeeStateChange.emit({ employee: this.employee, newState: true });
    }
  }
}
