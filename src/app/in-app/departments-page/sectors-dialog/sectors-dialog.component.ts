import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectorService } from 'src/app/services/sector.service';
import { Sector } from 'src/app/models/sector.model';
@Component({
  selector: 'app-sectors-dialog',
  templateUrl: './sectors-dialog.component.html',
  styleUrls: ['./sectors-dialog.component.css']
})
export class SectorsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public recivedDeptID, private sectorService: SectorService) { }

  private deptID: number;
  public sectors: Sector[];
  ngOnInit(): void {
    this.deptID = this.recivedDeptID;
    this.sectors = this.sectorService.getSectorsOfDepartment(this.deptID);
    //here will be the subscription of the sector observable to 
  }
  onCreateSector(name: string, description?: string) {
    if (name !== '') {
      if (description !== '') {
        this.sectorService.createSectorsInDepartmen(this.deptID, -1, name, description);
      }
      this.sectorService.createSectorsInDepartmen(this.deptID, -1, name);
    }
  }
  onDeletSector(sectorID: number) {
    this.sectorService.deleteSector(this.deptID, sectorID);
  }
}
