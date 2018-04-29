import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule } from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {UtilModule} from '../util/util.module';

//import { AuthGuard } from '././auth-guard.service';

import {OfferComponent} from './offer.component';
import { OfferRoutingModule } from './offer-routing.module';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { OfferProposerComponent } from './offer-proposer/offer-proposer.component';

import {DropdownModule,DialogModule,OverlayPanelModule,SelectButtonModule,AutoCompleteModule,SliderModule,} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';

import {OfferService} from './offer.service';
import {CountryService} from './country.service';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [

    ThemeModule,
    UtilModule,
    OfferRoutingModule,
    TableModule,
    DataViewModule,
    PanelModule,
    MultiSelectModule,
    SliderModule,
    CheckboxModule,
    EditorModule,
    InputTextareaModule,
    ToolbarModule,
    HttpClientModule,
    DropdownModule,DialogModule,OverlayPanelModule,SelectButtonModule,AutoCompleteModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    }),

  ],
  providers: [
    OfferService,
    CountryService
  ],
  declarations: [
                  OfferComponent,
                  OfferDetailComponent,
                  OfferListComponent,
                  OfferProposerComponent,
                ],
})
export class OfferModule {
}
