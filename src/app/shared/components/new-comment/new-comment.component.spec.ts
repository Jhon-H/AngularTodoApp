import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCommentComponent } from './new-comment.component';

describe('NewCommentComponent', () => {
  let fixture: ComponentFixture<NewCommentComponent>;
  let comp: NewCommentComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewCommentComponent, CommonModule, ReactiveFormsModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(NewCommentComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should initialize the component with the correct form controls and initial state', () => {
    expect(comp).toBeTruthy();
    expect(comp.commentForm.get('comment')).toBeTruthy();
    expect(comp.isCreatingComment).toBeFalse();
  });

  it('should set isCreatingComment to true when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(comp.isCreatingComment).toBeTrue();
  });

  it('should emit the new comment when the form is submitted', () => {
    spyOn(comp.saveComment, 'emit');
    spyOn(comp.commentForm, 'reset');

    comp.commentForm.setValue({ comment: 'Test comment' });
    comp.onSubmit();
    expect(comp.saveComment.emit).toHaveBeenCalledWith({
      id: jasmine.any(String),
      text: 'Test comment',
    });
    expect(comp.commentForm.reset).toHaveBeenCalled();
    expect(comp.isCreatingComment).toBeFalse();
  });

  it('should not emit the new comment if the form is invalid', () => {
    spyOn(comp.saveComment, 'emit');
    comp.onSubmit();
    expect(comp.saveComment.emit).not.toHaveBeenCalled();
  });

  it('should reset the form and set isCreatingComment to false when cancel is clicked', () => {
    spyOn(comp.commentForm, 'reset');

    comp.isCreatingComment = true;
    comp.commentForm.setValue({ comment: 'Test comment' });
    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector(
      'button[type="button"]',
    );
    cancelButton.click();
    expect(comp.commentForm.reset).toHaveBeenCalled();
    expect(comp.isCreatingComment).toBeFalse();
  });
});
