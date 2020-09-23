import { Injectable } from '@angular/core';
import { Salary } from 'src/app/models/salary.model';
import { SalaryLog } from 'src/app/models/salaryLog.model';
import { Observable, Subject } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { SeedService } from '../seed/seed.service';
import { DatabaseService } from '../database/database.service';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private _salaries: Salary[] = [];
  private _salaryLogs: SalaryLog[] = [];
  salariesChanged: Subject<{ salariesList: Salary[], salaryLogList: SalaryLog[] }> = new Subject();
  salaryAddedOrEditedOrRequested: Subject<Salary> = new Subject();
  private _lastSalariesListLength: number = 0;
  private _lastSalaryLogsListLength: number = 0;
  private readonly _salariesStoreKey: string = 'salary';
  private readonly _salaryLogsStoresKey: string = 'salaryLog';
  private _salariesArrived: boolean = false;
  private _salaryLogsArrived: boolean = false;
  constructor(private seedService: SeedService, private _databaseService: DatabaseService, private _utilsService: UtilsService) {
    // this._salaries = this.seedService.getSalaries();
    // this._salaryLogs = this.seedService.getSalaryLogs();
    // this._salaries.forEach((sal) => { this._databaseService.addItem(this._salariesStoreKey, sal) })
    // this._salaryLogs.forEach((salLog) => { this._databaseService.addItem(this._salaryLogsStoresKey, salLog) });

    this._getSalariesFromStore()
      .pipe(map((salObjectsList): Salary[] => {
        return salObjectsList.map((salObj: any) => new Salary(salObj))
      }), take(1))
      .subscribe((newSalList: Salary[]) => {
        this._salariesArrived = true;
        this._salaries = newSalList;
        this._fireSalariesAndLogsIfArrived();
      });
    this._getSalaryLogsFromStore()
      .pipe(map((salLogObjectsList): SalaryLog[] => {
        return salLogObjectsList.map((salLogObj: any) => new SalaryLog(salLogObj))
      }), take(1))
      .subscribe((newSalLogList: SalaryLog[]) => {
        this._salaryLogsArrived = true;
        this._salaryLogs = newSalLogList;
        this._fireSalariesAndLogsIfArrived();
      });
  }

  private _getSalariesFromStore(): Observable<object[]> {
    return this._databaseService.getAll(this._salariesStoreKey);
  }

  private _getSalaryLogsFromStore(): Observable<object[]> {
    return this._databaseService.getAll(this._salaryLogsStoresKey);
  }

  private _fireSalariesAndLogsIfArrived(): void {
    if (this._salariesArrived && this._salaryLogsArrived) {
      this._lastSalariesListLength = this._salaries.length;
      this._lastSalaryLogsListLength = this._salaryLogs.length;
      this.salariesChanged.next({ salariesList: this._salaries.slice(), salaryLogList: this._salaryLogs.slice() });
    }
  }
  getSalaries(): Salary[] {
    if ((this._salaries.length > 0 && this._lastSalariesListLength === 0) || this._salaryLogs.length > 0 && this._lastSalaryLogsListLength === 0) {
      this._fireSalariesAndLogsIfArrived();
    }
    return this._salaries.slice();
  }

  getSalaryByEmployeeID(empID: number): Salary {
    const tempSalariesList = this.getSalaries();
    let targetSalary = tempSalariesList.find((sal) => sal.empID === empID);
    if (this._salariesArrived && this._salaryLogsArrived) {
      this.salaryAddedOrEditedOrRequested.next(targetSalary);
    } else {
      this.salariesChanged.pipe(take(1)).subscribe(() => {
        targetSalary = this._salaries.find((sal) => sal.empID === empID);
        this.salaryAddedOrEditedOrRequested.next(targetSalary);
      });
    }
    return targetSalary;
  }

  onEditSalary(salaryID: number, newAmount: number): void {
    if (newAmount >= 250) {
      const targetSalaryIndex = this._salaries.findIndex((sal) => sal.ID === salaryID);
      this._salaries[targetSalaryIndex].amount = newAmount;
      this._databaseService.editItem(this._salariesStoreKey, this._salaries[targetSalaryIndex])
        .pipe(take(1))
        .subscribe(() => {
          this.salariesChanged.next({ salariesList: this._salaries.slice(), salaryLogList: this._salaryLogs.slice() });
          this.salaryAddedOrEditedOrRequested.next(this._salaries[targetSalaryIndex]);
        });
    }
  }

  onAddEmployee(empId: number, amount: number): void {
    const newSalary = new Salary(this.newSalaryID(), empId, amount);
    if (amount >= 250) {
      this._databaseService.addItem(this._salariesStoreKey, newSalary)
        .pipe(map((newSalObj) => new Salary(newSalObj)), take(1))
        .subscribe((newSal) => {
          this._salaries.push(newSal);
          this.salariesChanged.next({ salariesList: this._salaries.slice(), salaryLogList: this._salaryLogs.slice() });
          this.salaryAddedOrEditedOrRequested.next(newSalary);
        });
    }
  }

  newSalaryID(): number {
    let newID: number = 1;
    this._salaries.forEach((sal) => {
      if (sal.ID >= newID)
        newID = sal.ID + 1;
    });
    return newID;
  }

  getLogsBySalaryID(salID: number): SalaryLog[] {
    return this._salaryLogs.filter((log) => log.salaryID === salID);
  }
}
