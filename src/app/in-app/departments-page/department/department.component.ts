import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { MatDialog } from '@angular/material/dialog';
import { SectorsDialogComponent } from '../sectors-dialog/sectors-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Sector } from 'src/app/models/sector.model';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() department: Department;
  @Input() sectors: Sector[];
  @Input() employeesNumber: number;
  @Input() manager: Employee;
  sectorHover: boolean = false;
  constructor(private _dialog: MatDialog, private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit(): void {

  }
  onShowSectors($event, deptID: number) {
    $event.stopPropagation();
    let dialog = this._dialog.open(SectorsDialogComponent, { data: deptID, width: '400px' });
    this._router.navigate([], { relativeTo: this._route, fragment: 'sectors' });
    dialog.afterClosed()
      .pipe(take(1))
      .subscribe(
        () => {
          this._router.navigate([], { relativeTo: this._route });
        }
      );
  }
}
