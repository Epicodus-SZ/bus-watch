import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  // Convert epoch time to minutes
  minsToArrival(currentTime: number, arrivalTime: number){
    let output = (arrivalTime - currentTime)/60000;
    return Math.ceil(output)
  }
}
