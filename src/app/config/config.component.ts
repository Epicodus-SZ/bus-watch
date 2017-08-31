import { Component, OnInit } from '@angular/core';
import {Watch} from '../watch';
import { ApiDataService } from '../api-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [AuthenticationService, ApiDataService]
})
export class ConfigComponent implements OnInit {
  private userName: string;

  constructor(private apiDataService: ApiDataService, public authService: AuthenticationService) {
    this.authService.user.subscribe(user =>  {
        this.userName = user.displayName;
    });
  }

  ngOnInit() {
  }

  submitForm(stopId: string) {
    console.log(this.userName);
    let newWatch: Watch = new Watch("0", stopId, this.userName, 0);
    this.apiDataService.addWatch(newWatch);
  }
}
