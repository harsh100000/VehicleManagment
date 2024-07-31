import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe]
})
export class AdminComponent implements OnInit {
  allVehicles: any = [];
  fullDetails: any = [];
  showStatusTable = false;
  showVehicleList = true;

  constructor(
    private datePipe: DatePipe,
    public popupService: PopupService,
    private carService: CarService
  ) {}

  openAddCar() {
    this.popupService.show();
  }

  showStatus() {
    this.showStatusTable = true;
    this.showVehicleList = false;
    this.fetchFullDetails();
  }

  showVehicleListView() {
    this.showVehicleList = true;
    this.showStatusTable = false;
    this.fetchAllVehicles();
  }

  fetchWorkerName(workerId: any): Promise<string> {
    return new Promise((resolve) => {
      this.carService.getWorkerName(workerId).subscribe(
        (res: any) => {
          resolve(res.name);
        },
        () => {
          resolve('Unknown');
        }
      );
    });
  }

  fetchVehicleDetails(vehicleId: any): Promise<any> {
    return new Promise((resolve) => {
      this.carService.getVehicleById(vehicleId).subscribe(
        (res: any) => {
          resolve(res);
        },
        () => {
          resolve(null);
        }
      );
    });
  }

  fetchWorkItemDetails(workItemId: any): Promise<any> {
    return new Promise((resolve) => {
      this.carService.getWorkItemById(workItemId).subscribe(
        (res: any) => {
          resolve(res);
        },
        () => {
          resolve(null);
        }
      );
    });
  }

  async fetchFullDetails() {
    try {
      const res: any = await this.carService.getFullDetail().toPromise();
      const details = res.$values;
      for (let data of details) {
        data.vehicle = await this.fetchVehicleDetails(data.vehicleId);
        data.workerName = await this.fetchWorkerName(data.vehicle.workerId);
        const workItemDetails = await this.fetchWorkItemDetails(data.workItemId);
        data.workItems = workItemDetails ? workItemDetails.items.$values : [];
      }
      this.fullDetails = details;
      console.log("status->", this.fullDetails);
    } catch (error) {
      console.error('Error fetching full details:', error);
    }
  }

  fetchAllVehicles() {
    this.carService.getAllVehicle().subscribe(
      async (res: any) => {
        const vehicles = res.$values;
        for (let vehicle of vehicles) {
          vehicle.advisor = await this.fetchWorkerName(vehicle.workerId);
          vehicle.serviceStartDate = this.formatTimestamp(vehicle.serviceStartDate);
        }
        this.allVehicles = vehicles;
        console.log(this.allVehicles);
      }
    );
  }

  formatTimestamp(timestamp: string): string {
    const formattedTimestamp = this.datePipe.transform(timestamp, 'MMM d, y, h:mm:ss a');
    return formattedTimestamp ? formattedTimestamp : timestamp;
  }

  deleteVehicle(id: any) {
    this.carService.deleteVehicleById(id).subscribe(
      (res: any) => {
        console.log(res);
        this.fetchAllVehicles();
      }
    );
  }

  editVehicle(vehicle: any) {
    this.popupService.show(vehicle);
  }

  ngOnInit(): void {
    this.fetchAllVehicles();
  }
}
