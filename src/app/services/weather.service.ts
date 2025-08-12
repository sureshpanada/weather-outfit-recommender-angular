import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_WEATHER } from '../mock/mock-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  getWeather(city: string): Observable<any> {
    const weather = MOCK_WEATHER.find(
      w => w.city.toLowerCase() === city.toLowerCase()
    );
    return of(weather || null);
  }

  getAllCities(): string[] {
    return MOCK_WEATHER.map(w => w.city);
  }
}
