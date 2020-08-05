export class Department {
    constructor(
        private _ID: number,
        private _name: string,
        private _description: string,
        public managerID?: number
    ) { }
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