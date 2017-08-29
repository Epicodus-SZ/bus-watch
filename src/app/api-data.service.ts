import { Injectable } from '@angular/core';
import { Watch } from './watch';

//for FireBase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Injectable()
export class ApiDataService {
  watches: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.watches = database.list('watches');
  }

  getWatches(){
    return this.watches;
  }

}
