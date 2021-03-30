import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/data/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(user: User){
    return this.http.post("https://localhost:44353/api/auth/login", user);
  }

}