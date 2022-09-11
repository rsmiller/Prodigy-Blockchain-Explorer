import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class WalletDataService {
    private _HttpClient: HttpClient;
    private _BaseUrl: string;

    //public GotRecentTransactions = new BehaviorSubject<TransactionDtoResponse>(undefined);

    constructor(http: HttpClient, @Inject('BASE_URL_API') baseUrl: string) {
        this._HttpClient = http;
        this._BaseUrl = baseUrl;
    }

    private getAPIToken()
    {
        return "";
    }
}