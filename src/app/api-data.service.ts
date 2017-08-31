import { Injectable, Output } from '@angular/core';
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

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


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

    //Steve's test
    getArrivals(stopId: string) {
      let apiRoot: string = 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_' + stopId + '.json';
      let apiURL =`${apiRoot}?callback=JSONP_CALLBACK&key=377e7bc6-e6c6-494d-b18f-f66b6dd49226`;
      console.log("url is:", apiURL);
      return this.jsonp
        .request(apiURL)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
      let body = res.json();
      return body || {};
    }

    private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

    getWatches() {
      return this.database.list('watches', { preserveSnapshot: true});
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
      window.location.reload();

    }

    // deleteWatch() {
    //   this.watch.remove();
    // }

    getWatchById($key: string){
      return this.database.object('watches/' + $key);
    }

    deleteWatch(localWatchToDelete) {
      // console.log(localWatchToDelete.nextArrival)
      var watchEntryInFirebase = this.getWatchById(localWatchToDelete.nextArrival);
      watchEntryInFirebase.remove();
      window.location.reload();
    }

}
