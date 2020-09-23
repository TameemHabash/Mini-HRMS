export class Department {

    private _ID: number;
    private _name: string;
    private _description: string;
    public managerID?: number;
    constructor(department: { _ID: number, _name: string, _description: string, managerID?: number });
    constructor(ID: number, name: string, descriptoin: string, managerID?: number);
    constructor(deptOrID: { _ID: number, _name: string, _description: string, managerID?: number } | number, name?: string, descriptoin?: string, managerID?: number) {
        if (typeof deptOrID === 'number') {
            this._ID = deptOrID;
            this._name = name;
            this._description = descriptoin;
            managerID ? this.managerID = managerID : this.managerID = undefined;
        } else if (deptOrID === null || deptOrID === undefined) { }
        else {
            this._ID = deptOrID._ID;
            this._name = deptOrID._name;
            this.description = deptOrID._description;
            deptOrID.managerID ? this.managerID = deptOrID.managerID : this.managerID = undefined;
        }
    }
    get ID() {
        return this._ID;
    }
    get name() {
        return this._name;
    }
    set name(name: string) {
        if (name !== '') {
            this._name = name;
        }
    }

    get description() {
        return this._description;
    }
    set description(description: string) {
        if (description !== '') {
            this._description = description;
        }
    }
}