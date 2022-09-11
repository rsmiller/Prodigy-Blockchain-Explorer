import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UUIDValidator } from 'src/app/helpers/Validators';
import { BlockDto, BlockPageResponse} from 'src/app/models/NodeModels';
import { StaticMethods } from 'src/app/models/Static';

import { NodeDataService } from 'src/app/services/NodeDataService';

@Component({
  selector: 'app-my-certificates',
  templateUrl: './my-certificates.component.html',
  styleUrls: ['./my-certificates.component.css']
})
export class MyCertificatesComponent {
  private _NodeDataService: NodeDataService;

  public searchForm: FormGroup;
  
  public Searching: boolean = false;
  public PerformedSearch: boolean = false;

  public Blocks: Array<BlockDto>

  private Subscription_GotBlockPageResult: Subscription;

  constructor(nodeDataService: NodeDataService, private router: Router) {
    this._NodeDataService = nodeDataService;
    this.Blocks = new Array<BlockDto>();
  }

  ngOnInit() {
    this.Subscription_GotBlockPageResult = this._NodeDataService.GotBlockPageResult.subscribe(x => this.gotBlocks(x));

    this.searchForm = new FormGroup({
      company_id: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(99), UUIDValidator()])
    });

    this.Blocks = new Array<BlockDto>();
  }

  ngOnDestroy() {
   this.Subscription_GotBlockPageResult.unsubscribe();
  }

  public SearchCustomer()
  {
    this.Searching = true;
    this.PerformedSearch = true;
    this._NodeDataService.SearchByCustomer(this.searchForm.get('company_id').value, '', 0);
  }

  public GetDate(x: number)
  {
    return StaticMethods.GetDate(x);
  }

  private gotBlocks(x: BlockPageResponse)
  {
    if(x != null)
    {
      console.trace(x);
      if(x.success == true)
      {
        this.Blocks = x.data.blocks;
      }
      else
      {
        alert(x.exception);
      }

      this.Searching = false;
    }
  }

  public IsValidForm() : boolean
  {
    return this.searchForm.valid;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.searchForm.controls[controlName].hasError(errorName);
  }
}