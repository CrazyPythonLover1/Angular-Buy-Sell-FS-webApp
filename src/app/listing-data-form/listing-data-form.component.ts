import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  templateUrl: './listing-data-form.component.html',
  styleUrls: ['./listing-data-form.component.css']
})
export class ListingDataFormComponent {
  @Input() buttonText!: string;
  @Input() currentName!: string;
  @Input() currentDescription!: string;
  @Input() currentPrice!: string | number;
  
  name: string = '';
  description: string = '';
  price: string | number = '';

  @Output() onSubmit = new EventEmitter<Listing>;
  
  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
    this.name = this.currentName,
    this.description = this.currentDescription,
    this.price = this.currentPrice
  }

  onButtonClicked(): void {
    this.onSubmit.emit({
      id: null ?? '',
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views: 0
    })
    
  }
}
