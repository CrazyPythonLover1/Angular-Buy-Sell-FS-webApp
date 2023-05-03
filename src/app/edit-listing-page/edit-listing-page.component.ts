import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css']
})
export class EditListingPageComponent {
  listing!: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ListingsService: ListingsService,
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ListingsService.getListingByid(id)
      .subscribe(listing => {
        this.listing = listing; 
      })
  }

  onSubmit({name, description, price}: { name: string, description: string, price: number }): void {
    this.ListingsService.editListing(this.listing.id, name, description, price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      })

  }
}
