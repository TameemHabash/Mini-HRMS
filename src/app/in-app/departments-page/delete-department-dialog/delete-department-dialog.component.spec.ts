import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepartmentDialogComponent } from './delete-department-dialog.component';

describe('DeleteDepartmentDialogComponent', () => {
  let component: DeleteDepartmentDialogComponent;
  let fixture: ComponentFixture<DeleteDepartmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDepartmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
