import { Injectable,Inject} from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import {environment} from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContractService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http,) {}


  getEscrowContract(): Observable<any> {

	this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
	this.headers.append('Access-Control-Allow-Methods', 'GET');
	this.headers.append('Access-Control-Allow-Origin', '*');

	return this.http.get(environment.baseUrl+'/contracts').map(res =>res.json());
  }

}