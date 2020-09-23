export class Attendance {
    private attendanceID: number;
    readonly employeeID: number;
    readonly attendanceDate: Date;
    readonly entry?: Date;
    readonly leave?: Date;
    readonly dailyHours?: number;
    constructor(attendace: { attendanceID: number, employeeID: number, attendanceDate: Date, entry?: Date, leave?: Date, dailyHours?: number });
    constructor(ID: number, employeeID: number, Date: Date, entry?: Date, leave?: Date, dailyHours?: number);
    constructor(attOrID: { attendanceID: number, employeeID: number, attendanceDate: Date, entry?: Date, leave?: Date, dailyHours?: number } | number, employeeID?: number, Date?: Date, entry?: Date, leave?: Date, dailyHours?: number) {
        if (typeof attOrID === 'number') {
            this.attendanceID = attOrID;
            this.employeeID = employeeID;
            this.attendanceDate = Date;
            this.entry = entry ? entry : undefined;
            this.leave = entry ? entry : undefined;
            this.dailyHours = dailyHours ? dailyHours : undefined;
        } else if (attOrID === undefined || attOrID === null) { }
        else {
            this.attendanceID = attOrID.attendanceID;
            this.employeeID = attOrID.employeeID;
            this.attendanceDate = attOrID.attendanceDate;
            this.entry = attOrID.entry ? attOrID.entry : undefined;
            this.leave = attOrID.entry ? attOrID.entry : undefined;
            this.dailyHours = attOrID.dailyHours ? attOrID.dailyHours : undefined;
        }
    }
    get ID() {
        return this.attendanceID;
    }
}