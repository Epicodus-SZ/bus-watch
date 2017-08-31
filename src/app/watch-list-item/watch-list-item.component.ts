import { Component, Input, OnInit } from '@angular/core';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.css'],
  providers: [ApiDataService]
})
export class WatchListItemComponent implements OnInit {

  @Input() watch: Watch;

  // newMatch: Watch = this.watch;
  data: any;
  dataArray: any[] = [];
  testTime: number = 0;

  constructor(private apiData: ApiDataService) {
    setInterval(() => { this.getNextArrivalTime(this.watch.routeID); }, 5000);
  }

  ngOnInit() {
    //open stream
    this.apiData.apiCall(this.watch.stopID)
    .subscribe(res => {
        this.data = res;
    });
  }

  getNextArrivalTime(routeId: string) {
    this.apiData.apiCall(this.watch.stopID)
    .subscribe(res => {
        this.data = res;
        this.dataArray.push(this.data);
        console.log("res=",res);
        console.log(this.dataArray);

    });

    console.log(this.data);
    let currentTime: number = 0;
    let time: number = 8888888888888888;
    let counter: number = 0;

    currentTime = this.data.currentTime;

    this.data.data.entry.arrivalsAndDepartures.forEach(arrival => {
      if((routeId === arrival.routeShortName) && (counter < 1)) {
        if(arrival.scheduledArrivalTime > currentTime) {
          counter++;
          time = arrival.scheduledArrivalTime;
        }
      }
    });

    this.watch.nextArrival = (time - currentTime) / 1000 / 60;
  }
}
