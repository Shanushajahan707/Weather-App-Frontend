export interface WeatherData {
    city: string;
    temp: number;
    humidity: number;
    wind: number;
    weather: string;
  }
  
  export interface WeatherResponse {
    message: string;
    WeatherData: WeatherData;
  }
  