import { Observable } from "rxjs";
import { AddUserReq } from "../models/add-user-req.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ModalAddUserService{
    constructor(private http: HttpClient){

    }
    addUser(model: AddUserReq): Observable<void>{
        return this.http.post<void>('https://localhost:7280/api/Users',model)
    }
}