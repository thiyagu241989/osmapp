import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/_guards';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(mod => mod.AuthModule)
   }

];

export const AppRoutingModule = RouterModule.forRoot(routes);
