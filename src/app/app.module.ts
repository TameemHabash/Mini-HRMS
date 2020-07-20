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
    StatisticsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
