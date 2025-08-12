import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutfitSuggestionComponent } from './outfit-suggestion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OutfitSuggestionComponent', () => {
  let component: OutfitSuggestionComponent;
  let fixture: ComponentFixture<OutfitSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitSuggestionComponent,BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutfitSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should suggest raincoat for rainy weather', () => {
    component.temperature = 15;
    component.condition = 'Rain';
    component.wind = 5;
    component.humidity = 60;
    fixture.detectChanges();
    expect(component.suggestion).toContain('Raincoat');
  });

  it('should suggest warm coat for cold temperature', () => {
    component.temperature = 5;
    component.condition = 'Clear';
    component.wind = 5;
    component.humidity = 60;
    fixture.detectChanges();
    expect(component.suggestion).toContain('Warm coat');
  });

  it('should suggest sunglasses for sunny weather', () => {
    component.temperature = 25;
    component.condition = 'Sunny';
    component.wind = 5;
    component.humidity = 60;
    fixture.detectChanges();
    expect(component.suggestion).toContain('Sunglasses');
  });

  it('should render suggestion in template', () => {
    component.temperature = 20;
    component.condition = 'Clouds';
    component.wind = 10;
    component.humidity = 50;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.suggestion);
  });

  it('should have animation trigger', () => {
    component.temperature = 20;
    component.condition = 'Clouds';
    component.wind = 10;
    component.humidity = 50;
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.outfit-card');
    expect(card).not.toBeNull();
  });
});
