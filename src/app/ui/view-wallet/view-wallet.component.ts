import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlockDto, BlockDtoResponse, TransactionDto, TransactionDtoResponse } from 'src/app/models/NodeModels';
import { GetUserResponse } from 'src/app/models/UserModels';

import { NodeDataService } from 'src/app/services/NodeDataService';
import { UserDataService } from 'src/app/services/UserDataService';

@Component({
  selector: 'app-view-wallet',
  templateUrl: './view-wallet.component.html',
  styleUrls: ['./view-wallet.component.css']
})
export class ViewWalletComponent {
  private _NodeDataService: NodeDataService;
  private _UserDataService: UserDataService;

  public LoginForm: FormGroup;

  public LoggedIn: boolean = false;
  public Response: string = "";

  private Subscription_GotUser: Subscription;

  constructor(nodeDataService: NodeDataService, userDataService: UserDataService, private router: Router, private route: ActivatedRoute) {
    this._NodeDataService = nodeDataService;
    this._UserDataService = userDataService;
  }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')])
    });

    var id = this.route.snapshot.paramMap.get('id');
    if(id != '' && id != null && id != undefined && id != "undefined")
    {
      this.Response = id;
    }

    this.Subscription_GotUser = this._UserDataService.GotUser.subscribe(x => this.gotUser(x));
  }

  ngOnDestroy() {
    this.Subscription_GotUser.unsubscribe();
  }

  public Login()
  {
    this._UserDataService.LoadUser(this.LoginForm.get('username').value, this.LoginForm.get('password').value)
  }

  private gotUser(x: GetUserResponse)
  {
    if(x != null)
    {
      if(x.success == true)
      {

      }
      else
      {
        this.Response = "b";
      }
      console.trace(x);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.LoginForm.controls[controlName].hasError(errorName);
  }

  private redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}