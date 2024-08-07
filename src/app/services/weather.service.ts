import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../auth/response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl=environment.apiUrl

  constructor(private _http:HttpClient) { }

  getWeather(city: string): Observable<WeatherResponse> {
    return this._http.get<WeatherResponse>(`${this.apiUrl}weather?city=${city}`);
  }
  

}
