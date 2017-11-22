import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import {Web3Service} from '../../util/web3.service';
import {ContractService} from '../../util/contract.service';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-trade-buyer',
  templateUrl: './trade-buyer.component.html',
  styleUrls: ['./trade-buyer.component.scss']
})

export class TradeBuyerComponent implements OnInit, OnDestroy {
  accounts: string[];
  MetaCoin: any;

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
              private breakpointService: NbMediaBreakpointsService,
              private web3Service: Web3Service,
              private contractService: ContractService) {
    console.log('Constructor: ' + web3Service);
    this.breakpoints = breakpointService.getBreakpointsMap();
    this.themeSubscription = themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

    this.contractService = contractService;  

  }

  ngOnInit(): void {

    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();

    var self = this;
    this.contractService.getLocalEscrowContract().subscribe(
            data => {

            var metacoin_artifacts = data;
            self.web3Service.artifactsToContract(metacoin_artifacts)
            .then((MetaCoinAbstraction) => {
              self.MetaCoin = MetaCoinAbstraction;
            });  

    })

    /*
    this.getContract("../MetaCoin.json").subscribe(
            data => {

            var metacoin_artifacts = data;
            self.web3Service.artifactsToContract(metacoin_artifacts)
            .then((MetaCoinAbstraction) => {
              self.MetaCoin = MetaCoinAbstraction;
            });  

    })
    */
    
  }
/*

   public getContract(path): Observable<any> {
           return this.http.get(path)
                           .map((res:any) => res.json())

   }
   */

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      //this.refreshBalance();
    });
  }

  setStatus(status) {
    this.status = status;
  }

  async sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const transaction = await deployedMetaCoin.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.model.account);
      console.log('Found balance: ' + metaCoinBalance);
      this.model.balance = metaCoinBalance;
    } catch (e) {
      console.log(e);
      //this.setStatus('Error getting balance; see log.');
    }
  }

  clickAddress(e) {
    this.model.account = e.target.value;
    this.refreshBalance();
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.model.receiver = e.target.value;
  }


  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
