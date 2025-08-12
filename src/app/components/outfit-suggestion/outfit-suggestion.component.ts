import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-outfit-suggestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-suggestion.component.html',
  styleUrls: ['./outfit-suggestion.component.scss']
})
export class OutfitSuggestionComponent {
  @Input() temperature!: number;
  @Input() condition!: string;

  get suggestion(): string {
    if (this.temperature === undefined || this.temperature === null) return '';
    if (this.temperature < 10) return 'Warm coat and gloves';
    if (this.temperature < 20) return 'Light jacket';
    if (this.condition?.toLowerCase().includes('rain')) return 'Raincoat and umbrella';
    return 'T-shirt and shorts';
  }
}
