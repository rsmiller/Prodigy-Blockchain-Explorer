import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionDto, TransactionPagedResult } from 'src/app/models/NodeModels';
import { StaticMethods } from 'src/app/models/Static';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-view-wallet-txns',
  templateUrl: './view-wallet-txns.component.html',
  styleUrls: ['./view-wallet-txns.component.css']
})
export class ViewWalletTxnsComponent {
  private _NodeDataService: NodeDataService;

  public Transactions: Array<TransactionDto>;

  public Loading: boolean = true;

  public isFromNode: boolean = false;

  private page_count: number = 1000;

  private Subscription_GotWalletTransactions: Subscription;

  constructor(nodeDataService: NodeDataService, private router: Router, private route: ActivatedRoute) {
    this._NodeDataService = nodeDataService;
  }

  ngOnInit() {
    this.Loading = true;
    this.Transactions = new Array<TransactionDto>();

    this.Subscription_GotWalletTransactions = this._NodeDataService.GotWalletTransactions.subscribe(x => this.gotWalletTransactions(x));

    var id = this.route.snapshot.paramMap.get('id');
    if(id != '' && id != null && id != undefined && id != "undefined")
    {
      this._NodeDataService.GetWalletTransactions(id, 0);
    }

    const re = new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}");
    if (re.test(id)) {
      this.isFromNode = true;
    }
  }

  ngOnDestroy() {
    this.Subscription_GotWalletTransactions.unsubscribe();
  }

  public GetDate(x: number)
  {
    return StaticMethods.GetDate(x);
  }

  private gotWalletTransactions(x: TransactionPagedResult)
  {
    if(x != null)
    {
      if(x.success == true)
      {
        this.Transactions = x.data;
        console.trace(x);
      }
      else
      {
        alert(x.exception);
      }

      this.Loading = false;
    }
  }

}