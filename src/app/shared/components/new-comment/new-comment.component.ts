import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UuidService } from '@shared/services/uuid.service';
import { Comment } from '@tasks/interfaces/task.interface';

@Component({
  selector: 'shared-new-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-comment.component.html',
})
export class NewCommentComponent {
  public fb = inject(FormBuilder);

  public uuidService = inject(UuidService);

  @Output() saveComment = new EventEmitter<Comment>();

  public commentForm = this.fb.group({
    comment: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(400),
    ]),
  });

  public isCreatingComment: boolean = false;

  onClickButton(): void {
    this.isCreatingComment = true;
  }

  onSubmit(): void {
    if (this.commentForm.invalid) return;

    const newComment: Comment = {
      id: this.uuidService.uuid(),
      text: this.commentForm.controls.comment.value as string,
    };

    this.saveComment.emit(newComment);
    this.commentForm.reset();
    this.isCreatingComment = false;
  }

  onCancel() {
    this.isCreatingComment = false;
    this.commentForm.reset();
  }
}
