import Dexie, { Table } from 'dexie';
import {MomPig} from './models/MomPig';

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  MomPigs!: Table<MomPig>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
        MomPigs: '++id, Name, TheDate, Note, FirstHeat, SecondHeat, Farrowing' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();