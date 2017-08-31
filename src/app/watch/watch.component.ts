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

  watches: Watch[] = [];
  arrivals;
  data: any;
  currentTime;
  watch;

  constructor(private apiData: ApiDataService, private timeService: TimeService) {
    setInterval(() => { this.getNextArrivalTime(); }, 5000);
  }

  ngOnInit() {
    this.apiData.getWatches().subscribe(res => {
      this.watch = res[0];
      this.watches = res;
    }, res => this.handleError(res));
    this.apiData.apiCall(this.watch.stopID)
    .subscribe(res => this.handleData(res),res => this.handleError(res));
  }

  getNextArrivalTime() {
    this.apiData.apiCall(this.watch.stopID)
    .subscribe(res => this.handleData(res), res => this.handleError(res));
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
