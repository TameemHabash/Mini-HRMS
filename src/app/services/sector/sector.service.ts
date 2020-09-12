import { Injectable } from '@angular/core';
import { Sector } from '../../models/sector.model';
import { UtilsService } from '../utils/utils.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SectorService {
  activeDepartmentID: number = -1;
  activeSectorID: number = -1;
  sectorsChanged: Subject<Sector[]> = new Subject();
  private readonly _storeSectorsKey: string = 'sectorsKey';
  private _sectors: Sector[];

  constructor(private _utilsService: UtilsService) {
    // this._sectors = [
    //   // this will be getted from the server  
    //   new Sector(1, 'Backend', 1),
    //   new Sector(2, 'Frontend', 1),
    //   new Sector(3, 'DevOps', 1),

    //   new Sector(4, 'standards', 2),
    //   new Sector(5, 'security testing', 2),
    //   new Sector(6, 'online sales', 3)
    // ];
    // this._saveSectorsToStore();
    this._sectors = this._getSectorsFromStore();
  }

  private _getSectorsFromStore(): Sector[] {
    const parsedSectorsList: any[] = this._utilsService.fetchData(this._storeSectorsKey);
    const sectorsList: Sector[] = parsedSectorsList.map((sect) => {
      const sector = new Sector(sect._ID, sect._name, sect._departmentID, sect._description);
      return sector;
    });
    return sectorsList;
  }

  private _saveSectorsToStore(): void {
    this._utilsService.saveData(this._storeSectorsKey, this._sectors);
  }

  getSectorsOfDepartment(departmentID: number): Sector[] {
    return this._sectors.filter((sector) => sector.departmentID === departmentID);
  }
  createSectorsInDepartmen(name: string, departmentID: number, description?: string): void {
    if (description) {
      this._sectors.push(new Sector(this._utilsService.generateRandomNumber(), name, departmentID, description));
    } else {
      this._sectors.push(new Sector(this._utilsService.generateRandomNumber(), name, departmentID));
    }
    // here i will send the post request
    this._saveSectorsToStore();
    this.sectorsChanged.next(this._sectors.slice());
  }

  deleteSector(sectorID: number): Sector {
    const targetSectorIndex = this._sectors.findIndex((sector) => sector.ID === sectorID);
    if (targetSectorIndex === -1) {
      throw new Error(`Sector of ID: '${sectorID}' is not exist`);
    }
    const deletedSector = this._sectors.splice(targetSectorIndex, 1)[0];
    // here i will send the delete request
    this._saveSectorsToStore();
    this.sectorsChanged.next(this._sectors.slice());
    return deletedSector;
  }

  deleteAllSectorForDepartment(deptID: number): void {
    this._sectors = this._sectors.filter((sect) => sect.departmentID !== deptID);
    // here i will send the delete request
    this._saveSectorsToStore();
    this.sectorsChanged.next(this._sectors.slice());
  }

  getSectorNameByID(sectorID: number): string {
    return this._sectors.find((sector) => sector.ID === sectorID)?.name;
  }
}