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
  watches;
  private userName: string;

  constructor(private apiData: ApiDataService, public authService: AuthenticationService) {
    this.authService.user.subscribe(user =>  {
        this.userName = user.displayName;
    });
  }

  ngOnInit() {
    this.apiData.getWatches().subscribe(res => {
      this.watches = res;
    }, res => this.handleError(res));
  }

  submitForm(stopId: string) {
    console.log(this.userName);

    let newWatch: Watch = new Watch("0", stopId, this.userName, 0);
    this.apiDataService.addWatch(newWatch);
  }

  handleError(error) {
    console.log('error:', error);
    return Observable.throw(error);
  }
}
