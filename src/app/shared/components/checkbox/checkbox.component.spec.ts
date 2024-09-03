import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let comp: CheckboxComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxComponent],
      providers: [],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CheckboxComponent);
      comp = fixture.componentInstance;
      comp.checked = false;
      fixture.detectChanges();
    });
  }));

  it('should render a input type checkbox', () => {
    const input = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    expect(input).toBeDefined();
  });

  it('should emit true if click a non-checked input', () => {
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    const spy = spyOn(comp.check, 'emit');

    comp.checked = false;
    fixture.detectChanges();

    input.click();
    expect(spy).toHaveBeenCalledOnceWith(true);
  });

  it('should emit false if click a checked input', () => {
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    const spy = spyOn(comp.check, 'emit');

    comp.checked = true;
    fixture.detectChanges();

    input.click();
    expect(spy).toHaveBeenCalledOnceWith(false);
  });
});
