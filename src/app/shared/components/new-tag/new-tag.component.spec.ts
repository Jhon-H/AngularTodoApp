import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTagComponent } from './new-tag.component';

describe('NewTagComponent', () => {
  let fixture: ComponentFixture<NewTagComponent>;
  let comp: NewTagComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewTagComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(NewTagComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should initialize the component with the correct initial state', () => {
    expect(comp).toBeTruthy();
    expect(comp.isAddingTag).toBeFalse();
  });

  it('should set isAddingTag to true when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(comp.isAddingTag).toBeTrue();
  });

  it('should display the input field when isAddingTag is true', () => {
    comp.isAddingTag = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('should emit the correct tag object when onClickAddTag event is emitted', () => {
    spyOn(comp.addTag, 'emit');
    comp.isAddingTag = true;
    comp.canCloseIfClickOutside.set(true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Test Tag';
    input.dispatchEvent(new Event('input'));
    comp.onClickOutside();
    expect(comp.addTag.emit).toHaveBeenCalledWith({
      id: jasmine.any(String),
      name: 'Test Tag',
      color: jasmine.any(String), // Assuming color generation logic
    });
  });

  it('should cancel the addition of the tag when clicking outside without entering any value', () => {
    comp.isAddingTag = true;
    comp.canCloseIfClickOutside.set(true);
    fixture.detectChanges();
    comp.onClickOutside();
    expect(comp.isAddingTag).toBeFalse();
  });
});
