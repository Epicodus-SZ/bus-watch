import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

//firebase support
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireAuthModule } from 'angularfire2/auth';

//json
import {JsonpModule, Jsonp, Response} from '@angular/http';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

//Routes
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { WatchComponent } from './watch/watch.component';
import { ConfigComponent } from './config/config.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { WatchListItemComponent } from './watch-list-item/watch-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WatchComponent,
    ConfigComponent,
    WatchListComponent,
    WatchListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
