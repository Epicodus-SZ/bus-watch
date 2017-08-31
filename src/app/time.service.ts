import { Injectable } from '@angular/core';


@Injectable()
export class TimeService {

  constructor() { }

  // Convert epoch time to minutes
  minsToArrival(currentTime: number, arrivalTime: number){
    let output = (arrivalTime - currentTime)/60000;
    return Math.ceil(output)
  }

  // Get local time
  getLocalTime(currentTime: number) {
    //var utcSeconds = currentTime;
    var d = new Date(currentTime); // The 0 there is the key, which sets the date to the epoch
    return d.toString();
  }
}
