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
  watches: Watch[];
  constructor(private apidata: ApiDataService) { }

  ngOnInit() {
    // old way
    //this.watches = this.apidata.getWatches();

    this.apidata.getWatches().subscribe(dataLastEmittedFromObserver => {
     this.watches = dataLastEmittedFromObserver;
     console.log(this.watches);
   })
  }

}
