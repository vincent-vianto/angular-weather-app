
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {
  myApiKey: string = environment.API_WEATHER_KEY
  myURL: string = environment.API_WEATHER_URL

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    return this.http.get(
      this.myURL + '/weather?q=' + location + '&appid=' + this.myApiKey + '&units=metric'
    );
  }

  getForecast(location: string) {
    return this.http.get(
      this.myURL+'/forecast?q=' + location + '&appid=' + this.myApiKey + '&units=metric'
    );
  }

  
}
