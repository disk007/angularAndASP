import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { EditUserReq } from "../models/edit-user-req.model";

@Injectable({
    providedIn: 'root'
})
export class ModalEditUserService{
    constructor(private http: HttpClient){

    }
    getUserById(id:string): Observable<User>{
        return this.http.get<User>(`https://localhost:7280/api/Users/${id}`);
    }

    updateUser(id:string, editUserReq: EditUserReq): Observable<void>{
        return this.http.put<void>(`https://localhost:7280/api/Users/${id}`,editUserReq);

    }
}