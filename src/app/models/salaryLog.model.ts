export class SalaryLog {
    private _logID: number;
    private _logDate: Date;
    private _salaryID: number;
    public value: number;
    public bonus?: number;
    constructor(salaryLog: { _logID: number, _logDate: Date, _salaryID: number, value: number, bonus?: number });
    constructor(ID: number, Date: Date, salaryID: number, value: number, bonus?: number);
    constructor(IDOrSalaryLog: { _logID: number, _logDate: Date, _salaryID: number, value: number, bonus?: number } | number, Date?: Date, salaryID?: number, value?: number, bonus?: number) {
        if (typeof IDOrSalaryLog === 'number') {
            this._logID = IDOrSalaryLog;
            this._logDate = Date;
            this._salaryID = salaryID;
            this.value = value ? value : undefined;
            this.bonus = bonus ? bonus : undefined;
        } else if (IDOrSalaryLog === undefined || IDOrSalaryLog === null) { }
        else {
            this._logID = IDOrSalaryLog._logID;
            this._logDate = IDOrSalaryLog._logDate;
            this._salaryID = IDOrSalaryLog._salaryID;
            this.value = IDOrSalaryLog.value ? IDOrSalaryLog.value : undefined;
            this.bonus = IDOrSalaryLog.bonus ? IDOrSalaryLog.bonus : undefined;
        }
    }

    get ID() {
        return this._logID;
    }
    get salaryID() {
        return this._salaryID;
    }
    get logDate() {
        return this._logDate;
    }
}