import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesPageComponent } from './absences-page.component';

describe('AbsencesPageComponent', () => {
  let component: AbsencesPageComponent;
  let fixture: ComponentFixture<AbsencesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsencesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
