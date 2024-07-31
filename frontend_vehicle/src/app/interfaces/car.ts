// src/app/services/car.interface.ts
export interface Car {
    [x: string]: unknown;
    VehicleName: string;
    PlateNumber: string;
    serviceStartDate: Date;
    serviceEndDate: Date;
    CustomerName: string;
    workerId: string;
    status: string;
  }
 
  