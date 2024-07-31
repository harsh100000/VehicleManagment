import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AdvisorsResponse } from '../interfaces/AdvisorsResponse';
import { AdvisorsResponse } from '../interfaces/AdvisorsResponse ';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/Vehicle/addVehicle';
  private deleteVehicle = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/Vehicle/deleteVehicle';
  private advisorApiUrl = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/advisor/getAdvisor';
  private getAllCar = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/Vehicle/allVehicle';
  private getAdvisorById = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/advisor/getAdvisorById';
  private baseUrl = 'https://vechicalmanagement20240729225353.azurewebsites.net/api';
  private VehicleById = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/Vehicle/getVehicleById';
  private getWorkItemByIdUrl = 'https://vechicalmanagement20240729225353.azurewebsites.net/api/WorkItem/getWorkItembyId';
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('JwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addCar(car: Car): Observable<any> {
    return this.http.post<any>(this.apiUrl, car, { headers: this.getHeaders() });
  }

  getAdvisors(): Observable<AdvisorsResponse> {
    return this.http.get<AdvisorsResponse>(this.advisorApiUrl, { headers: this.getHeaders() });
  }

  getAllVehicle(): Observable<any> {
    return this.http.get<any>(this.getAllCar, { headers: this.getHeaders() });
  }

  getWorkerName(id: any): Observable<any> {
    return this.http.get<any>(`${this.getAdvisorById}?id=${id}`, { headers: this.getHeaders() });
  }

  deleteVehicleById(id: any): Observable<any> {
    return this.http.delete<any>(`${this.deleteVehicle}?id=${id}`, { headers: this.getHeaders() });
  }

  getFullDetail(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Service/getFullDetail`, { headers: this.getHeaders() });
  }

  getVehicleById(id: any): Observable<any> {
    return this.http.get<any>(`${this.VehicleById}?id=${id}`, { headers: this.getHeaders() });
  }
  getWorkItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.getWorkItemByIdUrl}?id=${id}`, { headers: this.getHeaders() });
  }
}
