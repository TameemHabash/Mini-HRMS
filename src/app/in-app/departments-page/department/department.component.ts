import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'src/app/models/department';
import { MatDialog } from '@angular/material/dialog';
import { SectorsDialogComponent } from '../sectors-dialog/sectors-dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() department: Department;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onShowSectors($event, deptID: number) {
    $event.stopPropagation();
    this.dialog.open(SectorsDialogComponent, { data: deptID, width: '400px' });
  }
}
