export class DepartmentModel {
    constructor(
        private _ID: number,
        private _name: string,
        private _description: string,
        private _managerID: number
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
    get managerID() {
        return this._managerID;
    }
    set name(newName: string) {
        if (newName !== '') {
            this._name = newName;
        }
    }
    set description(newDescription: string) {
        if (newDescription !== '') {
            this._description = newDescription;
        }
    }
    set managerID(newManagerID: number) {
        if (newManagerID !== -1) {
            this._managerID = newManagerID;
        }
    }
}