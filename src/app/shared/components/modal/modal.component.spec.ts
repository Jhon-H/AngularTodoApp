import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let comp: ModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ModalComponent);
      comp = fixture.componentInstance;
      comp.isOpen = true;
      fixture.detectChanges();
    });
  }));

  it('should render modal if isOpen is true', () => {
    const modal = fixture.debugElement.query(By.css('div'));
    expect(modal).toBeDefined();
  });

  it('should not render modal if isOpen is false', () => {
    comp.isOpen = false;
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('div'));

    expect(modal).toBeNull();
  });
});
