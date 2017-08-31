import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  //variables
  @Input() watches: FirebaseListObservable<any[]>;

  constructor() {

  }

  ngOnInit() {
    for (let i in this.watches) {
      console.log(i);
    }

  }

}
