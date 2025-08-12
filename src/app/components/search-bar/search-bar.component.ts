import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule], // needed for ngModel, *ngIf
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  city = '';
  @Output() citySearch = new EventEmitter<string>();

  searchCity() {
    if (this.city.trim()) {
      this.citySearch.emit(this.city.trim());
      this.city = '';
    }
  }
}
