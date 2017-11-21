import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';


@Component({
  selector: 'app-offer-detail-list',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit, OnDestroy {

  status = '';


  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;  
  constructor(
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
    this.breakpoints = breakpointService.getBreakpointsMap();
    this.themeSubscription = themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  } 

  ngOnInit(): void {
    console.log('OnInit: ' );
    console.log(this);



  }
  
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }


}
