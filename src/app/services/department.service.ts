import { Injectable, } from '@angular/core';
import { Department } from '../models/department.model';
import { SectorService } from './sector.service';
import { Sector } from '../models/sector.model';
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
      17),
    new Department(
      2,
      'QA',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
      5),
    new Department(
      3,
      'deplooying',
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
    )
  ];


  getDepartments() {
    return this.departments.slice();
  }

  getSectorsByDepartmentID(deptID: number): Sector[] {
    return this.sectorService.getSectorsOfDepartment(deptID);
  }

  getDepartmentNameByID(deptID: number): string {
    return this.departments.find((dept) => dept.ID === deptID).name;
  }

  createDepartment(id: number, name: string, description: string): Department[] {
    this.departments.push(new Department(id, name, description));
    return this.getDepartments();
    //here will be the Post request from  the server 
    //here will be the fire of adding new department
  }

  setDepartmentAttributes(deptID: number, newName: string, newDescription: string, newManagerID?: number) {
    const targetDepartmentIndex = this.departments.findIndex((dept) => dept.ID === deptID);
    if (targetDepartmentIndex === -1) {
      throw new Error(`department of ID '${deptID} is not exsit`);
    }
    this.departments[targetDepartmentIndex].name = newName;
    this.departments[targetDepartmentIndex].description = newDescription;
    if (newManagerID) {
      this.departments[targetDepartmentIndex].managerID = newManagerID;
    } else {
      this.departments[targetDepartmentIndex].managerID = null;
    }

    //here will be the PUT request from  the server 
    // here will add the obsarvable fire for this change
  }

  getDepartmentByID(deptID: number): Department {
    return this.departments.find((dept) => dept.ID === deptID);
  }

}
