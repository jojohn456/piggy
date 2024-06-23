import Dexie, { Table } from 'dexie';
import { MomPig } from './models/MomPig';

export class MySubClassedDexie extends Dexie {
  MomPigs!: Table<MomPig>;
  constructor() {
    super('myDatabase');
    this.version(1).stores({
      MomPigs:
        '++id, Name, TheDate, Note, FirstHeat, SecondHeat, Vitamins, Farrowing',
    });
  }
}

export const db = new MySubClassedDexie();
