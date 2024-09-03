import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { TagComponent } from '@shared/components/tag/tag.component';
import { TagColorPipe } from '@shared/pipes/tag-color.pipe';
import { Tag } from '@tasks/interfaces/task.interface';

@Component({
  selector: 'tasks-task',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    TagComponent,
    TagColorPipe,
    CheckboxComponent,
  ],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  public router = inject(Router);

  @Input({ required: true }) id!: string;

  @Input({ required: true }) title!: string;

  @Input({ required: true }) isComplete!: boolean;

  @Input() comments: number = 0;

  @Input() links: number = 0;

  @Input() tags: Tag[] = [];

  @Input() redirectTo?: string;

  @Output() check = new EventEmitter<{
    taskId: string;
    isChecked: boolean;
  }>();

  handleInputCheck(isChecked: boolean) {
    this.check.emit({ taskId: this.id, isChecked });
  }

  onClick(event: MouseEvent): void {
    if (event.target !== event.currentTarget) return;
    if (this.isComplete) return;

    this.router.navigate([this.redirectTo]);
  }
}
