import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';


@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [ApiDataService]
})
export class WatchComponent implements OnInit {
  //old way
  //watches: FirebaseListObservable<any[]>;
  watches: Watch[] = [];
  data: any;
  time: number;
  currentTime: number;
  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    //populate watches array
    this.watches = [];
    this.apiData.getWatches().subscribe(watches => {
      watches.forEach(watch => {
        // watch.nextArrival = this.oneBusApiService.getNextArrival(watch.stopId, watch.routeId);
        console.log(watch);
        // this.watches.push(watch);
        //watch.nextArrival = this.apiData.getNextArrival(watch.stopId, watch.routeId);
        this.watches.push(new Watch(watch.routeId, watch.stopId, watch.userId, watch.nextArrival));
      });
    });
  }

  runAfterInitToGetArrivalTimes() {
    this.apiData.apiCall("1_570").subscribe(res => this.data = res);
    this.watches.forEach(watch => {
      this.getTime(watch.routeID);
      debugger;
      watch.nextArrival = this.time;
    });
  }

  getTime(routeId: string) {

    this.currentTime = this.data.currentTime;
    this.data.data.entry.arrivalsAndDepartures.forEach(arrival => {
      if(routeId == arrival.routeShortName) {
        this.time = arrival.scheduledArrivalTime;
      }
    });
  }

}
