import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-department-dialog',
  template: `
    <p class="mx-auto text-center">
      <span class="app-main-color font-weight-bold">{{deletedDeptDetails.deptName}}</span>  department <br>Of ID <span class="app-main-color font-weight-bold">'{{deletedDeptDetails.deptID}}'</span> <br> which have <span class="app-main-color font-weight-bold"> {{deletedDeptDetails.sectorsCount}}</span>  Sectors <br> was <span class="text-danger">Deleted</span> 
    </p>
    <mat-dialog-actions>
    <button mat-raised-button mat-dialog-close class="app-bg-main text-white mx-auto mt-3">Ok</button>
    </mat-dialog-actions>
  `,
  styles: [`
  p {font-size:1rem;
  line-height:1.8rem}
  `
  ]
})
export class DeleteDepartmentDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deletedDeptDetails: { deptID: number, deptName: string, sectorsCount: number }) { }

  ngOnInit(): void {
  }

}
