import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HistoryCity } from '../../interfaces/history-city.interface';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent {
  @Input() history: HistoryCity[] = [];
  @Output() citySelect = new EventEmitter<HistoryCity>();

  selectCity(city: HistoryCity) {
    this.citySelect.emit(city);
  }
}
