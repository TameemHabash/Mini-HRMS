import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectorService } from 'src/app/services/sector.service';
import { Sector } from 'src/app/models/sector.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sectors-dialog',
  templateUrl: './sectors-dialog.component.html',
  styleUrls: ['./sectors-dialog.component.css']
})
export class SectorsDialogComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public recivedDeptID, private sectorService: SectorService) { }

  private deptID: number;
  public sectors: Sector[];
  private sectorsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.deptID = this.recivedDeptID;
    this.sectors = this.sectorService.getSectorsOfDepartment(this.deptID);
    this.sectorsSubscription = this.sectorService.sectorsChanged
      .subscribe((newSectors: Sector[]) => this.sectors = newSectors.filter((sector) => sector.departmentID === this.deptID));
  }

  ngOnDestroy() {
    this.sectorsSubscription.unsubscribe();
  }
  onCreateSector(name: string, description?: string) {
    if (name !== '') {
      if (description !== '') {
        this.sectorService.createSectorsInDepartmen(name, this.deptID, description);
      } else {
        this.sectorService.createSectorsInDepartmen(name, this.deptID);
      }
    }
  }
  onDeletSector(sectorID: number) {
    this.sectorService.deleteSector(sectorID);
  }
}
