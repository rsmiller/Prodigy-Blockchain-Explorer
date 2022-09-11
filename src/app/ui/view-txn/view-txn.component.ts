import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SingleTransactionDtoResponse, TransactionDto } from 'src/app/models/NodeModels';
import { StaticMethods } from 'src/app/models/Static';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-view-txn',
  templateUrl: './view-txn.component.html',
  styleUrls: ['./view-txn.component.css']
})
export class ViewTxnComponent {
  private _NodeDataService: NodeDataService;

  public Transaction: TransactionDto;

  public Loading: boolean = true;

  private Subscription_GotTransaction: Subscription;

  constructor(nodeDataService: NodeDataService, private router: Router, private route: ActivatedRoute) {
    this._NodeDataService = nodeDataService;
  }

  ngOnInit() {
    this.Loading = true;

    this.Subscription_GotTransaction = this._NodeDataService.GotTransaction.subscribe(x => this.gotTransaction(x));

    var id = this.route.snapshot.paramMap.get('id');
    if(id != '' && id != null && id != undefined && id != "undefined")
    {
      this._NodeDataService.GetTransaction(id);
    }
  }

  ngOnDestroy() {
    this.Subscription_GotTransaction.unsubscribe();
  }

  public GetDate(x: number)
  {
    return StaticMethods.GetDate(x);
  }

  private gotTransaction(x: SingleTransactionDtoResponse)
  {
    if(x != null)
    {
      if(x.success == true)
      {
        this.Transaction = x.data;
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