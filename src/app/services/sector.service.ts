import { Injectable } from '@angular/core';
import { Sector } from '../models/sector.model';


@Injectable({
  providedIn: 'root'
})
export class SectorService {
  activeDepartmentID: number = -1;
  activeSectorID: number = -1;
  private sectors: Sector[] = [
    // this will be getted from the server  
    new Sector(1, 'java', 1),
    new Sector(2, 'paython', 1),
    new Sector(3, 'helo', 2),
    new Sector(4, 'Hi', 2),
    new Sector(5, 'HR', 3),
    new Sector(6, 'heRes', 3)
  ];

  constructor() { }
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
  createSectorsInDepartmen(id: number, name: string, departmentID: number, description?: string): void {
    if (description) {
      this.sectors.push(new Sector(id, name, departmentID, description));
    } else {
      this.sectors.push(new Sector(id, name, departmentID));
    }
    // here i will send the post request
    // here will also fire the observable for adding a sector
  }

  deleteSector(sectorID: number): Sector {
    const targetSectorIndex = this.sectors.findIndex((sector) => sector.ID === sectorID);
    if (targetSectorIndex === -1) {
      throw new Error(`Sector of ID: '${sectorID}' is not exist`);
    }
    const deletedSector = this.sectors.splice(targetSectorIndex, 1)[0];
    return deletedSector;
    // here i will send the delete request
    // here will also fire the observable for removing a sector
  }

  getSectorNameByID(sectorID: number): string {
    return this.sectors.find((sector) => sector.ID === sectorID).name;
  }
}