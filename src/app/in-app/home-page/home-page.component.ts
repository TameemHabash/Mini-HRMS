import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  employeesCount: number = 0;
  departmentCount: number = 0;
  constructor(private _router: Router, private _statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.employeesCount = this._statisticsService.getEmployeesCount();
    this.departmentCount = this._statisticsService.getDepartmentsCount();
  }

  goTo(path: string) {
    this._router.navigate(['HR', path]);
  }
}
