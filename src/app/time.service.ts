import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  // Convert epoch time to minutes
  minsToArrival(currentTime: number, departTime: number){
    let output = (departTime - currentTime)/60000;
    return Math.ceil(output);
  }
}
