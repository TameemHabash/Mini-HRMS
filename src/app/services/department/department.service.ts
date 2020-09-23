import { Injectable, } from '@angular/core';
import { Department } from '../../models/department.model';
import { SectorService } from '../sector/sector.service';
import { Sector } from '../../models/sector.model';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  activeDepartmentID: number = -1;
  departmentsChanged: Subject<Department[]> = new Subject();
  departmentDeleted: Subject<{ deptID: number, deptName: string, sectorsCount: number }> = new Subject();
  inAddMode: boolean = false;
  private readonly _departmentStoreKey: string = 'department';
  private _departments: Department[] = [];
  constructor(private seedService: SeedService, private _databaseService: DatabaseService, private sectorService: SectorService, private _utilsService: UtilsService) {
    // this._departments = this.seedService.getDepartments();
    // this._departments.forEach((dept) => {
    //   this._databaseService.addItem(this._departmentStoreKey, dept);
    // });
    this._getDepartmentsFromStore()
      .pipe(map((departmentsObjectsList): Department[] => {
        return departmentsObjectsList.map((objDept: any) => new Department(objDept));
      }), take(1))
      .subscribe((storedDeptList) => {
        this._departments = storedDeptList;
        this.departmentsChanged.next(this._departments.slice());
      });
  }

  private _getDepartmentsFromStore(): Observable<Department[]> {
    return this._databaseService.getAll(this._departmentStoreKey);
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
    let newID: number = 1;
    this._departments.forEach((dept) => {
      if (dept.ID >= newID)
        newID = dept.ID + 1;
    });
    return newID;
  }
  createDepartment(name: string, description: string): Department[] {
    //here will be the Post request from  the server 
    this._databaseService.addItem(this._departmentStoreKey, new Department(this._newDepartmentID(), name, description))
      .pipe(map((newDeptObj) => new Department(newDeptObj)), take(1))
      .subscribe((newDpet) => {
        this._departments.push(newDpet);
        this.departmentsChanged.next(this._departments.slice());
      });
    return this.getDepartments();
  }

  deleteDepartment(deptID: number) {
    const targetDeptIndex = this._departments.findIndex((dept) => dept.ID === deptID);
    const deletedDeptSectorCont: number = this.sectorService.getSectorsOfDepartment(deptID).length;
    this.sectorService.deleteAllSectorForDepartment(deptID);
    this._databaseService.deleteItem(this._departmentStoreKey, this._departments[targetDeptIndex])
      .pipe(take(1))
      .subscribe(() => {
        const deletedDept: Department = this._departments.splice(targetDeptIndex, 1)[0];
        this.departmentDeleted.next({ deptID: deletedDept.ID, deptName: deletedDept.name, sectorsCount: deletedDeptSectorCont });
        this.departmentsChanged.next(this._departments.slice());
      });

  }

  updateDepartment(deptID: number, newName: string, newDescription: string, newManagerID?: number) {
    const targetDepartmentIndex = this._departments.findIndex((dept) => dept.ID === deptID);
    if (targetDepartmentIndex === -1) {
      throw new Error(`department of ID '${deptID} is not exsit`);
    }
    //here will be the PUT request from  the server 
    this._databaseService.editItem(this._departmentStoreKey, this._departments[targetDepartmentIndex])
      .pipe(take(1)).subscribe(() => {
        this._departments[targetDepartmentIndex].name = newName;
        this._departments[targetDepartmentIndex].description = newDescription;
        if (newManagerID) {
          this._departments[targetDepartmentIndex].managerID = newManagerID;
        } else {
          this._departments[targetDepartmentIndex].managerID = null;
        }
        this.departmentsChanged.next(this._departments.slice());
      });
  }

  getDepartmentByID(deptID: number): Department {
    return this._departments.find((dept) => dept.ID === deptID);
  }

  getDepartmentsCount(): number {
    return this._departments.length;
  }
}
