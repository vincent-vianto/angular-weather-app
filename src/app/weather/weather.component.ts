import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from '../apixu.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  public weatherData: any;
  public forecastData: any;

  public errors: any

  moment: any = moment;
  math = Math

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService) {
    this.apixuService.getWeather('Jakarta').subscribe(data => {
      this.weatherData = data;
    });
    this.apixuService.getForecast('Jakarta').subscribe(data => {
      this.forecastData = data;
    });
  }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    })
  }

  sendToAPIXU(formValues: { location: string; }) {
      this.apixuService.getWeather(formValues.location).subscribe(
        data => {
          this.weatherData = data;
          this.errors = false
        },
        e => {
          this.errors = e.error;
        },);

      this.apixuService.getForecast(formValues.location).subscribe(
        data => {
          this.forecastData = data;
          this.errors = false
        }, 
        e => {
          this.errors = e.error;
        },);
  }

  dayPicker(time: moment.MomentInput) {
    const dateNow = moment(Date.now())
    const dateDt = moment(time)
    let dayDiff =
      dateNow.diff(dateDt, 'day') === 0
        ? 'Today'
        : dateNow.diff(dateDt, 'day') === -1
          ? 'Tomorrow'
          : dateDt.format('D MMM')
    return dayDiff
  }

  imageWeather = (weatherId: number) => {
    let weatherImageUrl = "";

    if (weatherId) {
      if (weatherId <= 804 && weatherId >= 800)
        weatherImageUrl = "assets/images/sunny.png";
      else if (weatherId <= 781 && weatherId >= 701)
        weatherImageUrl = "assets/images/sunny.jpg";
      else if (weatherId <= 321 && weatherId >= 300)
        weatherImageUrl = "assets/images/cloudy.jpg";
      else if (weatherId <= 531 && weatherId >= 500)
        weatherImageUrl = "assets/images/rainy.jpg";
      else weatherImageUrl = "assets/images/thunder.png";
    }

    return {
      background: `linear-gradient( rgba(0, 0, 0, 0.758), rgba(0, 0, 0, 0.758) ), url(${weatherImageUrl}) no-repeat center/cover`,
    };
  };


}
