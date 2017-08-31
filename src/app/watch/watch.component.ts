import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [ApiDataService]
})
export class WatchComponent implements OnInit {

  watches: Watch[] = [];
  arrivals;
  data: any;
  currentTime;
  watch;

  constructor(private apiData: ApiDataService) {
    setInterval(() => { this.getNextArrivalTime(); }, 5000);
  }

  ngOnInit() {
    this.apiData.getWatches().subscribe(res => {
      this.watch = res[0];
      this.watches = res;
    });
    this.apiData.apiCall("570")
    .subscribe(res => {
        this.handleData(res),
        res => this.handleError(res);
    });
  }

  getNextArrivalTime() {
    this.apiData.apiCall("570")
    .subscribe(res => this.handleData(res), res => this.handleError(res));

    this.watches.forEach(watch => {
      let counter: number = 0;
      this.arrivals.forEach(arrival => {
        if((watch.routeID === arrival.routeShortName) && (counter < 1)) {
          if(arrival.scheduledArrivalTime > this.currentTime) {
            counter++;
            watch.nextArrival = ((arrival.scheduledArrivalTime - this.currentTime) / 60000);
          }
        }
      });
    });
  }

  handleData(response) {
    this.currentTime = response.currentTime;
    this.arrivals = response.data.entry.arrivalsAndDepartures;
  }

  handleError(error) {
    console.log('error:', error);
    return Observable.throw(error);
  }
}
