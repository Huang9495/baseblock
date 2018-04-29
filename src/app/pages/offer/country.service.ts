import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions }  from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CountryService {
	  constructor(private http:Http) {}


      getCountries() {
        return this.http.get('./assets/country-list.json')
                    .toPromise()
                    .then(res => <any[]> res.json().name)
                    .then(data => { return data; });
    }




}
