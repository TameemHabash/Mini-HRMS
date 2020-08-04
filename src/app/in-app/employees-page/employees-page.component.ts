import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent implements OnInit {
  employees: Employee[];
  employeesToShow: Employee[];
  active: boolean = true;
  constructor(public employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }
  //subscribe to changes on employees list in the service
  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.route.fragment.subscribe((freg) => {
      if (freg === 'archived') {
        this.employees = this.employeeService.getInactiveEmployees();
        this.active = false;

      } else {
        this.employees = this.employeeService.getEmployees();
        this.active = true;
      }
    });
  }
  pageChanged(newViewList: Employee[]) {
    this.employeesToShow = newViewList;
  }
  onNavigateToArchivedEmployees() {
    this.router.navigate([], { relativeTo: this.route, fragment: 'archived' });
  }
  onNavigateToActiveEmployees() {
    this.router.navigate([], { relativeTo: this.route });
  }

  showEmployee(employee: Employee) {
    //open employee component
  }
  employeeStateChanged(emp: { employee: Employee, newState: boolean }) {
    emp.newState ?
      this.employeeService.unarchiveEmployee(emp.employee.ID)
      : this.employeeService.archiveEmployee(emp.employee.ID);
  }
}
