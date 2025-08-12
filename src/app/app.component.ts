import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from "./components/history-list/history-list.component";
import { OutfitSuggestionComponent } from "./components/outfit-suggestion/outfit-suggestion.component";
import { WeatherDisplayComponent } from "./components/weather-display/weather-display.component";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CitySuggestion } from './interfaces/city-suggestion.interface';
import { HistoryCity } from './interfaces/history-city.interface';
import { WeatherData } from './interfaces/weather-data.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HistoryListComponent, OutfitSuggestionComponent, WeatherDisplayComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  weatherData: WeatherData | null = null;
  history: HistoryCity[] = [];
  loading = false;
  errorMsg = '';

  private HISTORY_KEY = 'weatherHistory';

  theme: 'light' | 'dark' = 'light';

  constructor(private weatherService: WeatherService) {
    this.loadHistory();
  }

  onCitySuggestionSelected(suggestion: CitySuggestion) {
    this.loading = true;
    this.errorMsg = '';
    const cityLabel = `${suggestion.name}, ${suggestion.state || ''}, ${suggestion.country}`;
    this.weatherService.getWeatherByCoords(suggestion.lat, suggestion.lon, cityLabel).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.addToHistory({ label: cityLabel, lat: suggestion.lat, lon: suggestion.lon });
        this.loading = false;
      },
      error: (err) => {
        this.weatherData = null;
        this.errorMsg = 'Could not fetch weather data.';
        this.loading = false;
      }
    });
  }
  // ...existing code...

  onHistoryCitySelected(city: HistoryCity) {
    this.loading = true;
    this.errorMsg = '';
    this.weatherService.getWeatherByCoords(city.lat, city.lon, city.label).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: () => {
        this.weatherData = null;
        this.errorMsg = 'No cached data found.';
        this.loading = false;
      }
    });
  }

  addToHistory(city: HistoryCity) {
    if (!city.label) return;
    // Remove if already present
    this.history = this.history.filter(c => c.label !== city.label);
    // Add to front
    this.history.unshift(city);
    // Limit to 5
    if (this.history.length > 5) {
      const removed = this.history.pop();
      // Remove from cache
      this.weatherService['cache'].delete(removed!.label);
    }
    this.saveHistory();
  }

  saveHistory() {
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this.history));
  }

  loadHistory() {
    const saved = localStorage.getItem(this.HISTORY_KEY);
    if (saved) {
      try {
        this.history = JSON.parse(saved);
      } catch {
        this.history = [];
      }
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
