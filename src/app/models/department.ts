import { Sector } from './sector';
export class Department {
    constructor(
        private _ID: number,
        private _name: string,
        private _description: string,
        private _employeesNum: number,
        private _sectors: Sector[]
    ) { }
    get ID() {
        return this._ID;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get employeesNum() {
        return this._employeesNum;
    }
    get sectors() {
        return this._sectors.slice();
    }
}