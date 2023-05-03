import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingsService } from '../listings.service'; 

@Component({
  selector: 'app-new-listing-page',
  templateUrl: './new-listing-page.component.html',
  styleUrls: ['./new-listing-page.component.css']
})
export class NewListingPageComponent implements OnInit {
  
  constructor(
    private router: Router,
    private ListingsService: ListingsService,
  ) { }
  ngOnInit(): void {
  }

  onSubmit({name, description, price}: { name: string, description: string, price: number }): void {
    this.ListingsService.createListing(name, description, price)
      .subscribe(()=> {
        this.router.navigateByUrl('/my-listings');
      })
  }
}