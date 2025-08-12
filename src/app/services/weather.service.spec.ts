
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment';
import { CitySuggestion } from '../interfaces/city-suggestion.interface';
import { WeatherData } from '../interfaces/weather-data.interface';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch city suggestions', () => {
    const mockSuggestions: CitySuggestion[] = [
      { name: 'London', lat: 51.5, lon: -0.1, country: 'GB' }
    ];
    service.getCitySuggestions('London').subscribe(suggestions => {
      expect(suggestions.length).toBe(1);
      expect(suggestions[0].name).toBe('London');
    });
    const req = httpMock.expectOne(r => r.url.includes('geo/1.0/direct'));
    expect(req.request.method).toBe('GET');
    req.flush(mockSuggestions);
  });

  it('should handle city suggestions error', () => {
    service.getCitySuggestions('ErrorCity').subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });
    const req = httpMock.expectOne(r => r.url.includes('geo/1.0/direct'));
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  it('should fetch weather by coords and cache result', () => {
    const mockWeather: WeatherData = { main: { temp: 280 }, weather: [{ main: 'Clouds', description: 'cloudy' }], wind: { speed: 10 }, name: 'London', sys: {}, coord: { lat: 51.5, lon: -0.1 }, id: 1 } as any;
    service.getWeatherByCoords(51.5, -0.1, 'London').subscribe(data => {
      expect(data.name).toBe('London');
    });
    const req = httpMock.expectOne(r => r.url.includes('data/2.5/weather'));
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
    // Should be cached now
    service.getWeatherByCoords(51.5, -0.1, 'London').subscribe(data => {
      expect(data.name).toBe('London');
    });
  });

  it('should expire cache after TTL', (done) => {
    const mockWeather: WeatherData = { main: { temp: 280 }, weather: [{ main: 'Clouds', description: 'cloudy' }], wind: { speed: 10 }, name: 'London', sys: {}, coord: { lat: 51.5, lon: -0.1 }, id: 1 } as any;
    service['CACHE_TTL'] = 1; // 1ms for test
    service.getWeatherByCoords(51.5, -0.1, 'London').subscribe(data => {
      expect(data.name).toBe('London');
      setTimeout(() => {
        service.getWeatherByCoords(51.5, -0.1, 'London').subscribe(data2 => {
          expect(data2.name).toBe('London');
          done();
        });
        const req = httpMock.expectOne(r => r.url.includes('data/2.5/weather'));
        req.flush(mockWeather);
      }, 2);
    });
    const req = httpMock.expectOne(r => r.url.includes('data/2.5/weather'));
    req.flush(mockWeather);
  });

  it('should handle weather API error', () => {
    service.getWeatherByCoords(0, 0, 'ErrorCity').subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });
    const req = httpMock.expectOne(r => r.url.includes('data/2.5/weather'));
    req.flush('error', { status: 404, statusText: 'Not Found' });
  });
});
