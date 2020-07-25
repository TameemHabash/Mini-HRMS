import { Injectable, OnInit } from '@angular/core';
import { Department } from '../models/department';
import { SectorService } from './sector.service';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  activeDepartmentID: number = -1;
  constructor(private sectorService: SectorService) { }
  private departments: Department[] = [
    // here i will get the deparments from the server without it's sectors
    // 
    // 
    new Department(
      1,
      'programming',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
      10,
      this.sectorService.getSectorsOfDepartment(1)),
    new Department(
      2,
      'QA',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
      15,
      this.sectorService.getSectorsOfDepartment(2)),
    new Department(
      3,
      'deplooying',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
      8,
      this.sectorService.getSectorsOfDepartment(3))
  ];


  getDepartments() {
    return this.departments.slice();
  }
  createDepartment(id: number, name: string, description: string) {
    const newDepartment = new Department(id, name, description, 0, []);
    this.departments.push(newDepartment);
    return this.getDepartments();
  }

  setDepartmentAttributes(deptID: number, newName: string, newDescription: string) {
    const targetDepartmentIndex = this.departments.findIndex((dept) => dept.ID === deptID);
    if (targetDepartmentIndex === -1) {
      throw new Error(`department ID '${deptID} is not exsit`);
    }
    this.departments[targetDepartmentIndex].name = newName;
    this.departments[targetDepartmentIndex].description = newDescription;
    //here will be the PUT request from  the server 
    // here will add the obsarvable fire for this change
  }

}
