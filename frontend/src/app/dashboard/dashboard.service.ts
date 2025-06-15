import { Observable } from "rxjs";
import { AddUserReq } from "../models/add-user-req.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardService{
    constructor(private http: HttpClient){

    }
    getAllUsers(): Observable<User[]>{
        return this.http.get<User[]>('https://localhost:7280/api/Users');
    }

    deleteUser(id: string): Observable<void>{
        return this.http.delete<void>(`https://localhost:7280/api/Users/${id}`);
    }
}