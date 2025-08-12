import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent {
  @Input() history: string[] = [];
  @Output() citySelect = new EventEmitter<string>();

  selectCity(city: string) {
    this.citySelect.emit(city);
  }
}
