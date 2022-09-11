import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlockDto, BlockDtoResponse, TransactionDto, TransactionDtoResponse } from 'src/app/models/NodeModels';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  private _NodeDataService: NodeDataService;

  constructor(nodeDataService: NodeDataService, private router: Router) {
    this._NodeDataService = nodeDataService;
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }


}