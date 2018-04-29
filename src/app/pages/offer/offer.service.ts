import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions }  from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class OfferService {

  limit = 30;

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  private data =[

        { id:'1',account: 'jayjay',record:'40', method: 'Alipay', city: 'Shanghai', range: '¥1.0K to ¥100.0K', price:'£399.81' },
        { id:'1',account: 'keyjoke', record:'50', method: 'Alipay', city: 'Shanghai', range: '€50 to €100', price:'€505.25' },
        { id:'1',account: 'EtherTradr', record:'60', method: 'WeChat Pay', city: 'Mumbai', range: '$1.0K to $5.0K', price:'¥800.80'},
        { id:'1',account: 'Camylopez', record:'70', method: 'Cash (in person)', city: 'Shanghai', range: '$1.0K to $5.0K', price:'¥800.80' },
        { id:'1',account: 'trafgrinder', record:'80', method: 'PayPal', city: 'Boston', range: '$200 to $1.0K', price:'$570.24' },
        { id:'1',account: 'jayjay',record:'100', method: 'Bank transfer', city: 'Shanghai', range: '£500 to £1.5K', price:'£399.81' },
        { id:'1',account: 'Camylopez', record:'250', method: 'Cash (in person)', city: 'Mumbai', range: '¥1.0K to ¥100.0K', price:'¥3361.00' },
        { id:'1',account: 'EtherTradr', record:'100',  method: 'Alipay', city: 'Shanghai', range: '£500 to £1.5K', price:'£399.81' },
        { id:'1',account: 'EtherTradr', record:'5', method: 'Alipay', city: 'Shanghai', range: '¥1.0K to ¥100.0K', price:'¥800.80'},
        { id:'1',account: 'cryptoguy23', record:'220', method: 'Cash (in person)', city: 'Mumbai', range: '£500 to £1.5K', price:'£400.81' }
/*
        { id:'1',account: 'EtherTradr', record:'260', method: 'Alipay', city: 'Shanghai', range: '¥1.0K to ¥100.0K', price:'CN¥3362.00'},
        { id:'1',account: 'ethtradernz', record:'300', method: 'Cash (in person)', city: 'Shanghai', range: '$1.0K to $5.0K', price:'¥800.80' },
        { id:'1',account: 'EtherTradr', record:'310', method: 'Alipay', city: 'London', range: '$1.0K to $5.0K', price:'¥801.80' },
        { id:'1',account: 'Camylopez', record:'500', method: 'Cash deposit', city: 'Sydney', range: '¥1.0K to ¥100.0K', price:'£401.81' },
        { id:'1',account: 'jayjay', record:'420', method: 'Bank transfer', city: 'London', range: '£500 to £1.5K', price:'£398.81' }
*/

  ];

  private price = [ { username: 'keyjoke',identitykey:'09f2d6500675f6b2',registered:'October, 2017',trades:'170+ ', volume:'~350 ETH',goodfeedback:'99%', emailverified:'Yes', phoneverified:'Yes' }
  ];



  private datas = [
  
  {"_id":"5ab4c80cedb78dfd1e217780","type":"Buy","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["100%"],"currency":["dollar","rmb"],"payments":[{"method1":"payment_alipay","method2":"payment_wechat"}],"frequency":["11 times"],"limit":["Minimum: 1 eth"],"price":["2500 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]},

  {"_id":"5ab4c80cedb78dfd1e217780","type":"Buy","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["50%"],"currency":["dollar","rmb"],"payments":[{"method1":"payment_alipay"}],"frequency":[" 110 times"],"limit":["Maximum: 10000 eth"],"price":["2600 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]},

  {"_id":"5ab4c80cedb78dfd1e217780","type":"Buy","location":"China","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["70%"],"currency":["dollar","rmb"],"payments":[{"method4":"payment_cash","method2":"payment_wechat"}],"frequency":["1 times"],"limit":["limit: 1 ~ 100 eth"],"price":["3500 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]},
  
  {"_id":"5abdadbaf7f43f8d99015e17","type":"Buy","location":"Nanjing(南京)","headline":"","user":"helxsz","updated":"2018-03-30T03:23:38.016Z","created":"2018-03-30T03:23:38.016Z","evaluate":["60%"],"currency":["dollar","rmb"],"payments":[{"method3":"payment_card","method2":"payment_wechat"}],"frequency":[" 10 times"],"limit":["Minimum: 0.1 eth"],"price":["3000 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5abdadbaf7f43f8d99015e18"}]},
  
  {"_id":"5abdae0ef7f43f8d99015e19","type":"Buy","location":"Shenzhen(深圳)","headline":"","user":"helxsz","updated":"2018-03-30T03:25:02.005Z","created":"2018-03-30T03:25:02.005Z","evaluate":["80%"],"currency":["dollar","rmb"],"payments":[{"method2":"payment_wechat"}],"frequency":["0 times"],"limit":["Maximum: 100 eth"],"price":["2900 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5abdae0ef7f43f8d99015e1a"}]},
  
  {"_id":"5ab4c80cedb78dfd1e217780","type":"Buy","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["90%"],"currency":["dollar","rmb"],"payments":[{"method3":"payment_card"}],"frequency":["210 times"],"limit":["limit: 1 ~ 1000 eth"],"price":["2300 RMB"], "tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]}]


  private dataes = [
  
  {"_id":"5ab4c80cedb78dfd1e217780","type":"Sell","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["100%"],"currency":["dollar","rmb"],"payments":["alipay"],"frequency":["11 times"],"limit":["Minimum: 1 eth"],"price":["2500 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]},

  {"_id":"5ab4c80cedb78dfd1e217780","type":"Sell","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["50%"],"currency":["dollar","rmb"],"payments":["alipay"],"frequency":[" 110 times"],"limit":["Maximum: 10000 eth"],"price":["2600 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]},

  {"_id":"5ab4c80cedb78dfd1e217780","type":"Sell","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["60%"],"currency":["dollar","rmb"],"payments":["cash"],"frequency":["1 times"],"limit":["limit: 1 ~ 100 eth"],"price":["3500 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]},
  
  {"_id":"5abdadbaf7f43f8d99015e17","type":"Sell","location":"Nanjing(南京)","headline":"","user":"helxsz","updated":"2018-03-30T03:23:38.016Z","created":"2018-03-30T03:23:38.016Z","evaluate":["70%"],"currency":["dollar","rmb"],"payments":["banking",],"frequency":[" 10 times"],"limit":["Minimum: 0.1 eth"],"price":["3000 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5abdadbaf7f43f8d99015e18"}]},

  {"_id":"5abdae0ef7f43f8d99015e19","type":"Sell","location":"Shenzhen(深圳)","headline":"","user":"helxsz","updated":"2018-03-30T03:25:02.005Z","created":"2018-03-30T03:25:02.005Z","evaluate":["80%"],"currency":["dollar","rmb"],"payments":["wechat"],"frequency":[" 0 times"],"limit":["Maximum: 100 eth"],"price":["2900 RMB"],"tokens":[{"name":"eth","min":1,"max":4,"_id":"5abdae0ef7f43f8d99015e1a"}]},
  
  {"_id":"5ab4c80cedb78dfd1e217780","type":"Sell","location":"Los Angeles(洛杉矶)","headline":"","user":"gnss523xsz","updated":"2018-03-23T09:25:32.485Z","created":"2018-03-23T09:25:32.485Z","evaluate":["90%"],"currency":["dollar","rmb"],"payments":["bank"],"frequency":[" 210 times"],"limit":["limit: 1 ~ 1000 eth"],"price":["2300 RMB"], "tokens":[{"name":"eth","min":1,"max":4,"_id":"5ab4c80cedb78dfd1e217781"}]}]


  constructor(private authHttp:Http) {
  }

  getData() {
    return this.data;
  }

  getDatas() {
    return this.datas;
  }

  getDataes() {
    return this.dataes;
  }




  getOffers(query,skip) {
    return this.authHttp.get(environment.baseUrl + '/v1/offers?'+query+'&$limit='+this.limit+"&skip="+skip).catch(this.handleError);
  }

  createOffer(data) {
    return this.authHttp.post(environment.baseUrl + '/v1/offer', data).catch(this.handleError);
  }

  getOfferById(id) {
    return this.authHttp.get(environment.baseUrl + '/v1/offer/'+id).catch(this.handleError);
  }


  deleteOffer(id) {
    return this.authHttp.delete(environment.baseUrl + '/v1/offer/'+id).catch(this.handleError);
  }

  updateOffer(id, type, update) {
    var payload = {type: type, data: update};
    return this.authHttp.put(environment.baseUrl + '/v1/offer/'+id, {payload:payload}).map(res => res.json()).catch(this.handleError);
  }
/*
  getResults(){
      return this.authHttp.get('../../../assets/country-list.json');
  }  
*/


  getResults()  {
   // ...using get request
   return this.authHttp.get('../../../assets/country-list.json')
      // ...and calling .json() on the response to return data
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
   }

  getCountries() {
      return this.authHttp.get('../../../assets/country-list.json')
                  .toPromise()
                  .then(res => <any[]> res.json().data)
                  .then(data => { return data; });
  }


  private handleError(error: Response) {
      console.log(error);
      return Observable.throw( 'Server Error');
  }


  private _isLoading = new BehaviorSubject<Object>(false);
  public isLoading = this._isLoading.asObservable();

  public setLoading(isLoading: boolean, group: any = null) {
      this._isLoading.next({
          isLoading: isLoading,
          group: group
      })
  }

}
