import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getSpecificPlace(data){
    return new Promise((resolve, reject) => {
      this.http.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + data).subscribe(response => {
        if(response){
          resolve(response);
        }
      }) 
    });
    
  }
}
