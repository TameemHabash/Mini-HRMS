import { Injectable } from '@angular/core';
import { Sector } from '../models/sector.model';

interface OutSectors {
  departmentID: number;
  sectors: Sector[];
}

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  activeDepartmentID: number = -1;
  activeSectorID: number = -1;
  private outSectors: OutSectors[] = [
    // this will be getted from the server  
    { departmentID: 1, sectors: [new Sector(1, 'java'), new Sector(2, 'paython')] },
    { departmentID: 2, sectors: [new Sector(3, 'helo'), new Sector(4, 'Hi')] },
    { departmentID: 3, sectors: [new Sector(5, 'HR'), new Sector(6, 'heRes')] }
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

  getSectorsOfDepartment(departmentID: number) {
    const targetSectors = this.outSectors.find((dept) => dept.departmentID === departmentID);
    if (targetSectors) {
      return targetSectors.sectors.slice();
    }
    return [];
  }
  createSectorsInDepartmen(departmentID: number, id: number, name: string, description?: string) {
    const targetSectorsIndex = this.outSectors.findIndex((dept) => dept.departmentID === departmentID);
    if (targetSectorsIndex === -1) {
      throw new Error(`Department of ID: '${departmentID}' is not exist`);
    }
    if (description) {
      this.outSectors[targetSectorsIndex].sectors.push(new Sector(id, name, description));
    }
    this.outSectors[targetSectorsIndex].sectors.push(new Sector(id, name));
    // here i will send the post request
    // here will also fire the observable for adding a sector
  }

  deleteSector(departmentID: number, sectorID: number) {
    const targetSectorsIndex = this.outSectors.findIndex((dept) => dept.departmentID === departmentID);
    if (targetSectorsIndex === -1) {
      throw new Error(`Department of ID: '${departmentID}' is not exist`);
    }
    let targetSectorIndex = this.outSectors[targetSectorsIndex].sectors.findIndex((sect) => sect.ID === sectorID);
    this.outSectors[targetSectorsIndex].sectors.splice(targetSectorIndex, 1);
    // here i will send the delete request
    // here will also fire the observable for removing a sector
  }


  // editSectorName(newName: string) {
  //   if (newName !== '') {
  //     const targetIndexs= this.getTargetSectorsAndSrctor();
  //     this.outSectors[targetIndexs.targetSectorsIndex].sectors[targetIndexs.targetSectorIndex].name = newName;
  //   }
  // }
}