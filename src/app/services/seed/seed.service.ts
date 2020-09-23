import { Injectable } from '@angular/core';
import { Absence } from 'src/app/models/absence.model';
import { Employee } from 'src/app/models/employee.model';
import { Attendance } from 'src/app/models/attendance.model';
import { Department } from 'src/app/models/department.model';
import { SalaryLog } from 'src/app/models/salaryLog.model';
import { Salary } from 'src/app/models/salary.model';
import { Sector } from 'src/app/models/sector.model';
import { HRUser } from 'src/app/models/HRUser.model';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  private _absences: Absence[];
  private _employees: Employee[];
  private _attendances: Attendance[];
  private _departments: Department[];
  private _salaryLogs: SalaryLog[];
  private _salaries: Salary[];
  private _sectors: Sector[];
  private _HRs: HRUser[];

  constructor() {
    this._absences = [
      new Absence(1, 1, new Date(2020, 2, 5, 8), true, 'Pathological absence'),
      new Absence(2, 1, new Date(2020, 2, 11, 8), false),
      new Absence(3, 2, new Date(2020, 4, 11), true, 'Suspicion of COVID-19'),
      new Absence(4, 3, new Date(2020, 3, 13), false),
      new Absence(5, 4, new Date(2020, 5, 11), true, 'Work permit'),
      new Absence(6, 4, new Date(2020, 2, 16), false),
      new Absence(7, 5, new Date(2020, 6, 11), true, 'Suspicion of COVID-19'),
      new Absence(8, 6, new Date(2020, 4, 7), false),
      new Absence(8, 6, new Date(2020, 2, 11), true, 'Suspicion of COVID-19'),
      new Absence(9, 7, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
      new Absence(10, 8, new Date(2020, 6, 7), false),
      new Absence(11, 8, new Date(2020, 5, 7), false),
      new Absence(12, 8, new Date(2020, 4, 7), false),
      new Absence(13, 9, new Date(2020, 3, 7), false),
      new Absence(14, 13, new Date(2020, 7, 11), true, 'Suspicion of COVID-19'),
      new Absence(15, 10, new Date(2020, 3, 7), false),
      new Absence(16, 11, new Date(2020, 2, 7), false),
      new Absence(17, 11, new Date(2020, 5, 7), false),
      new Absence(18, 10, new Date(2020, 7, 7), false),
      new Absence(19, 14, new Date(2020, 0, 11), true, 'Suspicion of COVID-19'),
      new Absence(20, 15, new Date(2020, 0, 11), true, 'Suspicion of COVID-19'),
      new Absence(21, 13, new Date(2020, 4, 11), true, 'Suspicion of COVID-19'),
      new Absence(22, 17, new Date(2020, 3, 7), false),
      new Absence(23, 16, new Date(2020, 5, 7), false),
      new Absence(24, 18, new Date(2020, 6, 7), false),
      new Absence(25, 22, new Date(2020, 4, 7), false),
      new Absence(26, 21, new Date(2020, 4, 7), false),
      new Absence(27, 19, new Date(2020, 4, 7), false),
      new Absence(28, 22, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
      new Absence(29, 15, new Date(2020, 2, 7), false),
      new Absence(30, 18, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
      new Absence(31, 22, new Date(2020, 4, 7), false),
      new Absence(32, 6, new Date(2020, 5, 11), true, 'Suspicion of COVID-19'),
      new Absence(33, 13, new Date(2020, 5, 7), false),
      new Absence(34, 10, new Date(2020, 2, 11), true, 'Suspicion of COVID-19'),
      new Absence(35, 20, new Date(2020, 3, 11), true, 'Suspicion of COVID-19'),
      new Absence(36, 14, new Date(2020, 2, 11), true, 'Suspicion of COVID-19'),
      new Absence(37, 14, new Date(2020, 3, 7), false),
      new Absence(38, 9, new Date(2020, 1, 7), false),
      new Absence(39, 20, new Date(2020, 2, 7), false),
      new Absence(40, 9, new Date(2020, 3, 7), false),
      new Absence(41, 16, new Date(2020, 3, 7), false),
      new Absence(42, 17, new Date(2020, 7, 7), false),
      new Absence(43, 13, new Date(2020, 7, 7), false),

    ];
    this._employees = [
      new Employee(1, 'wesam sameer', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2017, 6, 9), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 2, 1),
      new Employee(2, 'nisreen ahmad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 3, 6, 1),
      new Employee(3, 'jehad sameer', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 5, 1),
      new Employee(4, 'mohammad ali', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2018, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 4, 1),
      new Employee(5, 'noor ahmad', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2019, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', false, 1, 1, 1),
      new Employee(6, 'salam nasser', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 2, 5, 1),
      new Employee(7, 'tameem habash', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 3, 6, 1),
      new Employee(8, 'sajeda sarhan', 'male', '817-82-5966', '+962790000003', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(9, 'marwan rawashdeh', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2020, 6, 7), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 2, 4, 1),
      new Employee(10, 'batool attmeh', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 2, 4, 1),
      new Employee(11, 'rahaf malas', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 2, 4, 1),
      new Employee(12, 'abdelrahaman al-tamimi', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2020, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', true, 2, 5, 1),
      new Employee(13, 'suzan rami', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 3, 6, 1),
      new Employee(14, 'abdallah shawabkeh', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 3, 6, 1),
      new Employee(15, 'aseel osama', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 3, 1),
      new Employee(16, 'abdalla alkhaldi', 'female', '253-59-1134', '+962790000001', 'jordanian', '9942000001', new Date(1994, 6, 7), new Date(2020, 6, 7), 5.9, 'amman - dahyat al-amir hasan', 'married', 'wesam.sameer@gmail.com', true, 1, 3, 1),
      new Employee(17, 'mahmmud hammad', 'female', '795-14-4343', '+962790000003', 'jordanian', '9952000003', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.1, 'amman - jawa', 'single', 'nisreen.ahmad@gmail.com', true, 1, 1, 1),
      new Employee(18, 'saman mubaideen', 'male', '488-29-3999', '+962790000004', 'jordanian', '9961000004', new Date(1996, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - airport street', 'single', 'jehad.sameer@gmail.com', true, 1, 2, 1),
      new Employee(19, 'nedal al tarazi', 'male', '123-44-5285', '+962790000005', 'jordanian', '9951000005', new Date(1995, 6, 7), new Date(2020, 6, 7), 6.9, 'amman - alyaduda', 'single', 'mohammad.ali@gmail.com', false, 1, 2, 1),
      new Employee(20, 'abdalla al madhon', 'female', '841-17-9838', '+962790000006', 'jordanian', '9952000006', new Date(1995, 6, 7), new Date(2020, 6, 7), 9.8, 'az-zarqa', 'married', 'noor.ahmad@gmail.com', true, 1, 3, 1),
      new Employee(21, 'duha hindi', 'female', '388-95-8144', '+962790000007', 'jordanian', '9952000007', new Date(1995, 6, 7), new Date(2020, 6, 7), 10.0, 'amman - dahyet alrasheed', 'single', 'salam.nassar@gmail.com', true, 1, 2, 1),
      new Employee(22, 'saddam saaydeh', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(23, 'walaa khalifah', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 3, 1),
      new Employee(24, 'araj saad"', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 1, 1),
      new Employee(25, 'ahmad emaishat', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(26, 'lina hamdan', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 3, 1),
      new Employee(27, 'hammam al nemer', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 1, 1),
      new Employee(28, 'sanad sameer', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 2, 1),
      new Employee(29, 'sameer aladwan', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', false, 1, 3, 1),
      new Employee(30, 'dina alkhateeb', 'male', '817-82-5966', '+962796203420', 'jordanian', '9981000008', new Date(1998, 6, 7), new Date(2020, 6, 7), 7.9, 'amman - dahyat al-amir hasan', 'single', 'tameem.habash@gmail.com', true, 1, 1, 1),
    ];
    this._attendances = [
      new Attendance(1, 1, new Date(2020, 6, 29), new Date(2020, 6, 29, 8), new Date(2020, 6, 29, 17), 9),
      new Attendance(2, 1, new Date(2020, 6, 30), new Date(2020, 6, 30, 8), new Date(2020, 6, 30, 17), 9),
      new Attendance(3, 1, new Date(2020, 6, 31), new Date(2020, 6, 31, 8), new Date(2020, 6, 31, 17), 9),
      new Attendance(4, 1, new Date(2020, 7, 1), new Date(2020, 7, 1, 8), new Date(2020, 7, 1, 17), 9),
      new Attendance(5, 1, new Date(2020, 7, 2), new Date(2020, 7, 2, 8), new Date(2020, 7, 2, 17), 9),
      new Attendance(6, 1, new Date(2020, 7, 3), new Date(2020, 7, 3, 8), new Date(2020, 7, 3, 20), 12),
      new Attendance(7, 1, new Date(2020, 7, 4), new Date(2020, 7, 4, 8), new Date(2020, 7, 4, 17), 9),
      new Attendance(8, 1, new Date(2020, 7, 5, 8)),
      new Attendance(9, 1, new Date(2020, 7, 6), new Date(2020, 7, 6, 8), new Date(2020, 7, 6, 17), 9),
      new Attendance(10, 1, new Date(2020, 7, 7), new Date(2020, 7, 7, 8), new Date(2020, 7, 7, 17), 9),
      new Attendance(11, 1, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(12, 1, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(13, 1, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(14, 1, new Date(2020, 7, 11, 8)),
      new Attendance(15, 1, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(16, 1, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
      new Attendance(17, 1, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(18, 1, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),



      new Attendance(19, 2, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(20, 2, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(21, 2, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(22, 2, new Date(2020, 7, 11)),
      new Attendance(23, 2, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(24, 2, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
      new Attendance(25, 2, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(26, 2, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),


      new Attendance(27, 3, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(28, 3, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(29, 3, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(32, 3, new Date(2020, 7, 11), new Date(2020, 7, 11, 8), new Date(2020, 7, 11, 17), 9),
      new Attendance(31, 3, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(30, 3, new Date(2020, 7, 13)),
      new Attendance(33, 3, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(34, 3, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),


      new Attendance(35, 4, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(36, 4, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(37, 4, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(38, 4, new Date(2020, 7, 11)),
      new Attendance(39, 4, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(40, 4, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
      new Attendance(41, 4, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(42, 4, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),
      new Attendance(67, 4, new Date(2020, 7, 16)),


      new Attendance(43, 5, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(44, 5, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(45, 5, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(46, 5, new Date(2020, 7, 11)),
      new Attendance(47, 5, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(48, 5, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
      new Attendance(49, 5, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(50, 5, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),

      new Attendance(68, 6, new Date(2020, 7, 7)),
      new Attendance(51, 6, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(52, 6, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(53, 6, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(54, 6, new Date(2020, 7, 11)),
      new Attendance(55, 6, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(56, 6, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
      new Attendance(57, 6, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(58, 6, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),


      new Attendance(59, 7, new Date(2020, 7, 8), new Date(2020, 7, 8, 10), new Date(2020, 7, 8, 17), 7),
      new Attendance(60, 7, new Date(2020, 7, 9), new Date(2020, 7, 9, 8), new Date(2020, 7, 9, 17), 9),
      new Attendance(61, 7, new Date(2020, 7, 10), new Date(2020, 7, 10, 8), new Date(2020, 7, 10, 18), 10),
      new Attendance(62, 7, new Date(2020, 7, 11)),
      new Attendance(63, 7, new Date(2020, 7, 12), new Date(2020, 7, 12, 8), new Date(2020, 7, 12, 17), 9),
      new Attendance(64, 7, new Date(2020, 7, 13), new Date(2020, 7, 13, 8), new Date(2020, 7, 13, 17), 9),
      new Attendance(65, 7, new Date(2020, 7, 14), new Date(2020, 7, 14, 8), new Date(2020, 7, 14, 14), 8),
      new Attendance(66, 7, new Date(2020, 7, 15), new Date(2020, 7, 15, 8), new Date(2020, 7, 15, 17), 9),
    ];
    this._departments = [
      new Department(
        1,
        'development',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
        17),
      new Department(
        2,
        'quality assurance',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
        5),
      new Department(
        3,
        'sales',
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis consectetur deserunt fuga aperiam sequi rem molestias provident obcaecati doloribus',
      )
    ];
    this._salaries = [
      new Salary(1, 1, 800), new Salary(2, 2, 6200), new Salary(3, 3, 500),
      new Salary(4, 4, 450), new Salary(5, 5, 1600), new Salary(6, 6, 680),
      new Salary(7, 7, 980), new Salary(8, 8, 760), new Salary(9, 9, 920),
      new Salary(10, 10, 1000), new Salary(11, 11, 1100), new Salary(12, 12, 1250),
      new Salary(13, 13, 1050), new Salary(14, 14, 900), new Salary(15, 15, 4000),
      new Salary(16, 16, 400), new Salary(17, 17, 950), new Salary(18, 18, 2000),
      new Salary(19, 19, 1300), new Salary(20, 20, 860), new Salary(21, 21, 730),
      new Salary(22, 22, 560), new Salary(23, 23, 540), new Salary(24, 24, 820),
      new Salary(25, 25, 620), new Salary(26, 26, 680), new Salary(27, 27, 710),
      new Salary(28, 28, 850), new Salary(29, 29, 440), new Salary(30, 30, 400)
    ];
    this._salaryLogs = [
      new SalaryLog(1, new Date(2018, 3, 1), 1, 800),
      new SalaryLog(2, new Date(2018, 4, 1), 1, 800, -45),
      new SalaryLog(3, new Date(2018, 5, 1), 1, 800, 60),
      new SalaryLog(4, new Date(2018, 6, 1), 1, 800),
      new SalaryLog(5, new Date(2018, 7, 1), 1, 800, 20),
      new SalaryLog(6, new Date(2018, 8, 1), 1, 800),
      new SalaryLog(7, new Date(2018, 9, 1), 1, 800),
      new SalaryLog(8, new Date(2018, 10, 1), 1, 800, -15),
      new SalaryLog(9, new Date(2018, 11, 1), 1, 800),
      new SalaryLog(10, new Date(2019, 0, 1), 1, 800),
      new SalaryLog(11, new Date(2019, 1, 1), 1, 800, 80),
      new SalaryLog(12, new Date(2019, 2, 1), 1, 800),
      new SalaryLog(13, new Date(2019, 3, 1), 1, 800),
      new SalaryLog(14, new Date(2019, 4, 1), 1, 800),
      new SalaryLog(15, new Date(2019, 5, 1), 1, 800, -50),
      new SalaryLog(16, new Date(2019, 6, 1), 1, 800, 20),
      new SalaryLog(17, new Date(2019, 7, 1), 1, 800),
      new SalaryLog(18, new Date(2019, 8, 1), 1, 800),
      new SalaryLog(19, new Date(2019, 9, 1), 1, 800),
      new SalaryLog(20, new Date(2019, 10, 1), 1, 800),
      new SalaryLog(21, new Date(2019, 11, 1), 1, 800, 55),
      new SalaryLog(22, new Date(2020, 0, 1), 1, 800),
      new SalaryLog(23, new Date(2020, 1, 1), 1, 800),
      new SalaryLog(24, new Date(2020, 2, 1), 1, 800),
      new SalaryLog(25, new Date(2020, 3, 1), 1, 800),
      new SalaryLog(26, new Date(2020, 4, 1), 1, 800, 60),
      new SalaryLog(27, new Date(2020, 5, 1), 1, 800),
      new SalaryLog(28, new Date(2020, 6, 1), 1, 800, -80),
      new SalaryLog(28, new Date(2019, 7, 1), 2, 6200),
      new SalaryLog(29, new Date(2019, 8, 1), 2, 6200),
      new SalaryLog(30, new Date(2019, 9, 1), 2, 6200),
      new SalaryLog(31, new Date(2019, 10, 1), 2, 6200),
      new SalaryLog(32, new Date(2019, 11, 1), 2, 6200),
      new SalaryLog(33, new Date(2020, 0, 1), 2, 6200),
      new SalaryLog(34, new Date(2020, 1, 1), 2, 6200),
      new SalaryLog(35, new Date(2020, 2, 1), 2, 6200),
      new SalaryLog(36, new Date(2020, 3, 1), 2, 6200),
      new SalaryLog(37, new Date(2020, 4, 1), 2, 6200),
      new SalaryLog(38, new Date(2020, 5, 1), 2, 6200),
      new SalaryLog(39, new Date(2020, 6, 1), 2, 6200),
      new SalaryLog(40, new Date(2019, 10, 1), 3, 500),
      new SalaryLog(41, new Date(2019, 11, 1), 3, 500),
      new SalaryLog(42, new Date(2020, 0, 1), 3, 500),
      new SalaryLog(43, new Date(2020, 1, 1), 3, 500),
      new SalaryLog(44, new Date(2020, 2, 1), 3, 500),
      new SalaryLog(45, new Date(2020, 3, 1), 3, 500),
      new SalaryLog(46, new Date(2020, 4, 1), 3, 500),
      new SalaryLog(47, new Date(2020, 5, 1), 3, 500),
      new SalaryLog(48, new Date(2020, 6, 1), 3, 500),
      new SalaryLog(49, new Date(2019, 10, 1), 4, 450),
      new SalaryLog(50, new Date(2019, 11, 1), 4, 450),
      new SalaryLog(51, new Date(2020, 0, 1), 4, 450),
      new SalaryLog(52, new Date(2020, 1, 1), 4, 450),
      new SalaryLog(53, new Date(2020, 2, 1), 4, 450),
      new SalaryLog(54, new Date(2020, 3, 1), 4, 450),
      new SalaryLog(55, new Date(2020, 4, 1), 4, 450),
      new SalaryLog(56, new Date(2020, 5, 1), 4, 450),
      new SalaryLog(57, new Date(2020, 6, 1), 4, 450),
      new SalaryLog(58, new Date(2019, 11, 1), 5, 1600),
      new SalaryLog(59, new Date(2020, 0, 1), 5, 1600),
      new SalaryLog(60, new Date(2020, 1, 1), 5, 1600),
      new SalaryLog(61, new Date(2020, 2, 1), 5, 1600),
      new SalaryLog(62, new Date(2020, 3, 1), 5, 1600),
      new SalaryLog(63, new Date(2020, 4, 1), 5, 1600),
      new SalaryLog(64, new Date(2020, 5, 1), 5, 1600),
      new SalaryLog(65, new Date(2020, 6, 1), 5, 1600),
    ];
    this._sectors = [
      // this will be getted from the server  
      new Sector(1, 'Backend', 1),
      new Sector(2, 'Frontend', 1),
      new Sector(3, 'DevOps', 1),

      new Sector(4, 'standards', 2),
      new Sector(5, 'security testing', 2),
      new Sector(6, 'online sales', 3)
    ];
    this._HRs = [
      new HRUser(1, 'rahaf malas', 'a1', 'rahaf.malas@gmail.com', '../../assets/imgs/HRImgs/rahaf.jpg'),
      new HRUser(2, 'tameem habash', 'a12', 'tameem.habash@gmail.com', '../../assets/imgs/HRImgs/tameem.jpg'),
      new HRUser(3, 'abdelrahaman tamimi', 'a123', 'abdelrahaman.altamimi@gmail.com', '../../assets/imgs/HRImgs/abd.jpg'),
      new HRUser(4, 'jehad adwan', 'a1234', 'jehad.adwan@gmail.com', '../../assets/imgs/HRImgs/jehad.jpg')
    ];
  }
  getAbsences(): Absence[] {
    return this._absences;
  }
  getEmployees(): Employee[] {
    return this._employees;
  }
  getAttendances(): Attendance[] {
    return this._attendances;
  }
  getDepartments(): Department[] {
    return this._departments;
  }
  getSalaryLogs(): SalaryLog[] {
    return this._salaryLogs;
  }
  getSalaries(): Salary[] {
    return this._salaries;
  }
  getSectors(): Sector[] {
    return this._sectors;
  }
  getHRs(): HRUser[] {
    return this._HRs;
  }
}
