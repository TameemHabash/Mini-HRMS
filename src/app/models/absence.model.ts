export class Absence {
    private absenceID: number;
    private employeeID: number;
    private absenceDate: Date;
    public excuse: boolean;
    public absenceDescription?: string;
    constructor(absence: { absenceID: number, employeeID: number, absenceDate: Date, excuse: boolean, absenceDescription?: string });
    constructor(ID: number, employeeID?: number, date?: Date, excuse?: boolean, description?: string);
    constructor(absOrID: { absenceID: number, employeeID: number, absenceDate: Date, excuse: boolean, absenceDescription?: string } | number, employeeID?: number, date?: Date, excuse?: boolean, description?: string) {
        if (typeof absOrID === 'number') {
            this.absenceID = absOrID;
            this.employeeID = employeeID;
            this.absenceDate = date;
            this.excuse = excuse;
            description ? this.absenceDescription = description : this.absenceDescription = undefined;
        } else if (absOrID === undefined || absOrID === null) { }
        else {
            this.absenceID = absOrID.absenceID;
            this.employeeID = absOrID.employeeID;
            this.absenceDate = absOrID.absenceDate;
            this.excuse = absOrID.excuse;
            absOrID.absenceDescription ? this.absenceDescription = absOrID.absenceDescription : this.absenceDescription = undefined;
        }
    }

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