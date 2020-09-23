import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department/department.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SalaryService } from 'src/app/services/salary/salary.service';
import { AbsenceService } from 'src/app/services/absence/absence.service';
import { Department } from 'src/app/models/department.model';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit, OnDestroy {
  pieChartTitle = 'Salary';
  pieChartType = 'PieChart';
  pieChartColumnNames = ['Salary class ', 'Employees'];
  pieChartData: [string, number][] = [];
  pieChartOptions = {
    pieHole: 0.35
  };
  barChartTitle = 'Absences';
  barChartType = 'ColumnChart';
  barChartColumnNames: Array<string> = ['month'];
  barChartData: Array<any> = [];
  barChartOptions = {
    legend: { position: 'bottom' },
    axes: {
      x: {
        0: { side: 'top', label: 'White to move' } // Top x-axis.
      }
    },
    bar: { groupWidth: "60%" },
  };
  width = 800;
  height = 250;
  private _lastDeptsListLength: number = 0;
  departments: Department[] = [];
  private _subscriptions: Subscription[] = [];
  dataReady: { dept: boolean, barChart: boolean, pieChar: boolean } = { dept: false, barChart: false, pieChar: false };
  constructor(private _statisticsService: StatisticsService) { }

  ngOnInit(): void {
    const stisSubscription = this._statisticsService.statisticsChanged.subscribe((statistics) => {
      this.departments = statistics.departments;
      this._checkReady();

    });
    const dataSubscription = this._statisticsService.chartsDataChanged.subscribe((data => {
      this.barChartData = data.barChartData;
      this.pieChartData = data.pieChartData;
      this._checkReady();
    }));
    this._subscriptions.push(stisSubscription);
    this._subscriptions.push(dataSubscription);
    this.departments = this._statisticsService.getDepartments();
    this.pieChartData = this._statisticsService.getPieChartData();
    this.barChartData = this._statisticsService.getBarChartData();
    this._lastDeptsListLength = this.departments.length;
    this.departments.forEach((dept) => { this.barChartColumnNames.push(dept.name) });
    this._checkReady();
  }

  ngOnDestroy() {
    this._subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  getSectorsConut(deptID: number): number {
    return this._statisticsService.getSectorsConut(deptID);
  }

  getEmployeesCountByDepartment(deptID: number): number {
    return this._statisticsService.getEmployeesCountByDepartment(deptID);
  }
  private _checkReady() {
    if (this.barChartData.length > 0) {
      this.dataReady.barChart = true;
    }
    if (this.pieChartData.length > 0) {
      this.dataReady.pieChar = true;
    }
    if (this.departments.length > 0) {
      if (this._lastDeptsListLength === 0 && this.departments.length > 0) {
        this._lastDeptsListLength = this.departments.length;
        this.departments.forEach((dept) => { this.barChartColumnNames.push(dept.name) });
      }
      this.dataReady.dept = true;
    }
  }
}
