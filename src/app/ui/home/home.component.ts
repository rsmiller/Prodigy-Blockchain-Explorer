import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlockDto, BlockDtoResponse, TransactionDto, TransactionDtoResponse } from 'src/app/models/NodeModels';
import { StaticMethods } from 'src/app/models/Static';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private _NodeDataService: NodeDataService;

  public RecentBlocks: Array<BlockDto>
  public RecentTransactions: Array<TransactionDto>

  private Subscription_GotRecentBlocks: Subscription;
  private Subscription_GotRecentTransactions: Subscription;

  constructor(nodeDataService: NodeDataService, private router: Router) {
    this._NodeDataService = nodeDataService;
    this.RecentBlocks = new Array<BlockDto>();
    this.RecentTransactions = new Array<TransactionDto>();
  }

  ngOnInit() {
    this.Subscription_GotRecentBlocks = this._NodeDataService.GotRecentBlocks.subscribe(x => this.gotRecentBlocks(x));
    this.Subscription_GotRecentTransactions = this._NodeDataService.GotRecentTransactions.subscribe(x => this.gotRecentTransactions(x));

    this._NodeDataService.GetLatestBlocks();
    this._NodeDataService.GetLatestTransactions();
  }

  ngOnDestroy() {
   this.Subscription_GotRecentBlocks.unsubscribe();
   this.Subscription_GotRecentTransactions.unsubscribe();
  }

  public SearchByIdentifier(identifier: string, wildcard: string)
  {

  }

  public GetDate(x: number)
  {
    return StaticMethods.GetDate(x);
  }

  private gotRecentBlocks(x: BlockDtoResponse)
  {
    if(x != null)
    {
      //console.trace(x);
      this.RecentBlocks = x.data;
    }
  }

  private gotRecentTransactions(x: TransactionDtoResponse)
  {
    if(x != null)
    {
      //console.trace(x);
      this.RecentTransactions = x.data;
    }
  }
}