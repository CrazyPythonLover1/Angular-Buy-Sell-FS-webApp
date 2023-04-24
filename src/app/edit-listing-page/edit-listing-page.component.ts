import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css']
})
export class EditListingPageComponent {
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listing = fakeMyListings.find(listing => Number(listing.id) === Number(id))
  }

  onSubmit(): void {
    alert('Saving changes to the listing...');
    this.router.navigateByUrl('/my-listings');
  }
}
