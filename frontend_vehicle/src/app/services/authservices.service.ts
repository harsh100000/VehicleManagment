// src/app/services/authservices.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JwtToken');
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('JwtToken');
    console.log(token);
    
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenPayload);
      
      return tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return null;
  }
}
