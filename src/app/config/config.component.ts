import { Component, Input, OnInit } from '@angular/core';
import {Watch} from '../watch';
import { ApiDataService } from '../api-data.service';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [AuthenticationService, ApiDataService]
})
export class ConfigComponent implements OnInit {
  watches: Watch[] = [];
  private userName: string;
  private userEmail: string;

  constructor(private apiData: ApiDataService, public authService: AuthenticationService) {
    this.authService.user.subscribe(user =>  {
        this.userName = user.displayName;
        this.userEmail = user.email;
    });
  }

  ngOnInit() {
    // this.apiData.getWatches().subscribe(res => {
    //   this.watches = res;
    // }, res => this.handleError(res));
    this.apiData.getWatches().subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          if(snapshot.val().userID === this.userEmail){
            this.watches.push(new Watch(snapshot.val().routeID, snapshot.val().stopID, snapshot.val().userID, snapshot.key));
          }
        });
      });
      console.log(this.watches);
  }

  submitForm(stopId: string) {
    console.log(this.userName);

    let newWatch: Watch = new Watch("0", stopId, this.userEmail, 0);
    this.apiData.addWatch(newWatch);
  }

  handleError(error) {
    console.log('error:', error);
    return Observable.throw(error);
  }
}
