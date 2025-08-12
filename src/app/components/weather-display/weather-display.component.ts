import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
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
export class WeatherDisplayComponent {
   @Input() data: any;
}
