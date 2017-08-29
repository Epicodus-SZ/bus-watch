import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Routes
import { AboutComponent } from './about/about.component'
import { ConfigComponent } from './config/config.component'
import { WatchComponent } from './watch/watch.component'

const appRoutes: Routes = [
  {
    path: '',
    component: WatchComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path: 'watch',
    component: WatchComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
