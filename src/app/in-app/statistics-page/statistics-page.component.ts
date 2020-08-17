import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {
  pieChartTitle = 'Salary';
  pieChartType = 'PieChart';
  pieChartColumnNames = ['Salary class ', 'Employees'];
  pieChartData: [string, number][] = [
    ['400-500', 20],
    ['500-600', 8],
    ['600-700', 5],
    ['1200-800', 15],
    ['800-900', 7],
    ['900-1000', 8],
    ['over 1000', 3]
  ];
  pieChartOptions = {
    pieHole: 0.35
  };
  barChartTitle = 'Absences';
  barChartType = 'ColumnChart';
  barChartColumnNames = ['month', 'development', 'Quality assurance', 'Sales'];
  barChartData = [
    ['Jan', 2, 2, 3],
    ['Feb', 8, 2, 4],
    ['Mar', 12, 4, 3],
    ['Apr', 10, 2, 7],
    ['May', 3, 1, 2],
    ['Jun', 5, 2, 7],
    ['Jul', 0, 2, 4],
    ['Aug', 1, 1, 2],
    ['Sep', 3, 4, 7],
    ['Oct', 4, 0, 1],
    ['Nov', 3, 7, 1],
    ['Dec', 2, 2, 0]
  ];
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
  constructor() { }

  ngOnInit(): void {
  }

}
