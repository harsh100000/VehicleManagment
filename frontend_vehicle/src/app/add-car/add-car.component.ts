import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../services/car.service';
// import { Advisor, AdvisorsResponse } from '../models/advisors-response.model'; // Import the interface
import { Advisor, AdvisorsResponse } from '../interfaces/AdvisorsResponse ';
import { PopupService } from '../services/popup.service';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  car = {
    VehicleName: '',
    PlateNumber: '',
    CustomerName: '',
    status: 'pending',
    serviceStartDate:new Date(),
    serviceEndDate:new Date(),
    workerId:'',
  };
  advisors: Advisor[] = [];
  popupService: any;

  constructor(private carService: CarService, private toastr: ToastrService, private PopupService:PopupService) {}

  ngOnInit(): void {
    this.carService.getAdvisors().subscribe(
      (response: AdvisorsResponse) => {
        console.log(response);
        // Extract advisor names from the response
        if (response && response.$values) {
          this.advisors = response.$values.map(val=>({id:val.id,name:val.name}));
          console.log('Advisors:', this.advisors);
        }
      },
      error => {
        console.error('Error fetching advisors:', error);
        this.toastr.error('Error fetching advisors');
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.car);
      
      this.carService.addCar(this.car).subscribe(
        response => {
          console.log('Car added successfully:', response);
          this.toastr.success('Car added successfully');

          this.resetForm(form);
          this.PopupService.hide();
          location.reload();

        },
        error => {
          console.error('Error adding car:', error);
          this.toastr.error('Error occurred');
        }
      );
    }
  }
  resetForm(form: NgForm) {
    form.resetForm();
    this.car = {
      VehicleName: '',
      PlateNumber: '',
      CustomerName: '',
      status: 'pending',
      serviceStartDate: new Date(),
      serviceEndDate: new Date(),
      workerId: '',
    };
  }

  cancel(){
    this.PopupService.hide();
  }
}

