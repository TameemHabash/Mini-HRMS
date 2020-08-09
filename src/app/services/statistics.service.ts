import { Injectable } from '@angular/core';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private departmentService: DepartmentService, private employeeService: EmployeeService) { }
  getEmployeesCount(): number {
    return this.employeeService.getEmployeesCount();
  }

  getDepartmentsCount(): number {
    return this.departmentService.getDepartmentsCount();
  }
}
