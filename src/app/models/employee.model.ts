export class Employee {
    constructor(
        private _ID: number,
        public name: string,
        public gender: string,
        public SSN: string,
        public telNumber: string,
        public nationality: string,
        public nationalID: string,
        public birthDate: string,
        public startDate: string,
        public rating: number,
        public address: string,
        public status: string,
        public email: string,
        public departmentID: number,
        public sectorID: number,
        public HRID: number
    ) { }

    get ID() {
        return this._ID;
    }
}
