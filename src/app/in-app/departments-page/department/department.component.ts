import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() department: Department;
  constructor() { }

  ngOnInit(): void {
  }

}
