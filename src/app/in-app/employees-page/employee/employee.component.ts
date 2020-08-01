import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {

  }

}
