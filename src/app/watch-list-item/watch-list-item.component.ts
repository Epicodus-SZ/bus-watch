import { Component, Input, OnInit } from '@angular/core';
import { Watch } from '../watch';
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.css'],
  providers: [ApiDataService]
})
export class WatchListItemComponent implements OnInit {

  @Input() watch: Watch;

  constructor(private apiDataService: ApiDataService) { }

  ngOnInit() {
  }

  beginDeletingWatch(watchToDelete){
    if(confirm("Are you sure you want to delete this route?")){
      console.log("here " + watchToDelete.$key);
      this.apiDataService.deleteWatch(watchToDelete);
    }
  }

}
