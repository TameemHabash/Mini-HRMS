export class Salary {
    constructor(private _salaryID: number, private employeeID: number, public amount: number) { }
    get ID() {
        return this._salaryID;
    }
    get empID() {
        return this.employeeID;
    }
}
