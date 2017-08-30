import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  // Convert epoch time to minutes
  minsToArrival(currentTime: number, arrivalTime: number){
    return (arrivalTime - currentTime)/60000
  }
}
