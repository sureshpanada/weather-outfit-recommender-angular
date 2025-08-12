import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryListComponent } from './history-list.component';

describe('HistoryListComponent', () => {
  let component: HistoryListComponent;
  let fixture: ComponentFixture<HistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render history items', () => {
    component.history = [
      { label: 'London', lat: 51.5, lon: -0.1 },
      { label: 'Paris', lat: 48.8, lon: 2.3 }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('London');
    expect(compiled.textContent).toContain('Paris');
  });

  it('should emit citySelect on click', () => {
    spyOn(component.citySelect, 'emit');
    const city = { label: 'Berlin', lat: 52.5, lon: 13.4 };
    component.selectCity(city);
    expect(component.citySelect.emit).toHaveBeenCalledWith(city);
  });

  it('should not render list if history is empty', () => {
    component.history = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Search History');
  });
});
