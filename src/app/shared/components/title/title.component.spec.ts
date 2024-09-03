import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TitleComponent>;
  let comp: TitleComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TitleComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should initialize the component with the correct initial state', () => {
    expect(comp).toBeTruthy();
    expect(comp.isEditing()).toBeFalse();
  });

  it('should set isEditing to true when the title is clicked', () => {
    comp.onClickTitle();
    expect(comp.isEditing()).toBeTrue();
  });

  it('should set isEditing to false when clicking outside the title input field', () => {
    comp.isEditing.set(true);
    comp.canCloseIfClickOutside.set(true);
    fixture.detectChanges();
    comp.onClickOutside();
    expect(comp.isEditing()).toBeFalse();
  });

  it('should set isEditing to false when pressing enter in the title input field', () => {
    comp.isEditing.set(true);
    fixture.detectChanges();
    comp.onKeyupEnter();
    expect(comp.isEditing()).toBeFalse();
  });

  it('should emit the correct title text when the changeTitle event is emitted', () => {
    spyOn(comp.changeTitle, 'emit');
    comp.isEditing.set(true);
    comp.canCloseIfClickOutside.set(true);
    comp.txtInput = {
      nativeElement: { value: 'New Title' },
    } as ElementRef;
    comp.onClickOutside();

    fixture.detectChanges();

    expect(comp.changeTitle.emit).toHaveBeenCalledWith('New Title');
  });
});
