export class Attendance {
    constructor(private attendanceID: number, readonly employeeID: number, readonly entry?: Date, readonly leave?: Date, readonly dailyHours?: number, readonly attendanceDate?: Date) {
    }
    get ID() {
        return this.attendanceID;
    }
}