export class HRUser {
    private _HRID: number;
    private _userName: string;
    private _password: string;
    private _email: string;
    private _image: string;
    constructor(HRUser: { _HRID: number, _userName: string, _password: string, _email: string, _image: string });
    constructor(HRID: number, userName: string, password: string, email: string, image: string);
    constructor(HRIDOrHRUser: { _HRID: number, _userName: string, _password: string, _email: string, _image: string } | number, userName?: string, password?: string, email?: string, image?: string) {
        if (typeof HRIDOrHRUser === 'number') {
            this._HRID = HRIDOrHRUser;
            this._userName = userName;
            this._password = password;
            this._email = email;
            this._image = image;
        } else if (HRIDOrHRUser === undefined || HRIDOrHRUser === null) { }
        else {
            this._HRID = HRIDOrHRUser._HRID;
            this._userName = HRIDOrHRUser._userName;
            this._password = HRIDOrHRUser._password;
            this._email = HRIDOrHRUser._email;
            this._image = HRIDOrHRUser._image;
        }
    }
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