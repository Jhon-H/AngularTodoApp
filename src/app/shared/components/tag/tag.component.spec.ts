import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let fixture: ComponentFixture<TagComponent>;
  let comp: TagComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TagComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should initialize the component with the correct initial state', () => {
    expect(comp).toBeTruthy();
    expect(comp.name).toBeUndefined();
    expect(comp.color).toBe('peach');
    expect(comp.withIcon).toBeFalse();
  });

  it('should set the name input correctly', () => {
    comp.name = 'Test Tag';
    expect(comp.name).toBe('Test Tag');
  });

  it('should set the color input correctly', () => {
    comp.color = 'pink';
    expect(comp.color).toBe('pink');
  });

  it('should set the withIcon input correctly', () => {
    comp.withIcon = true;
    expect(comp.withIcon).toBeTrue();
  });

  it('should return the correct background and text colors based on the color input', () => {
    expect(comp.tagColor).toEqual({
      bg: 'rgba(255, 218, 185, 0.4)',
      text: 'rgba(255, 153, 102, 0.9)',
    });

    comp.color = 'pink';
    expect(comp.tagColor).toEqual({
      bg: 'rgba(255, 173, 204, 0.4)',
      text: 'rgba(255, 51, 153, 0.9)',
    });
  });
});
