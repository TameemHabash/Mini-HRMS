export class Sector {
    private _ID: number;
    private _name: string;
    private _departmentID: number;
    private _description?: string;
    constructor(sector: { _ID: number, _name: string, _departmentID: number, _description?: string });
    constructor(id: number, name: string, departmentID: number, description?: string);
    constructor(sectorOrID: { _ID: number, _name: string, _departmentID: number, _description?: string } | number, name?: string, departmentID?: number, description?: string) {
        if (typeof sectorOrID === "number") {
            this._ID = sectorOrID;
            this._name = name;
            this._departmentID = departmentID;
            description ? this._description = description : this._description = undefined;
        } else if (sectorOrID === null || sectorOrID === undefined) {

        } else {
            this._ID = sectorOrID._ID;
            this._name = sectorOrID._name;
            this._departmentID = sectorOrID._departmentID;
            description ? this._description = sectorOrID._description : this._description = undefined;
        }
    }
    get ID() {
        return this._ID;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get departmentID() {
        return this._departmentID;
    }
}