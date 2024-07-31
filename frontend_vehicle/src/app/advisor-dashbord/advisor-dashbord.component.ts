import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-advisor-dashbord',
  templateUrl: './advisor-dashbord.component.html',
  styleUrls: ['./advisor-dashbord.component.css']
})
export class AdvisorDashbordComponent implements OnInit {
  services: Service[] = [
    { name: 'Engine Oil', price: 50, checked: false },
    { name: 'Fuel Filter', price: 30, checked: false },
    { name: 'Clutch Plate', price: 70, checked: false },
    { name: 'Brake Wire', price: 20, checked: false },
    { name: 'Tyre', price: 100, checked: false },
    { name: 'Puncture', price: 10, checked: false },
    { name: 'Wheel Alignment', price: 40, checked: false }
  ];

  vehicles: any[] = [];
  selectedVehicleId: number | null = null;

  constructor(private carService: CarService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchVehicles();
  }

  fetchVehicles(): void {
    this.carService.getAllVehicle().subscribe(
      (data: { $values: any[] }) => {
        this.vehicles = data.$values;
        console.log('Fetched vehicles:', this.vehicles);
      },
      error => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  doneBtnClick(vehicle: any): void {
    this.selectedVehicleId = vehicle.id;
    const popupDiv = document.getElementById('popup');
    if (popupDiv != null) {
      popupDiv.style.display = 'flex';
    }
    // You can add additional logic here if needed
  }

  completeBtnClick(vehicle: any): void {
    if (!vehicle || !vehicle.id) return;

    const serviceRecord = {
      vehicleId: vehicle.id,
      serviceDate: new Date(),
      workItemId: vehicle.workItemId,
      price: this.calculateTotalPrice()
    };

    this.http.post(`https://vechicalmanagement20240729225353.azurewebsites.net/api/Invoice/invoice?vehicleId=${vehicle.id}`, serviceRecord)
      .subscribe(
        response => {
          console.log('Service record saved successfully:', response);
          // Remove the vehicle from the list after successful completion
          this.removeVehicleFromList(vehicle.id);
        },
        error => {
          console.error('Error saving service record:', error);
        }
      );
  }

  removeVehicleFromList(vehicleId: number): void {
    this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId);
  }

  submitBtnClick(): void {
    if (this.selectedVehicleId === null) return;

    const selectedServices = this.services
      .filter(service => service.checked)
      .map(service => service.name);
    
    const totalPrice = this.calculateTotalPrice();

    const workItem = {
      cost: totalPrice,
      items: selectedServices
    };

    this.http.post(`https://vechicalmanagement20240729225353.azurewebsites.net/api/WorkItem/addWorkItem?vehicleId=${this.selectedVehicleId}`, workItem)
      .subscribe(
        response => {
          console.log('Work item saved successfully:', response);
          this.closePopup();
        },
        error => {
          console.error('Error saving work item:', error);
        }
      );
  }

  calculateTotalPrice(): number {
    return this.services
      .filter(service => service.checked)
      .reduce((sum, service) => sum + service.price, 0);
  }

  closePopup(): void {
    const popupDiv = document.getElementById('popup');
    if (popupDiv != null) {
      popupDiv.style.display = 'none';
    }
  }
}

interface Service {
  name: string;
  price: number;
  checked: boolean;
}
