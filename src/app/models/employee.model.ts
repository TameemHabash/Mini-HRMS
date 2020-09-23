class EmployeeObject {
    public _ID: number;
    public name: string;
    public gender: string;
    public SSN: string;
    public telNumber: string;
    public nationality: string;
    public nationalID: string;
    public birthDate: Date;
    public startDate: Date;
    public rating: number;
    public address: string;
    public status: string;
    public email: string;
    public active: boolean;
    public departmentID: number;
    public sectorID: number;
    public HRID: number;
}
export class Employee {
    private _ID: number;
    public name: string;
    public gender: string;
    public SSN: string;
    public telNumber: string;
    public nationality: string;
    public nationalID: string;
    public birthDate: Date;
    public startDate: Date;
    public rating: number;
    public address: string;
    public status: string;
    public email: string;
    public active: boolean;
    public departmentID: number;
    public sectorID: number;
    public HRID: number;
    constructor(employee: EmployeeObject);
    constructor(
        _ID: number,
        name: string,
        gender: string,
        SSN: string,
        telNumber: string,
        nationality: string,
        nationalID: string,
        birthDate: Date,
        startDate: Date,
        rating: number,
        address: string,
        status: string,
        email: string,
        active: boolean,
        departmentID: number,
        sectorID: number,
        HRID: number
    );
    constructor(
        empOrID: EmployeeObject | number, name?: string, gender?: string, SSN?: string, telNumber?: string, nationality?: string, nationalID?: string, birthDate?: Date, startDate?: Date, rating?: number, address?: string, status?: string, email?: string, active?: boolean, departmentID?: number, sectorID?: number, HRID?: number) {
        if (typeof empOrID === 'number') {
            this._ID = empOrID;
            this.name = name;
            this.gender = gender;
            this.SSN = SSN;
            this.telNumber = telNumber;
            this.nationality = nationality;
            this.nationalID = nationalID;
            this.birthDate = birthDate;
            this.startDate = startDate;
            this.rating = rating;
            this.address = address;
            this.status = status;
            this.email = email;
            this.active = active;
            this.departmentID = departmentID;
            this.sectorID = sectorID;
            this.HRID = HRID;
        } else if (empOrID === undefined || empOrID === null) { }
        else {
            this._ID = empOrID._ID;
            this.name = empOrID.name;
            this.gender = empOrID.gender;
            this.SSN = empOrID.SSN;
            this.telNumber = empOrID.telNumber;
            this.nationality = empOrID.nationality;
            this.nationalID = empOrID.nationalID;
            this.birthDate = empOrID.birthDate;
            this.startDate = empOrID.startDate;
            this.rating = empOrID.rating;
            this.address = empOrID.address;
            this.status = empOrID.status;
            this.email = empOrID.email;
            this.active = empOrID.active;
            this.departmentID = empOrID.departmentID;
            this.sectorID = empOrID.sectorID;
            this.HRID = empOrID.HRID;
        }
    }

    get ID() {
        return this._ID;
    }
}
