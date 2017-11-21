import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrls: ['./trade-page.component.scss']
})

export class TradePageComponent implements OnInit, OnDestroy {
  accounts: string[];

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

  constructor(private http: Http,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
    this.breakpoints = breakpointService.getBreakpointsMap();
    this.themeSubscription = themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }  

  ngOnInit(): void {
    console.log('OnInit: ');
    console.log(this);

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
