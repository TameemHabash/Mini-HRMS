export class Attendance {
    constructor(private attendanceID: number, readonly employeeID: number, readonly attendanceDate: Date, readonly entry?: Date, readonly leave?: Date, readonly dailyHours?: number) {
    }
    get ID() {
        return this.attendanceID;
    }
}