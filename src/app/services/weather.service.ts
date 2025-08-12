import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CitySuggestion } from '../interfaces/city-suggestion.interface';
import { WeatherData } from '../interfaces/weather-data.interface';

interface CacheEntry {
  data: WeatherData;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geoUrl: string = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private cache: Map<string, CacheEntry> = new Map<string, CacheEntry>();
  private CACHE_TTL: number = 1000 * 60 * 10; // 10 minutes

  constructor(private http: HttpClient) {
    if (!environment.openWeatherApiKey) {
      throw new Error('OpenWeather API key is not defined in environment variables.');
    }
  }

  public getCitySuggestions(query: string, limit: number = 5): Observable<CitySuggestion[]> {
    const url: string = `${this.geoUrl}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${environment.openWeatherApiKey}`;
    return this.http.get<CitySuggestion[]>(url).pipe(
      catchError(err => throwError(() => err))
    );
  }

  public getWeatherByCoords(lat: number, lon: number, cacheKey?: string): Observable<WeatherData> {
    if (cacheKey && this.cache.has(cacheKey)) {
      const entry: CacheEntry = this.cache.get(cacheKey)!;
      if (Date.now() < entry.expiry) {
        return new Observable<WeatherData>(observer => {
          observer.next(entry.data);
          observer.complete();
        });
      } else {
        this.cache.delete(cacheKey);
      }
    }
    const url: string = `${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${environment.openWeatherApiKey}`;
    return this.http.get<WeatherData>(url).pipe(
      map((data: WeatherData) => {
        if (cacheKey) {
          this.cache.set(cacheKey, { data, expiry: Date.now() + this.CACHE_TTL });
        }
        return data;
      }),
      catchError(err => throwError(() => err))
    );
  }
}
