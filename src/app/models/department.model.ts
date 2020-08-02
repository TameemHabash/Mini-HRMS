export class Department {
    constructor(
        private _ID: number,
        private _name: string,
        private _description: string,
        public _managerID?: number
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
}