import { Injectable, } from '@angular/core';
import { Department } from '../models/department.model';
import { SectorService } from './sector.service';
import { Sector } from '../models/sector.model';
import { UtilsService } from './utils.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  activeDepartmentID: number = -1;
  departmentsChanged: Subject<Department[]> = new Subject();
  constructor(private sectorService: SectorService, private utils: UtilsService) { }
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

  createDepartment(name: string, description: string): Department[] {
    this.departments.push(new Department(this.utils.generateRandomNumber(2), name, description));
    //here will be the Post request from  the server 
    this.departmentsChanged.next(this.departments.slice());
    return this.getDepartments();
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
    this.departmentsChanged.next(this.departments.slice());
  }

  getDepartmentByID(deptID: number): Department {
    return this.departments.find((dept) => dept.ID === deptID);
  }

}
