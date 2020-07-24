import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements AfterContentInit {
  departments: Department[];
  constructor(private departmentsServ: DepartmentService) { }

  ngAfterContentInit(): void {
    this.departments = this.departmentsServ.getDepartments();
  }


}
