import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitSuggestionComponent } from './outfit-suggestion.component';

describe('OutfitSuggestionComponent', () => {
  let component: OutfitSuggestionComponent;
  let fixture: ComponentFixture<OutfitSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitSuggestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutfitSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
