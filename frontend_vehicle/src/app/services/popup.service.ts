import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private visible = false;
  private vehicleData: any = null;

  show(vehicle: any = null) {
    this.vehicleData = vehicle;
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.vehicleData = null;
  }

  isVisible(): boolean {
    return this.visible;
  }

  getVehicleData(): any {
    return this.vehicleData;
  }
}
