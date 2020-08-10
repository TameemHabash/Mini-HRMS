import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomePageComponent } from './in-app/home-page/home-page.component';
import { EmployeesPageComponent } from './in-app/employees-page/employees-page.component';
import { EmployeeDetailsPageComponent } from './in-app/employees-page/employee-details-page/employee-details-page.component';
import { AbsencesPageComponent } from './in-app/absences-page/absences-page.component';
import { DepartmentsPageComponent } from './in-app/departments-page/departments-page.component';
import { CreateDepartmentComponent } from './in-app/departments-page/create-department/create-department.component';
import { StatisticsPageComponent } from './in-app/statistics-page/statistics-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'HR', component: MainNavComponent, children: [
      { path: 'home', component: HomePageComponent },
      {
        path: 'employees', component: EmployeesPageComponent
      },
      { path: 'employees/:id', component: EmployeeDetailsPageComponent },
      { path: 'absences', component: AbsencesPageComponent },
      { path: 'departments', component: DepartmentsPageComponent },
      { path: 'statistics', component: StatisticsPageComponent },
      { path: 'not-found', component: PageNotFoundComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'not-found' }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: '/HR', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
