import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CitySuggestion } from '../interfaces/city-suggestion.interface';
import { WeatherData } from '../interfaces/weather-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getCitySuggestions(query: string, limit: number = 5): Observable<CitySuggestion[]> {
    const url = `${this.geoUrl}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${environment.openWeatherApiKey}`;
    return this.http.get<CitySuggestion[]>(url).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${environment.openWeatherApiKey}`;
    return this.http.get<WeatherData>(url).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
