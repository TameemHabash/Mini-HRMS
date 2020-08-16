export class Absence {
    constructor(private absenceID: number, private employeeID: number, private absenceDate: Date, public excuse: boolean, public absenceDescription?: string) { }

    get ID() {
        return this.absenceID;
    }

    get empID() {
        return this.employeeID;
    }

    get absDate() {
        return this.absenceDate;
    }
}