import { Injectable } from '@angular/core';
import { Salary } from 'src/app/models/salary.model';
import { SalaryLog } from 'src/app/models/salaryLog.model';
import { Subject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private _salaries: Salary[];
  private _salaryLogs: SalaryLog[];
  salariesChanged: Subject<Salary[]> = new Subject();
  private readonly _storeSalariesKey: string = 'salariesKey';
  private readonly _storeSalaryLogsKey: string = 'salaryLogsKey';
  constructor(private seedService: SeedService, private _utilsService: UtilsService) {
    // this._salaries = this.seedService.getSalaries();
    // this._salaryLogs = this.seedService.getSalaryLogs();
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
