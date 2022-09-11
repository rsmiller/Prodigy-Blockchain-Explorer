import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './ui/home/home.component';
import { WalletComponent } from './ui/wallet/wallet.component';
import { CreateWalletComponent } from './ui/create-wallet/create-wallet.component';
import { ViewWalletComponent } from './ui/view-wallet/view-wallet.component';
import { ViewBlockComponent } from './ui/view-block/view-block.component';
import { ViewWalletTxnsComponent } from './ui/view-wallet-txns/view-wallet-txns.component';
import { ViewTxnComponent } from './ui/view-txn/view-txn.component';
import { SearchComponent } from './ui/search/search.component';
import { MyCertificatesComponent } from './ui/my-certificates/my-certificates.component';

import { NodeDataService } from './services/NodeDataService';
import { UserDataService } from './services/UserDataService';
import { WalletDataService } from './services/WalletDataService';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WalletComponent,
    CreateWalletComponent,
    ViewWalletComponent,
    ViewBlockComponent,
    ViewWalletTxnsComponent,
    ViewTxnComponent,
    SearchComponent,
    MyCertificatesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'wallet', component: WalletComponent, pathMatch: 'full' },
    { path: 'create-wallet', component: CreateWalletComponent, pathMatch: 'full' },
    { path: 'view-wallet', component: ViewWalletComponent, pathMatch: 'full' },
    { path: 'view-wallet/:id', component: ViewWalletComponent, pathMatch: 'full' },
    { path: 'view-block/:id', component: ViewBlockComponent, pathMatch: 'full' },
    { path: 'view-wallet-txns/:id', component: ViewWalletTxnsComponent, pathMatch: 'full' },
    { path: 'view-txn/:id', component: ViewTxnComponent, pathMatch: 'full' },
    { path: 'search/:id/:wildcard', component: SearchComponent, pathMatch: 'full' },
    { path: 'my-certificates', component: MyCertificatesComponent, pathMatch: 'full' },
  ])],
entryComponents: [ ],
exports: [RouterModule],
providers: [NodeDataService, UserDataService, WalletDataService],
bootstrap: [AppComponent]
})
export class AppModule { }
