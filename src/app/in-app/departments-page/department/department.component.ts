import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { MatDialog } from '@angular/material/dialog';
import { SectorsDialogComponent } from '../sectors-dialog/sectors-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
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
  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

  }
  onShowSectors($event, deptID: number) {
    $event.stopPropagation();
    let dialog = this.dialog.open(SectorsDialogComponent, { data: deptID, width: '400px' });
    this.router.navigate([], { relativeTo: this.route, fragment: 'sectors' });
    dialog.afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
  }
}
