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
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';



@Injectable()
export class ApiDataService {
  watch: FirebaseObjectObservable<any>;
  watches: FirebaseListObservable<Watch[]>;


    constructor(private jsonp: Jsonp, private database: AngularFireDatabase)  {
      this.watch = database.object('/watch');
      this.watches = database.list('watches');
    }

    apiCall(stopId: string) {
      let apiRoot: string = 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_' + stopId + '.json';
      let apiURL =`${apiRoot}?callback=JSONP_CALLBACK&key=377e7bc6-e6c6-494d-b18f-f66b6dd49226`;
      return this.jsonp.request(apiURL).map(
        res => res.json()
      );
    }

    // getMinutesToNext(stopId: string, routeId: string) {
    //
    //   return this.apiCall(stopId).subscribe(response => {
    //     response.data.entry.arrivalsAndDepartures.find(arrival => {
    //       if(arrival.routeShortName === routeId) {
    //         return arrival.scheduledArrivalTime;
    //       }
    //     });
    //   });
    // }


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

    // deleteWatch() {
    //   this.watch.remove();
    // }

    getWatchById(watchId: string){
      return this.database.object('watches/' + watchId);
    }


    deleteWatch(localWatchToDelete) {
      console.log(localWatchToDelete.$key)
      var watchEntryInFirebase = this.getWatchById(localWatchToDelete.$key);
      watchEntryInFirebase.remove();
      window.location.reload();
    }

}
