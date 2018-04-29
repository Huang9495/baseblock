import { Component, OnDestroy, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers,Response,RequestOptions }  from '@angular/http';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { OfferService } from '../offer.service';
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-offer-proposer',
  templateUrl: './offer-proposer.component.html',
  styleUrls: ['./offer-proposer.component.scss']
})

// https://getbootstrap.com/docs/4.0/examples/checkout/

export class OfferProposerComponent implements OnInit,OnDestroy {

  currentTheme: string;
  themeSubscription: any;
  datas :any;
  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

  submited = false;
  selected = false;
  selected2 = false;
  selected3 = false;
  selected4 = false;
  selected5 = false;
  selected6 = false;

  private form;

  val1:number;
  evect:number;
  private val3: [-70,70];
  private text: string;
  private text2: string;
  private text3: string;


  private tags = [
    {label:'人工智能',value:'ai'},
    {label:'物联网',value:'iot'},
    {label:'交通',value:'transportation'},
    {label:'Fintech',value:'fintech'},
    {label:'医疗健康',value:'health'},
    {label:'物流',value:'logistic'},
    {label:'AR/VR',value:'ar/vr'},
    {label:'农业',value:'argriculture'},
    {label:'工业',value:'industrial'},
    {label:'创业公司',value:'startup'}
  ];

  private datas1 = [{label:'Buy', value:'buy'},{label:'Sell', value:'sell'}];

  private datas2 = [{label:'ETH', value:'eth'},{label:'BTC', value:'btc'},{label:'EOS', value:'eso'},{label:'OTB', value:'otb'},{label:'XRP', value:'xrp'},{label:'GXS', value:'gxs'}]

  private datas3 = [{label:'CNY', value:'cny'},{label:'USD', value:'usd'},{label:'KRW', value:'krw'},{label:'TWD', value:'twd'},{label:'HKD', value:'hkd'},{label:'JPY', value:'jpy'}]

  private datas4 = [{label:'bitstamp', value:'bitstamp'},{label:'coinmarketcap', value:'coinmarketcap'},{label:'bitfinex', value:'bitfinex'},{label:'average', value:'average'}];

  private datas5 = ['Bank Transfer','Alipay','WeChat','Cash'];

  private datas6 = ['卖家必须通过实名验证','卖家必须通过进阶验证'];


  private datas100 = ["Choose...","Buy","Cash(in person)","Bank transfer","Cash deposit","PayPal","International wire","Other","Alipay","WeChat Pay"];

  private datas101 = ["Choose...","ZWL(Zimbabwean Dollar)","TOP(Tongan Pa'anga)","UZS(Uzbekistan Som)","XAF(CFA Franc BEAC)","ZAR(South African Rand)","CUC(Cuban Conbvertible PeSO)","VUP(Cuban Peso)","DJF(Djiboutian Franc)","INR(Indian Rupee)","IQD(Iraqi Dinar)","IRR(Iranian Rial)","ISK(Lcelandic Krona)","JEP(Jersey Pound)","ERN(Eritrean Nakfa)","ETB(Ethiopian Birr)","FJD(Fijian Dollar)","FKP(Falkland Islands Pound)","KGS(Kurgystani som)","MXN(Mexican Peso)","MZN(Mozambican Metical)","PHP(Philippine Peso)","GIP(Gibraitar Pound)"];



  private datas99 = ["Choose...","Bitfinex ETH/USD","Kraken ETH/EUR","Kraken ETH/USD","Kraken ETH/GBP","Kraken ETH/CAD","Kraken ETH/JPY","gdax ETH/USD","gdax ETH/EUR","Bittrex ETH/USD","Polonlex ETH/USD","Bitstamp ETH/USD","CEX.IO ETH/USD","CEX.IO ETH/EUR","BitThumb ETH/KRW","HitBTC ETH/USD","OKCoin ETH/USD","HitBTC ETH/USD","Korbit ETH/KRW","Coinone ETH/KRW","Average(CoinMarketCap)"];


  private datas98 = ["Choose...","Guangzhou(广州)","Beijing(北京)","Shenzhen(深圳)","San Francisco(旧金山)","Los Angeles(洛杉矶)","New York(纽约)"];

