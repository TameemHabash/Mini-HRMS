import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectorService } from 'src/app/services/sector.service';
import { Sector } from 'src/app/models/sector.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sectors-dialog',
  templateUrl: './sectors-dialog.component.html',
  styleUrls: ['./sectors-dialog.component.css']
})
export class SectorsDialogComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public recivedDeptID, private _sectorService: SectorService) { }

  private _deptID: number;
  public sectors: Sector[];
  private _sectorsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this._deptID = this.recivedDeptID;
    this.sectors = this._sectorService.getSectorsOfDepartment(this._deptID);
    this._sectorsSubscription = this._sectorService.sectorsChanged
      .subscribe((newSectors: Sector[]) => this.sectors = newSectors.filter((sector) => sector.departmentID === this._deptID));
  }

  ngOnDestroy() {
    this._sectorsSubscription.unsubscribe();
  }
  onCreateSector(name: string, description?: string) {
    if (name !== '') {
      if (description !== '') {
        this._sectorService.createSectorsInDepartmen(name, this._deptID, description);
      } else {
        this._sectorService.createSectorsInDepartmen(name, this._deptID);
      }
    }
  }
  onDeletSector(sectorID: number) {
    this._sectorService.deleteSector(sectorID);
  }
}
