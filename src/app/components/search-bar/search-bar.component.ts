import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { debounceTime, Subject } from 'rxjs';
import { CitySuggestion } from '../../interfaces/city-suggestion.interface';

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

  suggestions: CitySuggestion[] = [];
  loading = false;
  errorMsg = '';
  private inputChanged$ = new Subject<string>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.inputChanged$
  .pipe(debounceTime(500))
      .subscribe(value => {
        this.suggestions = [];
        this.errorMsg = '';
        if (value.trim().length > 0) {
          this.loading = true;
          this.weatherService.getCitySuggestions(value).subscribe({
            next: (results) => {
              this.loading = false;
              if (results.length === 0) {
                this.errorMsg = 'No city found with name ' + value + '.';
                this.suggestions = [];
              } else {
                this.suggestions = results;
              }
            },
            error: () => {
              this.loading = false;
              this.errorMsg = 'Error fetching suggestions. please try after some time';
              this.suggestions = [];
            }
          });
        } else {
          this.loading = false;
        }
      });
  }

  onInputChange() {
    this.inputChanged$.next(this.city);
  }

  @Output() citySelected = new EventEmitter<CitySuggestion>();

  selectSuggestion(s: CitySuggestion) {
    this.city = `${s.name}, ${s.state || ''}, ${s.country}`;
    this.suggestions = [];
    this.citySelected.emit(s);
  }

  searchCity() {
    // Only allow search via suggestion selection for API accuracy
    this.suggestions = [];
  }
}
