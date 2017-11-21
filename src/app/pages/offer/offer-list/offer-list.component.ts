import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit, OnDestroy {

  contacts: any[];
  recent: any[];
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

  ngOnInit() {

        this.contacts = [
          {user: "nick", type: 'mobile'},
          {user: "eva", type: 'home'},
          {user: "jack", type: 'mobile'},
          {user: "lee", type: 'mobile'},
          {user: "alan", type: 'home'},
          {user: "kate", type: 'work'},
        ];

        this.recent = [
          {user: "alan", type: 'home', time: '9:12 pm'},
          {user: "eva", type: 'home', time: '7:45 pm'},
          {user: "nick", type: 'mobile', time: '5:29 pm'},
          {user: "lee", type: 'mobile', time: '11:24 am'},
          {user: "jack", type: 'mobile', time: '10:45 am'},
          {user: "kate", type: 'work', time: '9:42 am'},
          {user: "kate", type: 'work', time: '9:31 am'},
          {user: "jack", type: 'mobile', time: '8:01 am'},
        ];

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }


}
