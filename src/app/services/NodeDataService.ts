import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { BlockDtoResponse, BlockPageResponse, GeneralSearchDto, GeneralSearchResponse, SingleBlockDtoResponse, SingleTransactionDtoResponse, TransactionDtoResponse, TransactionPagedResult } from 'src/app/models/NodeModels';


@Injectable()
export class NodeDataService {
    private _HttpClient: HttpClient;
    private _BaseUrl: string;

    public GotRecentTransactions = new BehaviorSubject<TransactionDtoResponse>(undefined);
    public GotRecentBlocks = new BehaviorSubject<BlockDtoResponse>(undefined);
    public GotSingleBlock = new BehaviorSubject<SingleBlockDtoResponse>(undefined);
    public GotWalletTransactions = new BehaviorSubject<TransactionPagedResult>(undefined);
    public GotTransaction = new BehaviorSubject<SingleTransactionDtoResponse>(undefined);
    public GotBlocksBySearch = new BehaviorSubject<BlockDtoResponse>(undefined);
    public GotGeneralSearch = new BehaviorSubject<GeneralSearchResponse>(undefined);
    public GotBlockPageResult = new BehaviorSubject<BlockPageResponse>(undefined);

    
    constructor(http: HttpClient, @Inject('BASE_URL_API') baseUrl: string) {
        this._HttpClient = http;
        this._BaseUrl = baseUrl;
    }
    

    public SearchByCustomer(customer_id: string, wildcard: string, page: number = 0)
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<BlockPageResponse>(this._BaseUrl + 'Node/SearchByCustomer?customer_id=' + customer_id + "&wildcard=" + wildcard + "&page=" + page, { headers: api_headers }).subscribe(result => {
            this.GotBlockPageResult.next(result);
        }, error => {
            console.error(error);
        })
    }

    public GeneralSearch(wildcard: string)
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<GeneralSearchResponse>(this._BaseUrl + 'Node/GeneralSearch?wildcard=' + wildcard, { headers: api_headers }).subscribe(result => {
            this.GotGeneralSearch.next(result);
        }, error => {
            console.error(error);
        })
    }

    public GetTransaction(txn: string)
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<SingleTransactionDtoResponse>(this._BaseUrl + 'Node/GetTransaction?txn=' + txn, { headers: api_headers }).subscribe(result => {
            this.GotTransaction.next(result);
        }, error => {
            console.error(error);
        })
    }


    public GetWalletTransactions(wallet_id: string, page: number)
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<TransactionPagedResult>(this._BaseUrl + 'Node/GetWalletTransactions?wallet_id=' + wallet_id + '&page=' + page, { headers: api_headers }).subscribe(result => {
            this.GotWalletTransactions.next(result);
        }, error => {
            console.error(error);
        })
    }


    public GetLatestTransactions()
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<TransactionDtoResponse>(this._BaseUrl + 'Node/GetLatestTransactions', { headers: api_headers }).subscribe(result => {
            this.GotRecentTransactions.next(result);
        }, error => {
            console.error(error);
        })
    }

    public GetBlocksByIdentifier(identifier: string, wildcard: string, include_data: boolean = false)
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<BlockDtoResponse>(this._BaseUrl + 'Node/GetBlocksByIdentifier?identifier=' + identifier + '&wildcard=' + wildcard + '&include_data=' + include_data, { headers: api_headers }).subscribe(result => {
            this.GotBlocksBySearch.next(result);
        }, error => {
            console.error(error);
        })
    }


    public GetLatestBlocks()
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<BlockDtoResponse>(this._BaseUrl + 'Node/GetLatestBlocks', { headers: api_headers }).subscribe(result => {
            this.GotRecentBlocks.next(result);
        }, error => {
            console.error(error);
        })
    }

    public GetBlock(block_id: string)
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.get<SingleBlockDtoResponse>(this._BaseUrl + 'Node/GetBlockById?block_id=' + block_id, { headers: api_headers }).subscribe(result => {
            this.GotSingleBlock.next(result);
        }, error => {
            console.error(error);
        })
    }

    private getAPIToken()
    {
        return "";
    }
}