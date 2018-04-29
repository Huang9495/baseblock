import { Component, OnDestroy, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
//import fontawesome from '@fortawesome/fontawesome'
import * as _ from 'lodash';
import * as moment from 'moment';
import { Http, Headers,Response,RequestOptions }  from '@angular/http';

import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { DropdownModule,DialogModule,OverlayPanelModule,AutoCompleteModule} from 'primeng/primeng';

import { OfferService } from '../offer.service';
import { CountryService } from '../country.service';
import { TransactionService} from '../../util/transactions.service';
import { StorageService } from '../../../@core/utils/storage.service';
import { SocketTradeService } from '../../../@core/utils/socket.transaction.service';


// https://github.com/hbb520/angular4-primeng-admin/blob/master/src/app/data-table/data-table.component.ts


import { TranslateService } from '@ngx-translate/core'



@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  //styleUrls: ['./offer-list.component.scss']
})
// http://themes.getbootstrap.com/preview/?theme_id=1696&show_new=
export class OfferListComponent implements OnInit,OnDestroy {

  private closeResult: string;

  texts: string;
  currentTheme: string;
  themeSubscription: any;
  private subscription: Subscription;     // subscription

  private isLoading:boolean = true;

  private all_offers: Array<any>;
  private offers: Array<any>;
  private all_offeres: Array<any>;
  private offeres: Array<any>;
  private account;
  private sub: any;
  private _id: number;
  private offer: any;


//  cars: Car[];
//  cols: any[];


  country: any;
  countries: any[];
  filteredCountriesMultiple: any[];


  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private offerService: OfferService,
              private countryService: CountryService,
              private transactionService:TransactionService,
              private storageService:StorageService,
              private http:Http,
              private socketService:SocketTradeService,
              private themeService: NbThemeService,
              private translate: TranslateService) {


              console.log(this.translate);
              translate.addLangs(['zh-CN', 'en']);
              //设置默认语言，一般在无法匹配的时候使用
              translate.setDefaultLang('zh-CN');

              //获取当前浏览器环境的语言比如en、 zh
              let broswerLang = translate.getBrowserLang();
              translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');


  }

  ngOnInit() {
    this.getLocalData();
    //this.getWebData();
    //this.filter_city = this.filter_cities[0];
    //this.filter_payment = this.filter_payments[0];
    this.storageService.setItem('account', {"iss":"liveco.io","name":"helxsz","exp":1523165856,"iat":1522993056,"nbf":1522993056,"roles":["user","admin"],"amr":["pwd"],"upn":"helxsz@gmail.com","uid":"S179fm-WG","ver":"1.0","id":"S179fm-WG","email":"helxsz@gmail.com"});
  


/*  ********************p-table********************
    this.cols = [
        { field: 'user', header: 'Account' },
        { field: 'evaluate', header: 'Credit' },
        { field: 'payments', header: 'Method' },
        { field: 'limit', header: 'Transaction amount' }
    ];
*/


  }

  getLocalData(){
    this.all_offers = this.offerService.getDatas();
    this.all_offeres = this.offerService.getDatas();
    //this.countries = this.countryService.getCountries();
    console.log(this.all_offers);
    this.offers = this.all_offers;
    this.offeres = this.all_offers;
    console.log(this.all_offeres);
  }
