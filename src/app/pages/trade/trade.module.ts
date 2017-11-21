import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {ThemeModule } from '../../@theme/theme.module';
import {UtilModule} from '../util/util.module';

import {TradeRoutingModule } from './trade-routing.module';
import {TradeBuyerComponent} from './trade-buyer/trade-buyer.component';
import {TradeSellerComponent} from './trade-seller/trade-seller.component';
import {TradeChatComponent}  from './trade-chat/trade-chat.component';
import {TradeInfoComponent}  from './trade-info/trade-info.component';
import {TradePageComponent}  from './trade-page/trade-page.component';

@NgModule({
  imports: [
    ThemeModule,

    UtilModule,
    TradeRoutingModule
  ],
  declarations: [TradeBuyerComponent,
                 TradeSellerComponent,
                 TradeInfoComponent,
                 TradePageComponent
                 ]
})
export class TradeModule {

}
