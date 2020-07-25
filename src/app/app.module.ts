import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HrDetailsComponent } from './main-nav/hr-details/hr-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AbsencesPageComponent } from './in-app/absences-page/absences-page.component';
import { DepartmentsPageComponent } from './in-app/departments-page/departments-page.component';
import { HomePageComponent } from './in-app/home-page/home-page.component';
import { EmployeesPageComponent } from './in-app/employees-page/employees-page.component';
import { EmployeeComponent } from './in-app/employees-page/employee/employee.component';
import { EmployeeDetailsPageComponent } from './in-app/employees-page/employee-details-page/employee-details-page.component';
import { StatisticsPageComponent } from './in-app/statistics-page/statistics-page.component';
import { AddEmployeeComponent } from './in-app/employees-page/add-employee/add-employee.component';
import { CreateDepartmentComponent } from './in-app/departments-page/create-department/create-department.component';
import { DepartmentComponent } from './in-app/departments-page/department/department.component';
import { ContentHeaderComponent } from './in-app/content-header/content-header.component';
import { DepartmentDialogComponent } from './in-app/departments-page/department-dialog/department-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { from } from 'rxjs';
import { SectorsDialogComponent } from './in-app/departments-page/sectors-dialog/sectors-dialog.component';


const material = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule
];


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HrDetailsComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    AbsencesPageComponent,
    DepartmentsPageComponent,
    HomePageComponent,
    EmployeesPageComponent,
    EmployeeComponent,
    EmployeeDetailsPageComponent,
    StatisticsPageComponent,
    AddEmployeeComponent,
    CreateDepartmentComponent,
    DepartmentComponent,
    ContentHeaderComponent,
    DepartmentDialogComponent,
    SectorsDialogComponent
  ],
  entryComponents: [
    DepartmentDialogComponent,
    SectorsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ...material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
