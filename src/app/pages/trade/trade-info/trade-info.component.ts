import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-trade-info',
  templateUrl: './trade-info.component.html',
  styleUrls: ['./trade-info.component.scss']
})

export class TradeInfoComponent implements OnInit, OnDestroy {
  accounts: string[];
  MetaCoin: any;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

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
