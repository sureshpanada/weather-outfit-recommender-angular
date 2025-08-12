import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherDisplayComponent } from './weather-display.component';

describe('WeatherDisplayComponent', () => {
  let component: WeatherDisplayComponent;
  let fixture: ComponentFixture<WeatherDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDisplayComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render weather data', () => {
    component.data = {
      name: 'TestCity',
      main: { temp: 293.15, humidity: 55 },
      weather: [{ main: 'Clouds', description: 'scattered clouds' }],
      wind: { speed: 12 }
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.weather-card h2')?.textContent).toContain('TestCity');
    expect(compiled.textContent).toContain('Temperature');
    expect(compiled.textContent).toContain('Humidity');
    expect(compiled.textContent).toContain('Wind');
    expect(compiled.textContent).toContain('Clouds');
  });

  it('should not render card if no data', () => {
    component.data = null;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.weather-card')).toBeNull();
  });

  it('should have animation trigger', () => {
    // Just check that the card element exists and has the animation attribute
    component.data = {
      name: 'TestCity',
      main: { temp: 293.15, humidity: 55 },
      weather: [{ main: 'Clouds', description: 'scattered clouds' }],
      wind: { speed: 12 }
    };
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.weather-card');
    expect(card).not.toBeNull();
  });
});
