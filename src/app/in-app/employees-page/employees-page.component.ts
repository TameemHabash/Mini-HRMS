import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }
  employees: Employee[];
  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

}
