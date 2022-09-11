import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlockDto, BlockDtoResponse, GeneralSearchDto, GeneralSearchResponse, TransactionDto, TransactionDtoResponse } from 'src/app/models/NodeModels';
import { StaticMethods } from 'src/app/models/Static';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private _NodeDataService: NodeDataService;

  public Loading: boolean = true;
  public SearchReturnType: string = "";

  public Blocks: Array<BlockDto>
  public Transactions: Array<TransactionDto>
  public SingleTransaction: TransactionDto;

  private Subscription_GotBlocksBySearch: Subscription;
  private Subscription_GotGeneralSearch: Subscription;

  constructor(nodeDataService: NodeDataService, private router: Router, private route: ActivatedRoute) {
    this._NodeDataService = nodeDataService;
    this.Blocks = new Array<BlockDto>();
    this.Transactions = new Array<TransactionDto>();
    this.SingleTransaction = new TransactionDto();
  }

  ngOnInit() {
    this.Subscription_GotBlocksBySearch = this._NodeDataService.GotBlocksBySearch.subscribe(x => this.gotBlocks(x));
    this.Subscription_GotGeneralSearch = this._NodeDataService.GotGeneralSearch.subscribe(x => this.gotGeneralSearch(x));

    this.Loading = true;

    var id = this.route.snapshot.paramMap.get('id');
    var wildcard = this.route.snapshot.paramMap.get('wildcard');

    if(id != '' && id != null && id != undefined && id != "undefined")
    {
      if(wildcard != '' && wildcard != null && wildcard != undefined && wildcard != "undefined")
      {
        // Identifier or different type of search
        if(this.isNumeric(id))
        {
          this._NodeDataService.GetBlocksByIdentifier(id, wildcard, false);
        }
        else
        {
          this._NodeDataService.GeneralSearch(wildcard);
        }

      }
    }
  }

  ngOnDestroy() {
   this.Subscription_GotBlocksBySearch.unsubscribe();
   this.Subscription_GotGeneralSearch.unsubscribe();
  }

  public GetDate(x: number)
  {
    return StaticMethods.GetDate(x);
  }

  private gotBlocks(x: BlockDtoResponse)
  {
    if(x != null)
    {
      //console.trace(x);
      this.Blocks = x.data;
      this.Transactions = new Array<TransactionDto>();
      this.SingleTransaction = new TransactionDto();
      this.SearchReturnType = 'attribute';
      this.Loading = false;
    }
  }

  private gotGeneralSearch(x: GeneralSearchResponse)
  {
    if(x != null)
    {
      if(x.success == true)
      {
        console.trace(x);
      
        this.Blocks = x.data.blocks;
        this.Transactions = x.data.transactions;
        this.SearchReturnType = x.data.return_type;
        this.Loading = false;

        if(x.data.return_type == 'transaction' && this.Transactions.length > 0)
        {
          this.SingleTransaction = this.Transactions[0];
        }
        else
        {
          this.SingleTransaction = new TransactionDto();
        }
      }

    }
  }

  private isNumeric(n: any) : boolean 
  { 
      return !isNaN(parseFloat(n)) && isFinite(n); 
  }
}