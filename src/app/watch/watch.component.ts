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

  watches: Watch[] = [];
  time: number;
  currentTime: number = 23;
  testNumber: number = 2;

  constructor(private apiData: ApiDataService) {
  }

  ngOnInit() {
    //populate watches array from firebase
    this.watches = [];
    this.apiData.getWatches().subscribe(watches => {
      watches.forEach(watch => {
        this.watches.push(new Watch(watch.routeID, watch.stopID, watch.userID, watch.nextArrival));
      });
    });
  }



}
