import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Routes
import { AboutComponent } from './about/about.component'

const appRoutes: Routes = [ 
  {
    path: 'about',
    component: AboutComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
