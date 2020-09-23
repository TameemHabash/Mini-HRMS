import { Injectable } from '@angular/core';
import { Sector } from '../../models/sector.model';
import { Observable, Subject } from 'rxjs';
import { SeedService } from '../seed/seed.service';
import { DatabaseService } from '../database/database.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  activeDepartmentID: number = -1;
  activeSectorID: number = -1;
  sectorsChanged: Subject<Sector[]> = new Subject();
  private readonly _sectorsStoreKey: string = 'sector';
  private _sectors: Sector[];

  constructor(private seedService: SeedService, private _databaseService: DatabaseService) {
    // this._sectors = this.seedService.getSectors();
    // this._sectors.forEach((sector) => {
    //   this._databaseService.addItem(this._sectorsStoreKey, sector);
    // });
    this._getSectorsFromStore()
      .pipe(map((sectorsObjectsList): Sector[] => {
        return sectorsObjectsList.map((sectObject: any) => new Sector(sectObject));
      }), take(1))
      .subscribe((storedSectorsList: Sector[]) => {
        this._sectors = storedSectorsList;
        this.sectorsChanged.next(this._sectors.slice());
      });
  }

  private _getSectorsFromStore(): Observable<Sector[]> {
    return this._databaseService.getAll(this._sectorsStoreKey);
  }

  getSectorsOfDepartment(departmentID: number): Sector[] {
    return this._sectors.filter((sector) => sector.departmentID === departmentID);
  }
  createSectorsInDepartmen(name: string, departmentID: number, description?: string): void {
    // here i will send the post request
    this._databaseService.addItem(this._sectorsStoreKey, new Sector(this._newSectorID(), name, departmentID, description))
      .pipe(map((newSecObj) => new Sector(newSecObj)), take(1))
      .subscribe((newSector) => {
        this._sectors.push(newSector);
        this.sectorsChanged.next(this._sectors.slice());
      });
  }

  private _newSectorID(): number {
    let newID: number = 1;
    this._sectors.forEach((sec) => {
      if (sec.ID >= newID)
        newID = sec.ID + 1;
    });
    return newID;
  }

  deleteSector(sectorID: number): void {
    const targetSectorIndex = this._sectors.findIndex((sector) => sector.ID === sectorID);
    if (targetSectorIndex === -1) {
      throw new Error(`Sector of ID: '${sectorID}' is not exist`);
    }
    // here i will send the delete request
    this._databaseService.deleteItem(this._sectorsStoreKey, this._sectors[targetSectorIndex])
      .pipe(take(1))
      .subscribe(() => {
        this._sectors.splice(targetSectorIndex, 1);
        this.sectorsChanged.next(this._sectors.slice());
      });
  }

  deleteAllSectorForDepartment(deptID: number): void {
    const sectorsToDelete: Sector[] = this._sectors.filter((sect) => sect.departmentID === deptID);
    // here i will send the delete requests
    this._databaseService.deleteItems(this._sectorsStoreKey, sectorsToDelete)
      .pipe(take(1))
      .subscribe(() => {
        this._sectors = this._sectors.filter((sect) => sect.departmentID !== deptID);
        this.sectorsChanged.next(this._sectors.slice());
      });
  }

  getSectorNameByID(sectorID: number): string {
    return this._sectors.find((sector) => sector.ID === sectorID)?.name;
  }
}