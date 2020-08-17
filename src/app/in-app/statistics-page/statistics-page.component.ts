import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { SectorService } from 'src/app/services/sector.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SalaryService } from 'src/app/services/salary.service';
import { AbsenceService } from 'src/app/services/absence.service';
import { Department } from 'src/app/models/department.model';
import { Subscription } from 'rxjs';
import { Salary } from 'src/app/models/salary.model';
import { Absence } from 'src/app/models/absence.model';
import { Employee } from 'src/app/models/employee.model';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit, OnDestroy {
  pieChartTitle = 'Salary';
  pieChartType = 'PieChart';
  pieChartColumnNames = ['Salary class ', 'Employees'];
  pieChartData: [string, number][];
  pieChartOptions = {
    pieHole: 0.35
  };
  barChartTitle = 'Absences';
  barChartType = 'ColumnChart';
  barChartColumnNames: Array<string> = ['month'];
  barChartData: Array<any>;
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
  departments: Department[];
  private _salaries: Salary[];
  private _absences: Absence[];
  private _employees: Employee[];
  private _deptID_empID
  absencesCount: number = 0;
  // private _departmentsSubscription: Subscription;
  // private _salariesSubscription: Subscription;
  // private _absencesSubscription: Subscription;
  constructor(private _departmentService: DepartmentService, private _employeeService: EmployeeService, private _salaryService: SalaryService, private _absenceService: AbsenceService) { }

  ngOnInit(): void {
    this._employees = this._employeeService.getEmployees();
    this.departments = this._departmentService.getDepartments();
    this._salaries = this._salaryService.getSalaries();
    this._setSalaries();
    this.departments.forEach((dept) => { this.barChartColumnNames.push(dept.name) });
    this._absences = this._absenceService.getAbsences();
    this._setAbsences();
    // this._departmentsSubscription = this._departmentService.departmentsChanged.subscribe((newDepartmentsList: Department[]) => {
    //   this.departments = newDepartmentsList;
    // });
    // this._salariesSubscription = this._salaryService.salariesChanged.subscribe((newSalariesList: Salary[]) => {
    //   this._salaries = newSalariesList;
    //   this._setSalaries();
    // });
    // this._absenceService.absencesChanged.subscribe((newAbsences: Absence[]) => {
    //   this._absences = newAbsences;
    //   this._setAbsences();
    // });
  }
  ngOnDestroy() {
    // this._departmentsSubscription.unsubscribe();
    // this._salariesSubscription.unsubscribe();
    // this._absencesSubscription.unsubscribe();
  }

  getSectorsConut(deptID: number): number {
    return this._departmentService.getSectorsByDepartmentID(deptID).length;
  }

  getEmployeesCountByDepartment(deptID: number): number {
    return this._employeeService.getEmployeesNumberByDepartmentID(deptID);
  }

  private _setSalaries(): void {
    let firstIntervalCount = 0;
    let secondIntervalCount = 0;
    let thirdIntervalCount = 0;
    let fourthIntervalCount = 0;
    let fifthIntervalCount = 0;
    this._salaries.forEach((sal) => {
      if (sal.amount < 400) {
        firstIntervalCount++;
      } else if (sal.amount >= 400 && sal.amount < 600) {
        secondIntervalCount++;
      } else if (sal.amount >= 600 && sal.amount < 800) {
        thirdIntervalCount++;
      } else if (sal.amount >= 800 && sal.amount < 1000) {
        fourthIntervalCount++;
      } else if (sal.amount > 1000) {
        fifthIntervalCount++;
      }
    });
    this.pieChartData = [
      ['below 400', firstIntervalCount],
      ['400-600', secondIntervalCount],
      ['600-800', thirdIntervalCount],
      ['800-1000', fourthIntervalCount],
      ['over 1000', fifthIntervalCount]
    ];
  }

  _setAbsences() {
    const janAbsences: number[] = Array(this.departments.length).fill(0);
    const febAbsences: number[] = Array(this.departments.length).fill(0);
    const marAbsences: number[] = Array(this.departments.length).fill(0);
    const aprAbsences: number[] = Array(this.departments.length).fill(0);
    const mayAbsences: number[] = Array(this.departments.length).fill(0);
    const junAbsences: number[] = Array(this.departments.length).fill(0);
    const julAbsences: number[] = Array(this.departments.length).fill(0);
    const augAbsences: number[] = Array(this.departments.length).fill(0);
    const sepAbsences: number[] = Array(this.departments.length).fill(0);
    const octAbsences: number[] = Array(this.departments.length).fill(0);
    const novAbsences: number[] = Array(this.departments.length).fill(0);
    const decAbsences: number[] = Array(this.departments.length).fill(0);
    this._absences.forEach((abs) => {
      switch (abs.absDate.getMonth()) {
        case 0:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              janAbsences[emp.departmentID - 1]++;
            }
          });
          break;

        case 1:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              febAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 2:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              marAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 3:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              aprAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 4:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              mayAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 5:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              junAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 6:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              julAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 7:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              augAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 8:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              sepAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 9:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              octAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 10:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              novAbsences[emp.departmentID - 1]++;
            }
          });
          break;
        case 11:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              decAbsences[emp.departmentID - 1]++;
            }
          });
          break;
      }
    });
    this.barChartData = [
      ['Jan', ...janAbsences],
      ['Feb', ...febAbsences],
      ['Mar', ...marAbsences],
      ['Apr', ...aprAbsences],
      ['May', ...mayAbsences],
      ['Jun', ...junAbsences],
      ['Jul', ...julAbsences],
      ['Aug', ...augAbsences],
      ['Sep', ...sepAbsences],
      ['Oct', ...octAbsences],
      ['Nov', ...novAbsences],
      ['Dec', ...decAbsences]
    ];
  }
}
