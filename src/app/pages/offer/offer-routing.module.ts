 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferListComponent } from './offer-list/offer-list.component';

const routes: Routes = [{
  path: '',
  component: OfferListComponent,
  children: [{
    path: 'detail',
    component: OfferDetailComponent,
  },{
    path: 'list',
    component: OfferListComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule { }
