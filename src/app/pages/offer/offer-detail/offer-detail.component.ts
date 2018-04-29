import { Component, OnDestroy, OnInit,CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-detail-list',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit, OnDestroy {

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  private sub: any;

  id: number;
  offer: any;

  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private router: Router,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = breakpointService.getBreakpointsMap();
    this.themeSubscription = themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnInit(): void {
    var self = this;
    this.sub = this.route.params.subscribe(params => {
       console.log(params);
       self.id = +params['id']; // (+) converts string 'id' to a number
       console.log('OnInit: ',self.id );

       self.offerService.getOfferById(self.id).subscribe(
               (res: any) =>{
               let msg = res.json()
               console.log(msg);
               self.offer = msg.data;

       })
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.sub.unsubscribe();
  }


  trade_ratio = 10000;
  token_amount = 0 ;
  currency_amount =0 ;

  convertToCurrency(value){
    console.log('convertToCurrency',this.currency_amount);
    this.token_amount= this.currency_amount/this.trade_ratio;
  }

  convertToToken(value){
    console.log('convertToToken',this.token_amount);
    this.currency_amount= this.token_amount*this.trade_ratio;
  }

  openTrade(){
      console.log('open trade');
      this.router.navigate(['/trade/trading','abc']);
  }

}