  private datas7 = ["Choose...","United States"];

  private datas8 = ["Choose...","California"];


  constructor(private fb: FormBuilder,
              private router: Router,
              private http:Http,
              private offerService: OfferService,
              private themeService: NbThemeService,
              private translate: TranslateService) {

              console.log(this.translate);
              translate.addLangs(['zh-CN', 'en']);
              //设置默认语言，一般在无法匹配的时候使用
              translate.setDefaultLang('zh-CN');

              //获取当前浏览器环境的语言比如en、 zh
              let broswerLang = translate.getBrowserLang();
              translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');

              this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
              this.currentTheme = theme.name;
              });

  }

  ngOnInit() {
      console.log(this.val1);
      this.form = this.fb.group({

        'order':this.fb.group({
            'type': ["", Validators.required],   // 买或者卖
            'token': ["", Validators.required],  // 加密货币
            'fiat': [,Validators.minLength(14)],      // 支付的货币， 美元，人民币，日元等等     变量是数组， 可以有多种支付手段

            'price': ["", Validators.required],  // 自己设定的交易价格
            'min_price': ["", Validators.required],   // 自己可以接受的最低价格, 外人不可以见，但可以推荐
        }),

        'payment': this.fb.group({
           'methods': [ ,Validators.minLength(14)],  // 支付方式 ， 支付宝，微信等等       ，  变量是数组，可以有多种支付手段
           'limit_high': [,Validators.minLength(14)],  // 支付的最高限额  100，   需要 validate  limit_high > limit_low, 并且是数字，不能有负数
           'limit_low': [,Validators.minLength(14)],   // 支付的最低限额  1
        }),

        'extra': this.fb.group({                         // 额外的信息 ， 并且是 optional
          'terms': [ ,Validators.minLength(500)],        // 交易的须知
          'greet_start': [ ,Validators.minLength(200)],  // 交易开始自动回复
          'greet_end': [ ,Validators.minLength(200)]    // 交易结束自动回复
        }),

        'limit': this.fb.group({                         // 限制因素
          'max_order_number': [ ,Validators.minLength(200)],  // 同时最大处理订单数
          'min_trade_number': [ ,Validators.minLength(200)],  //卖家必须成交过几次
          'kyc_verified': [ ,Validators.minLength(200)],  // 实名验证
           // ?? 进阶验证 是什么
        })

      });


  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  onSubmit(form) {
    console.log(' offer  onSubmit',form);
    this.submited=true;

    form.user = 'helxsz';
    form.tokens = [{'name':'eth', 'min':1, 'max':4}];
    form.payments = ['banking','wechat'];
    form.currency = ['dollar','rmb'];

    this.offerService.createOffer(form).subscribe((res) =>{
      console.log(res);
      //this.router.navigate(['/offer']);
    });
  }






  onmultiselet1(event){
      console.log(event);
      this.http.get('./assets/currency.json')
               .map(res => res.json())
               .subscribe((currency) => {
                  console.log(currency);
                  console.log(currency.btc);
                  this.datas = this.decided(event,currency);
                  console.log(this.datas);
                  console.log(this.datas.type);
                  console.log(this.datas.value);
      });

  }


  decided(event,currency){
      let filtered;
      console.log(event);
      console.log(currency);
      if (event == 'btc'){
          console.log("123123123");
          console.log(currency.btc);
          filtered = currency.btc;
      }
      if (event == 'eth'){
          console.log("123123123");
          console.log(currency.eth);
          filtered = currency.eth;
      }
      if (event == 'XRP'){
          console.log("123123123");
          console.log(currency.XRP);
          filtered = currency.XRP;
      }
      console.log(filtered);
      return filtered;
  }

  handleChange(event){
    this.evect = event;
    console.log(this.evect);
  }

  onadd(event){
      console.log(event);
  }

  onSelect1(){this.selected=true;
  }

  onSelect2(){this.selected2=true;
  }
  onSelect3(){this.selected3=true;
  }
  onSelect4(){this.selected4=true;
  }
  onSelect5(){this.selected5=true;
  }
  onSelect6(){this.selected6=true;
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



}