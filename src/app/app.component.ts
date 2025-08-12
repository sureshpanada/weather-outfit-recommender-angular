import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from "./components/history-list/history-list.component";
import { OutfitSuggestionComponent } from "./components/outfit-suggestion/outfit-suggestion.component";
import { WeatherDisplayComponent } from "./components/weather-display/weather-display.component";
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HistoryListComponent, OutfitSuggestionComponent, WeatherDisplayComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  weatherData: any = null;
  history: string[] = [];

  theme: 'light' | 'dark' = 'light';

  constructor(private weatherService: WeatherService) {}

  onCitySelected(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      if (city && !this.history.includes(city)) {
        this.history.unshift(city);
      }
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
