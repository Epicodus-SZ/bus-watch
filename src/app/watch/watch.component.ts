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

  constructor(private apiData: ApiDataService) {
  }

  ngOnInit() {
    this.apiData.getWatches().subscribe(res => this.watches = res);
  }

}
