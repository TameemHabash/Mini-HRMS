import { Sector } from '../models/sector.model';
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
    set name(name: string) {
        if (name !== '') {
            this.name = name;
        }
    }

    get description() {
        return this._description;
    }
    set description(description: string) {
        if (description !== '') {
            this.description = description;
        }
    }

    get employeesNum() {
        return this._employeesNum;
    }
    get sectors() {
        return this._sectors.slice();
    }
}