/*
  getWebData(){
    var self = this;
    this.subscription =  this.offerService.getOffers("token=eth",0).subscribe(
            (res: any) =>{
            let msg = res.json()
            console.log(msg);
            self.all_offers = msg;
            self.offers = self.all_offers;
            console.log(self.all_offers);
    })
  }
*/
  ngOnDestroy() {
    //this.themeSubscription.unsubscribe();
    //this.subscription.unsubscribe();
  }

  private filter_payments = [
                     {label:'bank', value:'bank'},
                     {label:'wechat', value:'wechat'},
                     {label:'alipay', value:'alipay'},
                     {label:'cash', value:'cash'},
                     {label:'banking', value:'banking'}
                     
                    ];
 
  //private filter_payment =  {label:'banking', value:'banking'};

  private filter_cities = [
      {label:'china', value:'china'},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
  ];
  private filter_city =   {label:'New York', value:{id:1, name: 'New York', code: 'NY'}};

  private filter_sorts = [
                     {label:'comprehensive', value:'null'},
                     {label:'popularity', value:'popularity'},
                    ];
  
    

  private filter_currencies = [
                        {label:'ETH', value:'ETH'},
                        {label:'IOTA', value:'IOTA'},
                        {label:'ZENCASH', value:'ZENCASH'},
                        {label:'HUSH', value:'HUSH'}
                    ];
  private filter_currency = {label:'ETH', value:'ETH'} ;


  

  private filter_lanuages = [
                        {label:'中文', value:'chinese'},
                        {label:'english', value:'english'},
                        {label:'日本语', value:'japense'},
                        {label:'french', value:'french'}
                    ];
  private filter_lanuage = {label:'english', value:'english'} ;

  private sort_price = true;
  
  private filter_order_price = [
                    {label:' price ', value:'price'},
                    {label:' ascend ', value:'asc'},
                    {label:' descend ', value:'desc'}
                    ];


  private filter_order_evaluate = [
                    {label:' evaluate ', value:'price'},
                    {label:' ascend ', value:'asc'},
                    {label:' descend ', value:'desc'}
                    ];

    private filter_order_frequency = [
                    {label:' frequency ', value:'price'},
                    {label:' ascend ', value:'asc'},
                    {label:' descend ', value:'desc'}
                    ];



  filterCountryMultiple(event) {
      let query = event.query;
      console.log(query);
      this.http.get('./assets/country-list.json')
          .map(res => res.json())
          .subscribe((countries) => {
              console.log(countries);
                  this.filteredCountriesMultiple = this.filterCountry(query, countries);

      });
  }


  filterCountry(query, countries: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < countries.length; i++) {
        let country = countries[i];
        if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    return filtered;
  }


  onPaymentSelect(event){
      
      if(event) {
        console.log('this.previousVal', event);
        this.offers=_.filter(this.all_offers,function(item){
          return item.payments == event;
         });
      }
  }

  onCitySelect1(event){
      if(event) {
        console.log('this.previousVal', event);
        console.log(event.name,event.code);
        this.offers=_.filter(this.all_offers, function(item){
            console.log(item.location);
            return item.location == event.name;
         });
        console.log(this.offers);
      }
  }
  onCitySelect(event){
      if(event) {
        console.log('this.previousVal', event);

        this.offers=_.filter(this.all_offers, function(item){
            console.log(item.location);
            return item.location == event;
         });
        console.log(this.offers);
      }
  }
/*
  onSortSelect(event){
      if(event) {
        console.log('this.previousVal', event);
        this.offers=_.sortBy(this.all_offers, [function(item){
           //return +(item.price.substring(1));
           return item.price;
         }]);
         console.log(this.offers);
      }
  }
*/
  onOrders_evaluate(event){
      if(event) {
        console.log('this.previousVal', event);
        this.offers=_.orderBy(this.all_offers, [function(item){
           //return +(item.price.substring(1));
           return item.price;
         }],event);
         console.log(this.offers);
      }
  }

  onOrders_price(event){
      if(event) {
        console.log('this.previousVal', event);
        this.offers=_.orderBy(this.all_offers, [function(item){
           //return +(item.price.substring(1));
           return item.price;
         }],event);
         console.log(this.offers);
      }
  }






  selectedProfile;


  totalPages: number = 1;
  totalCount: number = 0;
  first: number = 0;
  gotoPage: number = 0;

  mySelection: any[];
  mySelectionId: any;
  mySelectionObject: any;
  dialog: boolean = false;

  /*************************  ********************************/
   paginate(event) {
     const num = event.page + 1;
     this.gotoPage = num;
     //this.get(num);
   }

   /*************************  ********************************/
   blurGotoPage() {
     if (this.gotoPage > this.totalPages) {
       this.gotoPage = this.totalPages;
     }
     //this.get(this.gotoPage);
   }






   onSelectChange(offer){
       console.log(offer);
       //this.onSelectOffer.emit(offer);
       console.log('/trade/'+offer._id+"/buyer");
       //this.router.navigate(['/pages/trade', offer._id,'buyer']);

       this.showDialog(offer);
   }

   private model = {
       sender: "",
       receiver:"",
       type:'buying',
       token:{amount:1, name:'eth'},
       payment:{'method':'banking', 'currency':'rmb', "total":0}
    };
   private display: boolean = false;


   showDialog(offer) {
     console.log(offer);
     let account = this.storageService.getItem('account');
     if(account){
        console.log(account.name +"  "+account.email);
        this.model.sender = account.name;
        this.model.receiver =  offer.user;
        this.display = true;
     }
   }


   setAmount(e) {
     console.log('Setting amount: ' + e.target.value);
     this.model.token.amount = e.target.value;
     this.model.payment.total += 1000 * this.model.token.amount;
   }



  ////////////////////////  International language ///////////////////////////

  changeLang(lang) {
    console.log(lang);
    this.translate.use(lang);
    console.log(this.translate.use(lang));
  }

  toggleLang() {
    console.log('11111');
    console.log(this.translate.getBrowserLang());
    //获取语言风格，相当于更详细的语言类型，比如zh-CN、zh-TW、en-US
    console.log(this.translate.getBrowserCultureLang());
  }

   ////////////////////////  transaction  invite ///////////////////////////

   // trade_id, invite_people, expiry, token:{amout, name}, buyer
   sendTransactionRequest(){
       this.model['time'] = new Date();
       this.socketService.sendTransactionInviteReq(this.model);
   }

   getTime(time){
      return moment(time).format("MMM Do YY");//  .toNow();
   }

}
