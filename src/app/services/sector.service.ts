import { Injectable } from '@angular/core';
import { Sector } from '../models/sector.model';
import { UtilsService } from '../services/utils.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SectorService {
  activeDepartmentID: number = -1;
  activeSectorID: number = -1;
  sectorsChanged: Subject<Sector[]> = new Subject();
  private sectors: Sector[] = [
    // this will be getted from the server  
    new Sector(1, 'Backend', 1),
    new Sector(2, 'Frontend', 1),
    new Sector(3, 'DevOps', 1),

    new Sector(4, 'standards', 2),
    new Sector(5, 'security testing', 2),
    new Sector(6, 'online sales', 3)
  ];

  constructor(private utils: UtilsService) { }
  // getTargetSectorsAndSrctor() {
  //   if (this.activeDepartmentID===-1 || this.activeSectorID===-1) {
  //     return {targetSectorsIndex:-1,targetSectorIndex:-1};
  //   }
  //   const targetSectorsIndex = this.outSectors.findIndex((dept) => dept.departmentID === this.activeDepartmentID);
  //   const targetSectorIndex = this.outSectors[targetSectorsIndex].sectors.findIndex((sect) => sect.ID === this.activeSectorID);
  //   return {targetSectorsIndex:targetSectorsIndex,targetSectorIndex:targetSectorIndex};
  // }

  getSectorsOfDepartment(departmentID: number): Sector[] {
    return this.sectors.filter((sector) => sector.departmentID === departmentID);
  }
  createSectorsInDepartmen(name: string, departmentID: number, description?: string): void {
    if (description) {
      this.sectors.push(new Sector(this.utils.generateRandomNumber(), name, departmentID, description));
    } else {
      this.sectors.push(new Sector(this.utils.generateRandomNumber(), name, departmentID));
    }
    // here i will send the post request
    this.sectorsChanged.next(this.sectors.slice());
  }

  deleteSector(sectorID: number): Sector {
    const targetSectorIndex = this.sectors.findIndex((sector) => sector.ID === sectorID);
    if (targetSectorIndex === -1) {
      throw new Error(`Sector of ID: '${sectorID}' is not exist`);
    }
    const deletedSector = this.sectors.splice(targetSectorIndex, 1)[0];
    // here i will send the delete request
    this.sectorsChanged.next(this.sectors.slice());
    return deletedSector;
  }

  deleteAllSectorForDepartment(deptID: number): void {
    const deletedSectors: Sector[] = [];
    this.sectors = this.sectors.filter((sect) => sect.departmentID !== deptID);
    // here i will send the delete request
    this.sectorsChanged.next(this.sectors.slice());
  }

  getSectorNameByID(sectorID: number): string {
    return this.sectors.find((sector) => sector.ID === sectorID)?.name;
  }
}