import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  employeesCount: number = 0;
  departmentCount: number = 0;
  constructor(private router: Router, private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.employeesCount = this.statisticsService.getEmployeesCount();
    this.departmentCount = this.statisticsService.getDepartmentsCount();
  }

  goTo(path: string) {
    this.router.navigate(['HR', path]);
  }
}
