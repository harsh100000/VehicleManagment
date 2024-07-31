import { Component } from '@angular/core';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
 
  constructor(private carService: CarService) { }

}
