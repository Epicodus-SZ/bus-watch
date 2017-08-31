import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';
import { Observable } from 'rxjs/Observable';
import { TimeService } from '../time.service';
import { AuthenticationService } from '../authentication.service';


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
  userName;
  userEmail;

  constructor(private apiData: ApiDataService, private timeService: TimeService, public authService: AuthenticationService) {
    setInterval(() => { this.getNextArrivalTime(); }, 2000);
    this.authService.user.subscribe(user =>  {
        this.userName = user.displayName;
        this.userEmail = user.email;
    });
  }

  ngOnInit() {
    this.apiData.getWatches().subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          if(snapshot.val().userID === this.userEmail){
            this.watches.push(new Watch(snapshot.val().routeID, snapshot.val().stopID, snapshot.val().userID, 0));
          }
        });
      });
    this.apiData.apiCall(this.watches[0].stopID)
    .subscribe(res => this.handleData(res),res => this.handleError(res));
  }

  getNextArrivalTime() {
    this.apiData.apiCall(this.watches[0].stopID)
    .subscribe(res => this.handleData(res), res => this.handleError(res));
  }

  convertArrivalMins(cTime: number, aTime: number){
    return this.timeService.minsToArrival(cTime, aTime);
  }
  handleData(response) {
    this.currentTime = response.currentTime;
    this.arrivals = response.data.entry.arrivalsAndDepartures;
  }

  handleError(error) {
    console.log('error:', error);
    return Observable.throw(error);
  }

  getTime(cTime: number){
    return this.timeService.getLocalTime(this.currentTime);
  }

}
