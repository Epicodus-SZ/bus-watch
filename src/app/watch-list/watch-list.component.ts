import { Component, Input, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Watch } from '../watch';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  //variables
  @Input() watches: Watch[];

  constructor() {

  }

  ngOnInit() {

  }

}
