import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { CreateUserCommand, CreateUserResponseWrapper, GetUserResponse, LoginUserCommand, } from '../models/UserModels';


@Injectable()
export class UserDataService {
    private _HttpClient: HttpClient;
    private _BaseUrl: string;

    public UserCreated = new BehaviorSubject<CreateUserResponseWrapper>(undefined);
    public UserLoggedOut = new BehaviorSubject<boolean>(undefined);
    public GotUser = new BehaviorSubject<GetUserResponse>(undefined);

    constructor(http: HttpClient, @Inject('BASE_URL_API') baseUrl: string) {
        this._HttpClient = http;
        this._BaseUrl = baseUrl;
    }

    public CreateUser(command: CreateUserCommand) 
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });
        this._HttpClient.post<CreateUserResponseWrapper>(this._BaseUrl + 'User/CreateUser', command, { headers: api_headers }).subscribe(result => {
            this.UserCreated.next(result);
        }, error => {
            console.error(error);
        });
    }

    public LoadUser(username: string, password: string) 
    {
        const api_headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAPIToken()
        });

        let command = new LoginUserCommand();
        command.username = username;
        command.password = password;

        this._HttpClient.post<GetUserResponse>(this._BaseUrl + 'User/GetUser', command, { headers: api_headers }).subscribe(result => {
            this.GotUser.next(result);
        }, error => {
            console.error(error);
        });
    }

    private getAPIToken()
    {
        return "";
    }
}