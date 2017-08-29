import { Injectable } from '@angular/core';
import { Watch } from './watch';
import {
  Headers,
  Http,
  Jsonp,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/map';
//for FireBase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Injectable()
export class ApiDataService {
  watches: FirebaseListObservable<Watch[]>;
    apiRoot: string = 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_570.json';
    output: number;

    constructor(private jsonp: Jsonp, private database: AngularFireDatabase)  {
      this.watches = database.list('watches');
    }

    apiCall(stopId: string) {
      let apiURL =`${this.apiRoot}?callback=JSONP_CALLBACK&key=377e7bc6-e6c6-494d-b18f-f66b6dd49226`;
      return this.jsonp.request(apiURL).map(response => response.json());
    }

    getNextArrival(stopId: string, routeId: string) {
      this.apiCall(stopId).subscribe(response => {
        response.data.entry.arrivalsAndDepartures.forEach(arrival => {
          if(arrival.routeShortName === routeId) {
            this.output = arrival.scheduledArrivalTime;
          }
        });
      });
      return this.output;
    }


    getWatches() {
      return this.database.list('watches');
    }

    // setTimes(watches: FirebaseListObservable<any[]>) {
    //   for(let watch of watches) {
    //     let data = this.apiCall(watch.stopId);
    //     for(let arrival of data.data.entry.arrivalsAndDepartures) {
    //       if (watch.routeId === arrival.routeShortName) {
    //         watch.nextArrival = arrival.scheduledArrivalTime;
    //       }
    //     }
    //   }
    // }

    addWatch(newWatch : Watch) {
      this.watches.push(newWatch);
    }

}
