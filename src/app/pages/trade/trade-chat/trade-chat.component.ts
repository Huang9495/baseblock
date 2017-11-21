import {Component, OnInit} from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat-info',
  templateUrl: './trade-chat.component.html',
  styleUrls: ['./trade-chat.component.scss']
})



export class TradeChatComponent implements OnInit {
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

  constructor(private themeService: NbThemeService,
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
