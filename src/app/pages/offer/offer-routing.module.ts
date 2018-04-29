import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferProposerComponent } from './offer-proposer/offer-proposer.component';
import { OfferComponent} from './offer.component';


const routes: Routes = [{
  path: '',
  component: OfferComponent,
  children: [
  	{path: 'list',component: OfferListComponent,},
    {path: 'add',component: OfferProposerComponent,},
    {path: ':id',component: OfferDetailComponent,},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule { }
