import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../Services/weather.service';
import { WeatherData } from '../WeatherModel/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(private WeatherService: WeatherService) {
  }
  cityName: string = 'Udaipur';
  public weatherData?: WeatherData;
  public today: Date;
  public currentDay: any;
  public todayDay: string;
  public days: any | [];
  WeatherForm: FormGroup;
  pipe = new DatePipe('en-US');
  lat: any;
  lang: any;
  ngOnInit() {
    this.WeatherForm = new FormGroup({
      'city': new FormControl(null)
    })
    if (!navigator.geolocation) {
      alert('Please allow GPS to get current Location');
    }
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lang = position.coords.longitude;
        console.log(`lat: ${position.coords.latitude}, lang: ${position.coords.longitude}`)
      });
    }
    this.watchPosition();
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.today = new Date();
    this.todayDay = this.pipe.transform(Date.now(), 'EEEE,dd MMMM');
    console.log(this.todayDay);
    console.log(this.days[this.todayDay + 1]);
    this.cityName = '';
  }
  watchPosition() {
    navigator.geolocation.watchPosition((position) => {
      this.lat = position.coords.latitude;
      this.lang = position.coords.longitude;
      console.log(`lat: ${position.coords.latitude}, lang: ${position.coords.longitude}`)
      this.getWeatherDataWithLocation(this.lat, this.lang);
    },(err)=>{
      console.log(err);
      alert('Please Allow GPS to get your current location ')
    },{
      enableHighAccuracy:true,
      // timeout:10000,
      // maximumAge:0
    })
  }

  onSubmit() {
    this.cityName = this.WeatherForm.get('city').value;
    this.getWeatherData(this.cityName);
    this.cityName = '';
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.WeatherForm.reset();
    this.today = new Date();
    let dayName = days[this.today.getDay()]
    console.log(dayName);
  }
  getWeatherDataWithLocation(lat: any, lang: any) {
    this.WeatherService.getWeatherDataWithLocation(lat, lang).subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    })
  }
  getWeatherData(cityName: any) {
    this.WeatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(response);
      }
    })
  }
}
