import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TradeBuyerComponent} from './trade-buyer/trade-buyer.component';
import {TradeSellerComponent} from './trade-seller/trade-seller.component';
import {TradePageComponent} from './trade-page/trade-page.component';

const routes: Routes = [{
  path: '',
    children: [{
      path: 'buyer',
      component: TradeBuyerComponent,
    },{
      path: 'seller',
      component: TradeSellerComponent,
    },{
      path: 'trading',
      component: TradePageComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeRoutingModule { }
