export class Salary {
    private _salaryID: number;
    private employeeID: number;
    public amount: number;
    constructor(salary: { _salaryID: number, employeeID: number, amount: number });
    constructor(salaryID: number, employeeID: number, amount: number);
    constructor(salaryIDOrSalary: { _salaryID: number, employeeID: number, amount: number } | number, employeeID?: number, amount?: number) {
        if (typeof salaryIDOrSalary === 'number') {
            this._salaryID = salaryIDOrSalary;
            this.employeeID = employeeID;
            this.amount = amount;
        } else if (salaryIDOrSalary === undefined || salaryIDOrSalary === null) { }
        else {
            this._salaryID = salaryIDOrSalary._salaryID;
            this.employeeID = salaryIDOrSalary.employeeID;
            this.amount = salaryIDOrSalary.amount;
        }
    }
    get ID() {
        return this._salaryID;
    }
    get empID() {
        return this.employeeID;
    }
}
