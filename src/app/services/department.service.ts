import { Injectable, OnInit } from '@angular/core';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements OnInit {
  private departments: Department[] = [
    new Department(1, 'programming', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus'),
    new Department(2, 'QA', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus'),
    new Department(3, 'deplooying', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus')
  ];

  constructor() { }
  ngOnInit() {
  }
  getDepartments() {
    return this.departments.slice();
  }
  createDepartment(id: number, name: string, description: string) {
    const newDepartment = new Department(id, name, description);
    this.departments.push(newDepartment);
    return this.getDepartments();
  }
}
