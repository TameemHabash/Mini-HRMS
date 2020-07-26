export class HRUser {
    constructor(
        private _HRID: number,
        private _userName: string,
        private _password: string,
        private _email: string,
        private _image: string
    ) { }
    get HRID() {
        return this._HRID;
    }
    get userName() {
        return this._userName;
    }
    get password() {
        return this._password;
    }
    get email() {
        return this._email;
    }
    get image() {
        return this._image;
    }
}