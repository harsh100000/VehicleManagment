// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../interfaces/login';
import { VehicleService } from '../services/vehicle.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: Login = {
    Email: '',
    Password: ''
  };

  constructor(private vehicleService: VehicleService, private toastr: ToastrService, private router: Router) {}

  onSubmit(form: NgForm): void {
    console.log(form.value);

    if (form.valid) {
      this.vehicleService.loginUser(this.model).subscribe(
        response => {
          console.log('User logged in successfully:', response);
          this.toastr.success('Logged in successfully');

          if (response.token) {
            localStorage.setItem('JwtToken', response.token);
          }
          // Handle success response
          if (response.role === 'admin') {
            this.router.navigate(['/admin']); // Redirect to admin dashboard
          } else if (response.role === 'serviceAdvisor') {
            this.router.navigate(['/advisordashboard']); // Redirect to worker dashboard
          } else {
            this.toastr.error('Unknown user role');
          }
        },
        error => {
          console.error('Error logging in user:', error);
          this.toastr.error('Error occured');
          // Handle error response
        }
      );
    }
  }
}
