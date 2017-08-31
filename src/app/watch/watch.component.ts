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
  testNumber: number = 2;

  constructor(private apiData: ApiDataService) {
    setInterval(() => { this.runAfterInitToGetArrivalTimes(); }, 5000);
  }

  ngOnInit() {
    //populate watches array
    // this.watches = [];
    this.apiData.getWatches().subscribe(watches => {
      watches.forEach(watch => {

        console.log(watch);

        this.watches.push(watch);
      });
    });
    console.log(this.watches);

    this.apiData.apiCall("455").subscribe(dataFromService => {this.data = dataFromService});
  }

  runAfterInitToGetArrivalTimes() {

    this.watches.forEach(watch => {
      this.apiData.apiCall(watch.stopID).subscribe(dataFromService => {
        this.data = dataFromService;
        console.log("watch=",watch);
        console.log("data from service=",dataFromService);
      });

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
