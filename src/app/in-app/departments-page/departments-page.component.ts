import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/classes/department';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements AfterContentInit {
  departments: Department[];
  constructor(private departmentsService: DepartmentService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngAfterContentInit(): void {
    this.departments = this.departmentsService.getDepartments();
  }
  onAddDepartment() {
    let dialog = this.dialog.open(DepartmentDialogComponent);
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'add' } });
    dialog.afterClosed()
      .pipe(finalize(() => console.log("completed")))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
    //need to subscribe to department observable
  }
  onShowDepartmentDetails(department) {
    let dialog = this.dialog.open(DepartmentDialogComponent, { data: department });
    this.router.navigate([], { relativeTo: this.route, fragment: 'department', queryParams: { mode: 'show-and-edit' } });
    dialog.afterClosed()
      .pipe(finalize(() => { }))
      .subscribe(
        () => {
          this.router.navigate([], { relativeTo: this.route });
        }
      );
  }
}
