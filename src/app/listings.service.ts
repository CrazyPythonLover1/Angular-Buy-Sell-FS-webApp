import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Listing } from './types';

const httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
  })
})

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingByid(id: string | null): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`)
  }

  addViewToListing(id: string | null): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions
    )
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token) {
            this.http.get<Listing[]>(`/api/users/${user.uid}/listings`, httpOptionsWithAuthToken(token))
              .subscribe(listing => {
                observer.next(listing);
              });
          } else {
            observer.next([]);
          }
        })
      })
    })
    
  }

  deleteListing(id: string | null): Observable<any> {
    return this.http.delete(`/api/listings/${id}`)
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>(
      '/api/listings',
      { name, description, price },
      httpOptions
    )
  }

  editListing(id: string | null, name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}`,
      {name, description, price},
      httpOptions
    )
  }

}
