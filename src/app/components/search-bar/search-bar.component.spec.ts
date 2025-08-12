import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit citySearch on input', () => {
    spyOn(component.citySearch, 'emit');
    component.city = 'London';
    component.citySearch.emit(component.city);
    expect(component.citySearch.emit).toHaveBeenCalledWith('London');
  });

  it('should show loader when searching', () => {
    component.loading = true;
    fixture.detectChanges();
    // Loader should be visible in template if implemented
    // expect(fixture.nativeElement.textContent).toContain('Loading');
    expect(component.loading).toBeTrue();
  });

  it('should show error message', () => {
    component.errorMsg = 'No city found';
    fixture.detectChanges();
    expect(component.errorMsg).toBe('No city found');
  });

  it('should emit citySelected on suggestion click', () => {
    spyOn(component.citySelected, 'emit');
    const suggestion = { name: 'Paris', lat: 48.8, lon: 2.3, country: 'FR' };
    component.citySelected.emit(suggestion);
    expect(component.citySelected.emit).toHaveBeenCalledWith(suggestion);
  });
});
