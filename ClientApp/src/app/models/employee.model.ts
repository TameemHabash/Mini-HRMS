export class Employee {
    constructor(
        private _ID: number,
        public name: string,
        public gender: string,
        public SSN: string,
        public telNumber: string,
        public nationality: string,
        public nationalID: string,
        public birthDate: Date,
        public startDate: Date,
        public rating: number,
        public address: string,
        public status: string,
        public email: string,
        public active: boolean,
        public departmentID: number,
        public sectorID: number,
        public HRID: number
    ) { }

    get ID() {
        return this._ID;
    }
}
