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
  departmentDeleted: Subject<{ deptID: number, deptName: string, sectorsCount: number }> = new Subject();
  inAddMode: boolean = false;
  private readonly _storeDepartmentsKey: string = 'departmentsKey';
  private _departments: Department[];
  constructor(private sectorService: SectorService, private _utilsService: UtilsService) {
    // this._departments = [

    //   new Department(
    //     1,
    //     'development',
    //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
    //     17),
    //   new Department(
    //     2,
    //     'quality assurance',
    //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
    //     5),
    //   new Department(
    //     3,
    //     'sales',
    //     'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
    //   )
    // ];
    // this._saveDepartmentsToStore();
    this._departments = this._getDepartmentsFromStore();
  }

  private _getDepartmentsFromStore(): Department[] {
    const parsedDepartmentsList: any[] = this._utilsService.fetchData(this._storeDepartmentsKey);
    const departmentsList: Department[] = parsedDepartmentsList.map((dept) => {
      const department = new Department(dept._ID, dept._name, dept._description, dept.managerID);
      return department;
    });
    return departmentsList;
  }

  private _saveDepartmentsToStore(): void {
    this._utilsService.saveData(this._storeDepartmentsKey, this._departments);
  }

  getDepartments() {
    return this._departments.slice();
  }

  getSectorsByDepartmentID(deptID: number): Sector[] {
    return this.sectorService.getSectorsOfDepartment(deptID);
  }

  getDepartmentNameByID(deptID: number): string {
    return this._departments.find((dept) => dept.ID === deptID)?.name;
  }
  private _newDepartmentID(): number {
    return this._departments.length + 1;
  }
  createDepartment(name: string, description: string): Department[] {
    this._departments.push(new Department(this._newDepartmentID(), name, description));
    //here will be the Post request from  the server 
    this._saveDepartmentsToStore();
    this.departmentsChanged.next(this._departments.slice());
    return this.getDepartments();
  }

  deleteDepartment(deptID: number) {
    const targetDeptIndex = this._departments.findIndex((dept) => dept.ID === deptID);
    const deletedDept: Department = this._departments.splice(targetDeptIndex, 1)[0];
    const deletedDeptSectorCont: number = this.sectorService.getSectorsOfDepartment(deptID).length;
    this.sectorService.deleteAllSectorForDepartment(deptID);
    this._saveDepartmentsToStore();
    this.departmentsChanged.next(this._departments.slice());
    this.departmentDeleted.next({ deptID: deletedDept.ID, deptName: deletedDept.name, sectorsCount: deletedDeptSectorCont });
  }
  setDepartmentAttributes(deptID: number, newName: string, newDescription: string, newManagerID?: number) {
    const targetDepartmentIndex = this._departments.findIndex((dept) => dept.ID === deptID);
    if (targetDepartmentIndex === -1) {
      throw new Error(`department of ID '${deptID} is not exsit`);
    }
    this._departments[targetDepartmentIndex].name = newName;
    this._departments[targetDepartmentIndex].description = newDescription;
    if (newManagerID) {
      this._departments[targetDepartmentIndex].managerID = newManagerID;
    } else {
      this._departments[targetDepartmentIndex].managerID = null;
    }

    //here will be the PUT request from  the server 
    this._saveDepartmentsToStore();
    this.departmentsChanged.next(this._departments.slice());
  }

  getDepartmentByID(deptID: number): Department {
    return this._departments.find((dept) => dept.ID === deptID);
  }

  getDepartmentsCount(): number {
    return this._departments.length;
  }
}
