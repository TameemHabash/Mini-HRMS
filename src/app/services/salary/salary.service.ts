import { Injectable } from '@angular/core';
import { Salary } from 'src/app/models/salary.model';
import { SalaryLog } from 'src/app/models/salaryLog.model';
import { Subject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private _salaries: Salary[];
  private _salaryLogs: SalaryLog[];
  salariesChanged: Subject<Salary[]> = new Subject();
  private readonly _storeSalariesKey: string = 'salariesKey';
  private readonly _storeSalaryLogsKey: string = 'salaryLogsKey';
  constructor(private _utilsService: UtilsService) {
    // this._salaries = [
    //   new Salary(1, 1, 800), new Salary(2, 2, 6200), new Salary(3, 3, 500),
    //   new Salary(4, 4, 450), new Salary(5, 5, 1600), new Salary(6, 6, 680),
    //   new Salary(7, 7, 980), new Salary(8, 8, 760), new Salary(9, 9, 920),
    //   new Salary(10, 10, 1000), new Salary(11, 11, 1100), new Salary(12, 12, 1250),
    //   new Salary(13, 13, 1050), new Salary(14, 14, 900), new Salary(15, 15, 4000),
    //   new Salary(16, 16, 400), new Salary(17, 17, 950), new Salary(18, 18, 2000),
    //   new Salary(19, 19, 1300), new Salary(20, 20, 860), new Salary(21, 21, 730),
    //   new Salary(22, 22, 560), new Salary(23, 23, 540), new Salary(24, 24, 820),
    //   new Salary(25, 25, 620), new Salary(26, 26, 680), new Salary(27, 27, 710),
    //   new Salary(28, 28, 850), new Salary(29, 29, 440), new Salary(30, 30, 400)
    // ];
    // this._salaryLogs = [
    //   new SalaryLog(1, new Date(2018, 3, 1), 1, 800),
    //   new SalaryLog(2, new Date(2018, 4, 1), 1, 800, -45),
    //   new SalaryLog(3, new Date(2018, 5, 1), 1, 800, 60),
    //   new SalaryLog(4, new Date(2018, 6, 1), 1, 800),
    //   new SalaryLog(5, new Date(2018, 7, 1), 1, 800, 20),
    //   new SalaryLog(6, new Date(2018, 8, 1), 1, 800),
    //   new SalaryLog(7, new Date(2018, 9, 1), 1, 800),
    //   new SalaryLog(8, new Date(2018, 10, 1), 1, 800, -15),
    //   new SalaryLog(9, new Date(2018, 11, 1), 1, 800),
    //   new SalaryLog(10, new Date(2019, 0, 1), 1, 800),
    //   new SalaryLog(11, new Date(2019, 1, 1), 1, 800, 80),
    //   new SalaryLog(12, new Date(2019, 2, 1), 1, 800),
    //   new SalaryLog(13, new Date(2019, 3, 1), 1, 800),
    //   new SalaryLog(14, new Date(2019, 4, 1), 1, 800),
    //   new SalaryLog(15, new Date(2019, 5, 1), 1, 800, -50),
    //   new SalaryLog(16, new Date(2019, 6, 1), 1, 800, 20),
    //   new SalaryLog(17, new Date(2019, 7, 1), 1, 800),
    //   new SalaryLog(18, new Date(2019, 8, 1), 1, 800),
    //   new SalaryLog(19, new Date(2019, 9, 1), 1, 800),
    //   new SalaryLog(20, new Date(2019, 10, 1), 1, 800),
    //   new SalaryLog(21, new Date(2019, 11, 1), 1, 800, 55),
    //   new SalaryLog(22, new Date(2020, 0, 1), 1, 800),
    //   new SalaryLog(23, new Date(2020, 1, 1), 1, 800),
    //   new SalaryLog(24, new Date(2020, 2, 1), 1, 800),
    //   new SalaryLog(25, new Date(2020, 3, 1), 1, 800),
    //   new SalaryLog(26, new Date(2020, 4, 1), 1, 800, 60),
    //   new SalaryLog(27, new Date(2020, 5, 1), 1, 800),
    //   new SalaryLog(28, new Date(2020, 6, 1), 1, 800, -80),
    //   new SalaryLog(28, new Date(2019, 7, 1), 2, 6200),
    //   new SalaryLog(29, new Date(2019, 8, 1), 2, 6200),
    //   new SalaryLog(30, new Date(2019, 9, 1), 2, 6200),
    //   new SalaryLog(31, new Date(2019, 10, 1), 2, 6200),
    //   new SalaryLog(32, new Date(2019, 11, 1), 2, 6200),
    //   new SalaryLog(33, new Date(2020, 0, 1), 2, 6200),
    //   new SalaryLog(34, new Date(2020, 1, 1), 2, 6200),
    //   new SalaryLog(35, new Date(2020, 2, 1), 2, 6200),
    //   new SalaryLog(36, new Date(2020, 3, 1), 2, 6200),
    //   new SalaryLog(37, new Date(2020, 4, 1), 2, 6200),
    //   new SalaryLog(38, new Date(2020, 5, 1), 2, 6200),
    //   new SalaryLog(39, new Date(2020, 6, 1), 2, 6200),
    //   new SalaryLog(40, new Date(2019, 10, 1), 3, 500),
    //   new SalaryLog(41, new Date(2019, 11, 1), 3, 500),
    //   new SalaryLog(42, new Date(2020, 0, 1), 3, 500),
    //   new SalaryLog(43, new Date(2020, 1, 1), 3, 500),
    //   new SalaryLog(44, new Date(2020, 2, 1), 3, 500),
    //   new SalaryLog(45, new Date(2020, 3, 1), 3, 500),
    //   new SalaryLog(46, new Date(2020, 4, 1), 3, 500),
    //   new SalaryLog(47, new Date(2020, 5, 1), 3, 500),
    //   new SalaryLog(48, new Date(2020, 6, 1), 3, 500),
    //   new SalaryLog(49, new Date(2019, 10, 1), 4, 450),
    //   new SalaryLog(50, new Date(2019, 11, 1), 4, 450),
    //   new SalaryLog(51, new Date(2020, 0, 1), 4, 450),
    //   new SalaryLog(52, new Date(2020, 1, 1), 4, 450),
    //   new SalaryLog(53, new Date(2020, 2, 1), 4, 450),
    //   new SalaryLog(54, new Date(2020, 3, 1), 4, 450),
    //   new SalaryLog(55, new Date(2020, 4, 1), 4, 450),
    //   new SalaryLog(56, new Date(2020, 5, 1), 4, 450),
    //   new SalaryLog(57, new Date(2020, 6, 1), 4, 450),
    //   new SalaryLog(58, new Date(2019, 11, 1), 5, 1600),
    //   new SalaryLog(59, new Date(2020, 0, 1), 5, 1600),
    //   new SalaryLog(60, new Date(2020, 1, 1), 5, 1600),
    //   new SalaryLog(61, new Date(2020, 2, 1), 5, 1600),
    //   new SalaryLog(62, new Date(2020, 3, 1), 5, 1600),
    //   new SalaryLog(63, new Date(2020, 4, 1), 5, 1600),
    //   new SalaryLog(64, new Date(2020, 5, 1), 5, 1600),
    //   new SalaryLog(65, new Date(2020, 6, 1), 5, 1600),
    // ];
    // this._saveSalariesToStore();
    // this._saveSalaryLogsToStore();
    this._salaries = this._getSalariesFromStore();
    this._salaryLogs = this._getSalaryLogsFromStore();
  }

  private _getSalariesFromStore(): Salary[] {
    const parsedSalariesList: any[] = this._utilsService.fetchData(this._storeSalariesKey);
    const SalariesList: Salary[] = parsedSalariesList.map((sal) => {
      const salary = new Salary(sal._salaryID, sal.employeeID, sal.amount);
      return salary;
    });
    return SalariesList;
  }

  private _saveSalariesToStore(): void {
    this._utilsService.saveData(this._storeSalariesKey, this._salaries);
  }

  private _getSalaryLogsFromStore(): SalaryLog[] {
    const parsedSalaryLogsList: any[] = this._utilsService.fetchData(this._storeSalaryLogsKey);
    const salaryLogsList: SalaryLog[] = parsedSalaryLogsList.map((log) => {
      const salaryLog = new SalaryLog(log._logID, log._logDate, log._salaryID, log.value, log.bonus);
      return salaryLog;
    });
    return salaryLogsList;
  }

  private _saveSalaryLogsToStore(): void {
    this._utilsService.saveData(this._storeSalaryLogsKey, this._salaryLogs);
  }

  getSalaries(): Salary[] {
    return this._salaries.slice();
  }

  getSalaryByEmployeeID(empID: number): Salary {
    return this._salaries.find((sal) => sal.empID === empID);
  }

  onEditSalary(salaryID: number, newAmount: number): void {
    if (newAmount >= 250) {
      const targetSalaryIndex = this._salaries.findIndex((sal) => sal.ID === salaryID);
      this._salaries[targetSalaryIndex].amount = newAmount;
      this._saveSalariesToStore();
      this.salariesChanged.next(this._salaries.slice());
    }
  }

  onAddEmployee(empId: number, amount: number): Salary {
    if (amount >= 250) {
      this._salaries.push(new Salary(this.newSalaryID(), empId, amount));
      this._saveSalariesToStore();
      this.salariesChanged.next(this._salaries.slice());
      return this._salaries[length - 1];
    }
  }

  newSalaryID(): number {
    return this._salaries.length + 1;
  }

  getLogsBySalaryID(salID: number): SalaryLog[] {
    return this._salaryLogs.filter((log) => log.salaryID === salID);
  }
}
