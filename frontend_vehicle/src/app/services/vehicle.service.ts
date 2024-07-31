// src/app/services/vehicle.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { Registration } from '../interfaces/registration';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private registerUrl = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/User/register';
  private loginUrl = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/User/login';

  constructor(private http: HttpClient) {}

  registerUser(user: Registration): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  loginUser(credentials: Login): Observable<any> {
    return this.http.post(this.loginUrl, credentials,);
  }
}
