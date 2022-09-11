import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BlockDto, SingleBlockDtoResponse } from 'src/app/models/NodeModels';
import { StaticMethods } from 'src/app/models/Static';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-view-block',
  templateUrl: './view-block.component.html',
  styleUrls: ['./view-block.component.css']
})
export class ViewBlockComponent {
  private _NodeDataService: NodeDataService;

  public Block: BlockDto;

  public Loading: boolean = true;

  private _BaseUrl: string;
  public dataLocalUrl: SafeResourceUrl;

  private Subscription_GotSingleBlock: Subscription;

  constructor(nodeDataService: NodeDataService, public domSanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, @Inject('BASE_URL_API') baseUrl: string) {
    this._BaseUrl = baseUrl;

    this._NodeDataService = nodeDataService;
  }

  ngOnInit() {
    this.Loading = true;
    this.Block = new BlockDto();

    this.Subscription_GotSingleBlock = this._NodeDataService.GotSingleBlock.subscribe(x => this.gotSingleBlock(x));

    var id = this.route.snapshot.paramMap.get('id');
    if(id != '' && id != null && id != undefined && id != "undefined")
    {
      this._NodeDataService.GetBlock(id);
    }
  }

  ngOnDestroy() {
    this.Subscription_GotSingleBlock.unsubscribe();
  }

  private GetDocument()
  {
    var url = this._BaseUrl + 'Node/GetDocument?block_id=' + this.Block.blockId;
    console.log(url);

    // This is to display the pdf in the browser
    this.dataLocalUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public GetDate(x: number)
  {
    return StaticMethods.GetDate(x);
  }

  private gotSingleBlock(x: SingleBlockDtoResponse)
  {
    if(x != null)
    {
      if(x.success == true)
      {
        console.trace(x);
        this.Block = x.data;
        this.GetDocument();
      }
      else
      {
        alert(x.exception);
      }

      this.Loading = false;
    }
  }

}