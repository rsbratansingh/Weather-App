import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../WeatherModel/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {
  weatherData: any;
  constructor(private http:HttpClient) {}
  ngOnInit() {
    console.log(this.weatherData);
  }
  getWeatherDataWithLocation(lat:number,lang:number):Observable<WeatherData>{
    return this.http.get<WeatherData>('https://weatherapi-com.p.rapidapi.com/forecast.json',{
      headers:new HttpHeaders()
      .set('X-RapidAPI-Key','weatherapi-com.p.rapidapi.com')
      .set('X-RapidAPI-Key','da43054761msh91bccb4777e0f85p1ae6e2jsn2c72b3efdc4d'),
    params:new HttpParams()
    .set('q',`${lat},${lang}`)
    .set('days',4)
    })
  }
  getWeatherData(cityName:string):Observable<WeatherData>{
    return this.http.get<WeatherData>('https://weatherapi-com.p.rapidapi.com/forecast.json',{
      headers:new HttpHeaders()
      .set('X-RapidAPI-Key','weatherapi-com.p.rapidapi.com')
      .set('X-RapidAPI-Key','da43054761msh91bccb4777e0f85p1ae6e2jsn2c72b3efdc4d'),
      params:new HttpParams()
      .set('q',cityName)
      .set('days',4)
    })
  }
}
