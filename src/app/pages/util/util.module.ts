import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Web3Service} from './web3.service';
import {CommonService} from './common.service';
import {ContractService} from './contract.service';
 
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Web3Service,CommonService,ContractService
  ],
  declarations: []
})
export class UtilModule {
}
