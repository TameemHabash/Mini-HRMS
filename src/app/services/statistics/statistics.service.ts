import { Injectable } from '@angular/core';
import { DepartmentService } from '../department/department.service';
import { EmployeeService } from '../employee/employee.service';

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
