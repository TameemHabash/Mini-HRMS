export class SalaryLog {

    constructor(private _ID: number, private _logDate: Date, private _salaryID: number, public value: number, public bonus?: number) { }

    get ID() {
        return this._ID;
    }
    get salaryID() {
        return this._salaryID;
    }
    get logDate() {
        return this._logDate;
    }
}