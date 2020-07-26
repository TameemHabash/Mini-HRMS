export class Sector {
    constructor(
        private _ID: number,
        private _name: string,
        private _description?: string
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
}