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

//for Steve's Test
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';



@Injectable()
export class ApiDataService {
  watches: FirebaseListObservable<Watch[]>;

  //for Steve's Test
  headers: Headers;
  options: RequestOptions;

  constructor(private jsonp: Jsonp, private database: AngularFireDatabase)  {
    this.watches = database.list('watches');

    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  apiCall(stopId: string) {
    let apiRoot: string = 'http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_' + stopId + '.json';
    let apiURL =`${apiRoot}?callback=JSONP_CALLBACK&key=377e7bc6-e6c6-494d-b18f-f66b6dd49226`;
    return this.jsonp.request(apiURL).map(
      res => res.json()
    );
  }

  //Steve's test
  getDepartures(stopId: string) {
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
      return this.database.list('watches');
    }

    addWatch(newWatch : Watch) {
      this.watches.push(newWatch);
    }

}
