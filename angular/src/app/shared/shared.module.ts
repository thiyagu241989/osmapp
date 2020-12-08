import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component'; 

@NgModule({
  declarations: [LandingHeaderComponent, LandingFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LandingHeaderComponent,LandingFooterComponent],
})
export class SharedModule { }
