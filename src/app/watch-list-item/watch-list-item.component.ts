import { Component, Input, OnInit } from '@angular/core';
import { Watch } from '../watch';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.css']
})
export class WatchListItemComponent implements OnInit {

  @Input() watch: Watch;

  constructor() { }

  ngOnInit() {
  }

}
