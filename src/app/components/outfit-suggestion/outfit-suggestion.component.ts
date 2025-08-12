import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-outfit-suggestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-suggestion.component.html',
  styleUrls: ['./outfit-suggestion.component.scss'],
  animations: [
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(.4,0,.2,1)', style({ opacity: 1, transform: 'none' }))
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class OutfitSuggestionComponent {
  @Input() temperature!: number; // Celsius
  @Input() condition!: string;
  @Input() wind!: number; // speed in km/h
  @Input() humidity!: number; // %

  get suggestion(): string {
    if (this.temperature === undefined || this.temperature === null) return '';
    const cond = this.condition?.toLowerCase() || '';
    let advice = [];
    if (cond.includes('rain')) advice.push('Raincoat and umbrella');
    if (cond.includes('cloud')) advice.push('Light sweater');
    if (cond.includes('sunny')) advice.push('Sunglasses');
    if (this.temperature < 10) advice.push('Warm coat and gloves');
    else if (this.temperature < 20) advice.push('Light jacket');
    else if (this.temperature > 30) advice.push('Cap and sunscreen');
    if (this.wind && this.wind > 15) advice.push('Windbreaker');
    if (this.humidity && this.humidity > 75) advice.push('Breathable fabrics');
    if (advice.length === 0) advice.push('T-shirt and shorts');
    return advice.join(', ');
  }
}
