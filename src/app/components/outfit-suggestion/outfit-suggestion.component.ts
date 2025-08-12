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
        style({
          opacity: 0,
          transform: 'scale(0.8) translateY(60px)',
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        }),
        animate('900ms cubic-bezier(.22,1,.36,1)', style({
          opacity: 1,
          transform: 'scale(1) translateY(0)',
          boxShadow: '0 6px 24px var(--color-shadow)'
        }))
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(.55,0,.55,.2)', style({
          opacity: 0,
          transform: 'scale(0.8) translateY(-60px)',
          boxShadow: '0 0 0 rgba(0,0,0,0)'
        }))
      ])
    ])
  ]
})
export class OutfitSuggestionComponent {
  @Input() temperature!: number; // Celsius
  @Input() condition!: string;
  @Input() wind!: number; // speed in km/h
  @Input() humidity!: number; // %

  /** Can be improved further */
  get suggestion(): string {
    if (this.temperature === undefined || this.temperature === null) return '';
    const cond = this.condition?.toLowerCase() || '';
    let advice: string[] = [];
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
