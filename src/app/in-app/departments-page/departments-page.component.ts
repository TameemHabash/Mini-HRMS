import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/classes/department';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit {
  departments: Department[];
  dialogRef: MatDialogRef<DepartmentDialogComponent>;
  constructor(private departmentsService: DepartmentService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departments = this.departmentsService.getDepartments();
    this.route.queryParams
      .subscribe((queryParams) => {
        if (!this.dialogRef) {
          if (queryParams.mode === 'show-and-edit') {
            this.dialog.open(DepartmentDialogComponent, { data: this.departmentsService.getDepartmentByID(+queryParams.id) });
          }
          else if (queryParams.mode === 'add') {
            this.dialog.open(DepartmentDialogComponent);
          }
        }
      });
  }
  onAddDepartment() {
    this.dialogRef = this.dialog.open(DepartmentDialogComponent);
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'add' } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
    //need to subscribe to department observable
  }
  onShowDepartmentDetails(department: Department) {
    this.dialogRef = this.dialog.open(DepartmentDialogComponent, { data: department });
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'show-and-edit', id: department.ID } });
    this.dialogRef.afterClosed()
      .pipe(finalize(() => { this.dialogRef = undefined }))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
  }
}
