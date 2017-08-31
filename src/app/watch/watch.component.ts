import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [ApiDataService]
})
export class WatchComponent implements OnInit {
  //old way
  //watches: FirebaseListObservable<any[]>;
  // watches: Watch[] = [];
  watches;
  data: any;
  time: number;
  currentTime: number = 23;
  testNumber: number = 2;
  departures;
  errorMessage: string;

  constructor(private apiData: ApiDataService) {
    //setInterval(() => { this.runAfterInitToGetArrivalTimes(); }, 5000);
    // this.watches = apiData.getWatches();
  }

  ngOnInit() {
    //populate watches array
    this.apiData.getWatches().subscribe(res => this.watches = res);

    //Steve's Test
    this.getDeparts('570').subscribe(res => this.departures = res.data.entry.arrivalsAndDepartures);
          
  } //end of onInit

  getDeparts(stopID: string){
    return this.apiData.getDepartures(stopID).map(res => res);
  }

  handleData(response) {
    debugger;
    console.log('Raw response:', response);
    this.departures = response.data.entry.arrivalsAndDepartures;
    console.log("depart list is:",this.departures);
    // Insert Business logic here
  }

  handleError(error) {
    console.log('error:', error)
    return Observable.throw(error);
  }

  consoleDepartures(){
    console.log("departures1 is = ", this.departures);
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
