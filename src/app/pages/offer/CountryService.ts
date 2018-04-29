import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions }  from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CountryService {
	  constructor(private http:Http) {}

      getCountries() {
      	console.log("1111");
        return this.http.get('/home/kris-allen/GNSS/github/baseblock/src/assets/country-list.json');


    }




}
