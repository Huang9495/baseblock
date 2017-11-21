import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {UtilModule} from '../util/util.module';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferListComponent } from './offer-list/offer-list.component';
import {OfferDetailComponent} from './offer-detail/offer-detail.component';

@NgModule({
  imports: [
    ThemeModule,
    UtilModule,

    OfferRoutingModule
  ],
  declarations: [OfferDetailComponent,OfferListComponent]
})
export class OfferModule {
}
