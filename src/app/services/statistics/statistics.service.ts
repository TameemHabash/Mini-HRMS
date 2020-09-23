import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Absence } from 'src/app/models/absence.model';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { Salary } from 'src/app/models/salary.model';
import { AbsenceService } from '../absence/absence.service';
import { DepartmentService } from '../department/department.service';
import { EmployeeService } from '../employee/employee.service';
import { SalaryService } from '../salary/salary.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private _departments: Department[] = [];
  private _salaries: Salary[] = [];
  private _absences: Absence[] = [];
  private _employees: Employee[] = [];
  private _ready: { dept: boolean, sal: boolean, abs: boolean, emp: boolean } = { dept: false, sal: false, abs: false, emp: false };
  statisticsChanged: Subject<{ departments: Department[], salaries: Salary[], absences: Absence[], employees: Employee[] }> = new Subject();
  pieChartData: [string, number][] = [];
  chartsDataChanged: Subject<{ barChartData: any, pieChartData: any }> = new Subject();
  barChartData: any[] = [];
  constructor(private _departmentService: DepartmentService, private _employeeService: EmployeeService, private _salaryService: SalaryService, private _absenceService: AbsenceService) {
    this._departmentService.departmentsChanged.subscribe((deptList) => {
      this._departments = deptList;
      this._ready.dept = true;
      this._fireStatisticsIfReady();
    });
    this._salaryService.salariesChanged.subscribe((sal_log_Obj) => {
      this._salaries = sal_log_Obj.salariesList;
      this._ready.sal = true;
      this._fireStatisticsIfReady();
    });
    this._absenceService.absencesChanged.subscribe((absList) => {
      this._absences = absList;
      this._ready.abs = true;
      this._fireStatisticsIfReady();
    });
    this._employeeService.employeesChanged.subscribe((empList) => {
      this._employees = empList;
      this._ready.emp = true;
      this._fireStatisticsIfReady();
    });
    this._departments = this._departmentService.getDepartments();
    this._salaries = this._salaryService.getSalaries();
    this._absences = this._absenceService.getAbsences();
    this._employees = this._employeeService.getEmployees();
  }
  getEmployeesCount(): number {
    return this._employeeService.getEmployeesCount();
  }

  getDepartmentsCount(): number {
    return this._departmentService.getDepartmentsCount();
  }

  getChartsData(): { barChartData: any, pieChartData: any } {
    this._fireStatisticsIfReady();
    return { barChartData: this.barChartData, pieChartData: this.pieChartData };
  }
  private _fireStatisticsIfReady() {
    if (this._ready.dept && this._ready.abs && this._ready.emp && this._ready.sal) {
      this._setAbsences();
      this._setSalaries();
      this.chartsDataChanged.next({ barChartData: this.barChartData, pieChartData: this.pieChartData });
      this.statisticsChanged.next({ departments: this._departments, salaries: this._salaries, absences: this._absences, employees: this._employees });
    }
  }

  getSectorsConut(deptID: number): number {
    return this._departmentService.getSectorsByDepartmentID(deptID).length;
  }

  getEmployeesCountByDepartment(deptID: number): number {
    return this._employeeService.getEmployeesNumberByDepartmentID(deptID);
  }

  getDepartments(): Department[] {
    this._fireStatisticsIfReady();
    if (this._departments.length > 0) {
      this._ready.dept = true;
    }
    return this._departments.slice();
  }

  getBarChartData(): any[] {
    if (this._absences.length > 0 && this._departments.length > 0 && this._employees.length > 0) {
      this._setAbsences();
      this._ready = { dept: true, abs: true, emp: true, sal: this._ready.sal };
    } else {
      this._fireStatisticsIfReady();
    }
    return this.barChartData;
  }

  getPieChartData(): [string, number][] {
    if (this._salaries.length > 0) {
      this._setSalaries();
      this._ready.sal = true;
    }
    this._fireStatisticsIfReady();
    return this.pieChartData;
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

  private _setAbsences(): void {
    const janAbsences: number[] = Array(this._departments.length).fill(0);
    const febAbsences: number[] = Array(this._departments.length).fill(0);
    const marAbsences: number[] = Array(this._departments.length).fill(0);
    const aprAbsences: number[] = Array(this._departments.length).fill(0);
    const mayAbsences: number[] = Array(this._departments.length).fill(0);
    const junAbsences: number[] = Array(this._departments.length).fill(0);
    const julAbsences: number[] = Array(this._departments.length).fill(0);
    const augAbsences: number[] = Array(this._departments.length).fill(0);
    const sepAbsences: number[] = Array(this._departments.length).fill(0);
    const octAbsences: number[] = Array(this._departments.length).fill(0);
    const novAbsences: number[] = Array(this._departments.length).fill(0);
    const decAbsences: number[] = Array(this._departments.length).fill(0);
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
              febAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 2:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              marAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 3:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              aprAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 4:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              mayAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 5:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              junAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 6:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              julAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 7:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              augAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 8:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              sepAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 9:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              octAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 10:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              novAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
            }
          });
          break;
        case 11:
          this._employees.forEach((emp) => {
            if (emp.ID === abs.empID) {
              decAbsences[this._departments.findIndex((dept) => dept.ID === emp.departmentID)]++;
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
