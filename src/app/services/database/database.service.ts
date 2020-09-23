import { Injectable } from '@angular/core';
import * as idb from 'idb';
import { Subject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly _HRDBName: string = 'HRDB';
  private _HRDBVersion: number = 1;
  private _HRDB: idb.IDBPDatabase;
  private _dataChange: Subject<any> = new Subject<any>();
  private _dbPromise: Promise<idb.IDBPDatabase>;
  constructor() {
    this.connectToIDB();
  }

  connectToIDB() {
    this._dbPromise = idb.openDB(this._HRDBName, this._HRDBVersion, {
      upgrade(db) {
        // debugger;
        if (!db.objectStoreNames.contains('employee')) {
          const empObjStore = db.createObjectStore('employee', { keyPath: "_ID" });
          empObjStore.createIndex('name', 'name', { unique: false });
          empObjStore.createIndex('gender', 'gender', { unique: false });
          empObjStore.createIndex('SSN', 'SSN', { unique: false });
          empObjStore.createIndex('telNumber', 'telNumber', { unique: false });
          empObjStore.createIndex('nationality', 'nationality', { unique: false });
          empObjStore.createIndex('nationalID', 'nationalID', { unique: false });
          empObjStore.createIndex('birthDate', 'birthDate', { unique: false });
          empObjStore.createIndex('startDate', 'startDate', { unique: false });
          empObjStore.createIndex('rating', 'rating', { unique: false });
          empObjStore.createIndex('address', 'address', { unique: false });
          empObjStore.createIndex('status', 'status', { unique: false });
          empObjStore.createIndex('email', 'email', { unique: false });
          empObjStore.createIndex('active', 'active', { unique: false });
          empObjStore.createIndex('departmentID', 'departmentID', { unique: false });
          empObjStore.createIndex('sectorID', 'sectorID', { unique: false });
          empObjStore.createIndex('HRID', 'HRID', { unique: false });
        }
        if (!db.objectStoreNames.contains('department')) {
          const deptObjStore = db.createObjectStore('department', { keyPath: "_ID" });
          deptObjStore.createIndex('_name', '_name', { unique: false });
          deptObjStore.createIndex('_description', '_description', { unique: false });
          deptObjStore.createIndex('managerID', 'managerID', { unique: false });
        }
        if (!db.objectStoreNames.contains('sector')) {
          const sectorObjStore = db.createObjectStore('sector', { keyPath: "_ID" });
          sectorObjStore.createIndex('_name', '_name', { unique: false });
          sectorObjStore.createIndex('_departmentID', '_departmentID', { unique: false });
          sectorObjStore.createIndex('_description', '_description', { unique: false });
        }
        if (!db.objectStoreNames.contains('HRUser')) {
          const HRUserObjStore = db.createObjectStore('HRUser', { keyPath: "_HRID" });
          HRUserObjStore.createIndex('_userName', '_userName', { unique: true });
          HRUserObjStore.createIndex('_password', '_password', { unique: false });
          HRUserObjStore.createIndex('_email', '_email', { unique: true });
          HRUserObjStore.createIndex('_image', '_image', { unique: false });
        }
        if (!db.objectStoreNames.contains('salary')) {
          const salaryObjStore = db.createObjectStore('salary', { keyPath: "_salaryID" });
          salaryObjStore.createIndex('employeeID', 'employeeID', { unique: false });
          salaryObjStore.createIndex('amount', 'amount', { unique: false });
        }
        if (!db.objectStoreNames.contains('salaryLog')) {
          const salaryLogObjStore = db.createObjectStore('salaryLog', { keyPath: "_logID" });
          salaryLogObjStore.createIndex('_logDate', '_logDate', { unique: false });
          salaryLogObjStore.createIndex('_salaryID', '_salaryID', { unique: false });
          salaryLogObjStore.createIndex('value', 'value', { unique: false });
          salaryLogObjStore.createIndex('bonus', 'bonus', { unique: false });
        }
        if (!db.objectStoreNames.contains('absence')) {
          const absenceObjStore = db.createObjectStore('absence', { keyPath: "absenceID" });
          absenceObjStore.createIndex('employeeID', 'employeeID', { unique: false });
          absenceObjStore.createIndex('absenceDate', 'absenceDate', { unique: false });
          absenceObjStore.createIndex('excuse', 'excuse', { unique: false });
          absenceObjStore.createIndex('absenceDescription', 'absenceDescription', { unique: false });
        }
        if (!db.objectStoreNames.contains('attendance')) {
          const attendanceObjStore = db.createObjectStore('attendance', { keyPath: "attendanceID" });
          attendanceObjStore.createIndex('employeeID', 'employeeID', { unique: false });
          attendanceObjStore.createIndex('attendanceDate', 'attendanceDate', { unique: false });
          attendanceObjStore.createIndex('entry', 'entry', { unique: false });
          attendanceObjStore.createIndex('leave', 'leave', { unique: false });
          attendanceObjStore.createIndex('dailyHours', 'dailyHours', { unique: false });
        }
      }
    });
  }


  private async _getAll(target: string) {
    try {
      const db = await this._dbPromise;
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      const allData = await store.getAll();
      return allData;
    } catch (resone) {
      console.log(resone);
    }
  }

  getAll(target: string): Observable<any> {
    return from(this._getAll(target));
  }

  private async _get(target: string, key: number | string) {
    try {
      const db = await this._dbPromise;
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      const item = await store.get(key);
      return item;
    } catch (resone) {
      console.log(resone);
    }
  }

  get(target: string, key: number | string): Observable<any> {
    return from(this._get(target, key));
  }

  private async _addItem(target: string, newEntity: any) {
    try {
      const db = await this._dbPromise;
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      await store.add(newEntity);
      const entityKeyPath: string = store.keyPath.toString();
      const addedEntity = await store.get(newEntity[entityKeyPath]);
      return addedEntity;
    } catch (resone) {
      console.log(resone);
    }
  }

  addItem(target: string, newEntity: any): Observable<typeof newEntity> {
    return from(this._addItem(target, newEntity));
  }

  private async _editItem(target: string, editedEntity: any) {
    try {
      const db = await this._dbPromise;
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      const entityKeyPath: string = store.keyPath.toString();
      await store.put(editedEntity);
      const entity = await store.get(editedEntity[entityKeyPath]);
      return entity;
    } catch (resone) {
      console.log(resone);
    }
  }

  editItem(target: string, editedEntity: any): Observable<typeof editedEntity> {
    return from(this._editItem(target, editedEntity));
  }

  private async _deleteItem(target: string, entity: any) {
    try {
      const db = await this._dbPromise;
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      const key = entity[store.keyPath.toString()];
      const deletedEntity = await store.get(key);
      await store.delete(key);
      return deletedEntity;
    } catch (resone) {
      console.log(resone);
    }
  }

  deleteItem(target: string, entity: any): Observable<typeof entity> {
    return from(this._deleteItem(target, entity))
  }

  private async _deleteItems(target: string, entities: any[]) {
    try {
      const db = await this._dbPromise;
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      const keypath = store.keyPath.toString();
      entities.forEach(async (entity) => {
        await store.delete(entity[keypath]);
      });
      return entities;
    } catch (resone) {
      console.log(resone);
    }
  }

  deleteItems(target: string, entities: any[]): Observable<typeof entities> {
    return from(this._deleteItems(target, entities))
  }


  // dataChanged(): Observable<any> {
  //   return this._dataChange;
  // }
}
