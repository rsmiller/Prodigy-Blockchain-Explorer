import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserCommand, CreateUserResponse, CreateUserResponseWrapper } from 'src/app/models/UserModels';

import { UserDataService } from 'src/app/services/UserDataService';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.css']
})
export class CreateWalletComponent {
  private _UserDataService: UserDataService;

  public createWalletForm: FormGroup;
  public Creating: boolean = false;

  public Subscription_UserCreated: Subscription;

  constructor(userDataService: UserDataService, private router: Router) {
    this._UserDataService = userDataService;
  }

  ngOnInit() {
    this.createWalletForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30),Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')])
    });

    this.Subscription_UserCreated = this._UserDataService.UserCreated.subscribe(x => this.userCreated(x));

  }

  ngOnDestroy() {
    this.Subscription_UserCreated.unsubscribe();
  }

  public CreateWallet()
  {
    this.Creating = true;

    let command = new CreateUserCommand();
    command.username = this.createWalletForm.get('username').value;
    command.password = this.createWalletForm.get('password').value;

    this._UserDataService.CreateUser(command);
  }

  private userCreated(x : CreateUserResponseWrapper)
  {
    if(x != null)
    {
      console.trace(x);
      if(x.success == true)
      {
        this.redirectTo("/view-wallet/s");
      }
      else
      {
        alert(x.exception);
      }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.createWalletForm.controls[controlName].hasError(errorName);
  }

  private redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}