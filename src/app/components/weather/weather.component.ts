import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subject, takeUntil } from 'rxjs';
import { WeatherData } from '../../auth/response';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit,OnDestroy{
  private readonly _destroy$=new Subject<void>
  weatherData!: WeatherData;
  city!: string
  error: string = '';

  constructor(private _weather:WeatherService) {}
  ngOnInit(): void {
    this.getWeather('Kollam'); 
  }
  
  
  
  
  getWeather(city: string): void {
    this._weather.getWeather(city).pipe(takeUntil(this._destroy$)).subscribe({
      next: (res) => {
        console.log(res); // Check the structure of the response
        if (res && res.WeatherData) {
          this.weatherData = res.WeatherData; // Access the nested WeatherData
          this.error=''
          this.updateWeatherIcon(); // Call updateWeatherIcon() after setting weatherData
        } else {
          console.error('WeatherData is missing in response');
        }
      },
      error: (err) => {
        this.error = err.error.message || 'An error occurred';
        console.log('Error:', this.error);
      }
    });
  }
  
  
  updateWeatherIcon(): void {
    const weatherIcon = document.querySelector('.weather-icon') as HTMLImageElement;
    if (this.weatherData.weather === 'Clouds') {
      weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/7774/7774417.png';
    } else if (this.weatherData.weather === 'Clear') {
      weatherIcon.src = 'https://static-00.iconduck.com/assets.00/clear-day-icon-1024x1024-exbd0lm2.png';
    } else if (this.weatherData.weather === 'Mist') {
      weatherIcon.src = 'https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png';
    } else if (this.weatherData.weather === 'Snow') {
      weatherIcon.src = 'https://static.vecteezy.com/system/resources/previews/022/287/856/original/3d-rendering-snowy-weather-icon-3d-render-snow-with-cloud-icon-snowfall-png.png';
    } else if (this.weatherData.weather === 'Smoke') {
      weatherIcon.src = 'https://cdn3d.iconscout.com/3d/premium/thumb/smoke-5175068-4328031.png';
    } else if (this.weatherData.weather === 'Rain') {
      weatherIcon.src = 'https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png';
    } else if (this.weatherData.weather === 'Drizzle') {
      weatherIcon.src = 'https://www.freeiconspng.com/thumbs/cloud-rain-icons/cloud-rain-weather-icon-25.png';
    }
  }



  ngOnDestroy(): void {
   this._destroy$.next()
   this._destroy$.complete
  }
}
