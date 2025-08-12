import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule], // needed for ngModel, *ngIf
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  city = '';
  @Output() citySearch = new EventEmitter<string>();

  suggestions: string[] = [];
  private inputChanged$ = new Subject<string>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.inputChanged$
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.suggestions = [];
        if (value.trim().length > 0) {
          const allCities = this.weatherService.getAllCities();
          this.suggestions = allCities.filter(city =>
            city.toLowerCase().startsWith(value.trim().toLowerCase())
          );
        }
      });
  }

  onInputChange() {
    this.inputChanged$.next(this.city);
  }

  selectSuggestion(s: string) {
    this.city = s;
    this.suggestions = [];
    this.searchCity();
  }

  searchCity() {
    if (this.city.trim()) {
      this.citySearch.emit(this.city.trim());
      this.city = '';
      this.suggestions = [];
    }
  }
}
