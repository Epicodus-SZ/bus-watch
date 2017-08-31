import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';

import { Observable } from 'rxjs/Observable';
import { TimeService } from '../time.service';


@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [ApiDataService, TimeService]
})
export class WatchComponent implements OnInit {

  currentTime: Observable<number>;
  watches: Watch[] = [];
  arrivals;
  private stopID: Observable<number>;

  constructor(private apiData: ApiDataService, private timeService: TimeService) {
  }

  ngOnInit() {

    //this.stopID = new Observable(res => )
    this.apiData.getWatches().subscribe(res => this.watches = res);

    this.getArrivals(this.watches[0].stopID).subscribe(res => this.handleData(res),res => this.handleError(res));

  }

  getArrivals(stopID: string){
    return this.apiData.getArrivals(stopID).map(res => res);
  }

  getArrivalTime(cTime:number, dTime: number){
    return this.timeService.minsToArrival(cTime,dTime);
  }

  handleData(response) {
    console.log('Raw response:', response);
    this.currentTime = response.currentTime;
    this.arrivals = response.data.entry.arrivalsAndDepartures;
    console.log("depart list is:",this.arrivals);
    // Insert Business logic here
  }

  handleError(error) {
    console.log('error:', error)
    return Observable.throw(error);
  }

}
