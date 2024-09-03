import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewLinkComponent } from './new-link.component';

describe('NewLinkComponent', () => {
  let fixture: ComponentFixture<NewLinkComponent>;
  let comp: NewLinkComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewLinkComponent],
      providers: [],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(NewLinkComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should initialize the component with the correct form controls and initial state', () => {
    expect(comp).toBeTruthy();
    expect(comp.linkForm.get('name')).toBeTruthy();
    expect(comp.linkForm.get('link')).toBeTruthy();
    expect(comp.isAddingNewLink).toBeFalse();
  });

  it('should set isAddingNewLink to true when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('#addBtn');
    button.click();
    expect(comp.isAddingNewLink).toBeTrue();
  });

  it('should emit the new link when the form is submitted', () => {
    spyOn(comp.addLink, 'emit');
    spyOn(comp.linkForm, 'reset');
    comp.linkForm.setValue({
      name: 'Test Name',
      link: 'https://example.com',
    });
    comp.onAddLink();
    expect(comp.addLink.emit).toHaveBeenCalledWith({
      id: jasmine.any(String),
      name: 'Test Name',
      link: 'https://example.com',
    });
    expect(comp.linkForm.reset).toHaveBeenCalled();
    expect(comp.isAddingNewLink).toBeFalse();
  });

  it('should not emit the new link if the form is invalid', () => {
    spyOn(comp.addLink, 'emit');
    comp.onAddLink();
    expect(comp.addLink.emit).not.toHaveBeenCalled();
  });

  it('should reset the form and set isAddingNewLink to false when cancel is clicked', () => {
    spyOn(comp.linkForm, 'reset');

    comp.canCloseIfClickOutside.set(true);
    comp.isAddingNewLink = true;
    comp.linkForm.setValue({
      name: 'Test Name',
      link: 'https://example.com',
    });

    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector(
      'button[type="button"]',
    );
    cancelButton.click();
    expect(comp.linkForm.reset).toHaveBeenCalled();
    expect(comp.isAddingNewLink).toBeFalse();
  });

  it('should render the correct button based on isAddingNewLink state', () => {
    comp.isAddingNewLink = false;
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#addBtn');
    expect(button).toBeTruthy();

    comp.isAddingNewLink = true;
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button[type="button"]');
    expect(button).toBeTruthy();
  });
});
