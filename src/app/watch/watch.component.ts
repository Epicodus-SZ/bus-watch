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
  currentTime: number = 23;
  constructor(private apiData: ApiDataService) {
    setInterval(() => { this.runAfterInitToGetArrivalTimes(); }, 1000);
  }

  ngOnInit() {
    //populate watches array
    this.watches = [];
    this.apiData.getWatches().subscribe(watches => {
      watches.forEach(watch => {

        console.log(watch);

        this.watches.push(new Watch(watch.routeID, watch.stopID, watch.userID, watch.nextArrival));
      });
    });
    console.log(this.watches);

    this.runAfterInitToGetArrivalTimes();
  }

  runAfterInitToGetArrivalTimes() {
    this.apiData.apiCall("1_570").subscribe(dataFromService => {this.data = dataFromService});

    this.watches.forEach(watch => {
      this.getTime(watch.routeID);
      watch.nextArrival = this.time;
    });
  }

  getTime(routeId: string) {
    console.log(this.data);
    this.currentTime = this.data.currentTime;
    this.data.data.entry.arrivalsAndDepartures.forEach(arrival => {
      if(routeId == arrival.routeShortName) {
        this.time = arrival.scheduledArrivalTime;
      }
    });
  }

}
