import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkComponent } from '@shared/components/link/link.component';
import { NewCommentComponent } from '@shared/components/new-comment/new-comment.component';
import { NewLinkComponent } from '@shared/components/new-link/new-link.component';
import { NewTagComponent } from '@shared/components/new-tag/new-tag.component';
import { TagComponent } from '@shared/components/tag/tag.component';
import { TitleComponent } from '@shared/components/title/title.component';
import { TagColorPipe } from '@shared/pipes/tag-color.pipe';
import { Comment, Link, Tag, Task } from '@tasks/interfaces/task.interface';
import { TasksService } from '@tasks/services/tasks.service';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    LinkComponent,
    NewLinkComponent,
    NewCommentComponent,
    TagComponent,
    TagColorPipe,
    NewTagComponent,
  ],
  templateUrl: './edit-task-page.component.html',
})
export default class EditTaskPageComponent implements OnInit {
  public activatedRoute = inject(ActivatedRoute);

  public fb = inject(FormBuilder);

  public router = inject(Router);

  public tasksService = inject(TasksService);

  public taskForm = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    tags: this.fb.array([]),
    links: this.fb.array([]),
    comments: this.fb.array([]),
  });

  public task!: Task;

  public listId!: string;

  public isPristine: boolean = true;

  get currentTitle(): string {
    return this.taskForm.controls.title.value as string;
  }

  get currentTags(): Tag[] {
    return this.taskForm.controls.tags.value as Tag[];
  }

  get currentLinks(): Link[] {
    return this.taskForm.controls.links.value as Link[];
  }

  get currentComments(): Comment[] {
    return this.taskForm.controls.comments.value as Comment[];
  }

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const listId = params['list-id'];
      const taskId = params['task-id'];

      const existListById = Object.prototype.hasOwnProperty.call(
        this.tasksService.taskList(),
        listId,
      );
      if (!existListById) {
        this.router.navigate(['/404']);
        return;
      }

      const listById = this.tasksService.taskList()[listId];
      const taskById = listById.tasks.find((task) => task.id === taskId);
      if (!taskById) {
        this.router.navigate(['/tasks', listId]);
        return;
      }

      this.listId = listId;
      this.task = taskById;
    });
  }

  ngOnInit(): void {
    this.taskForm.get('title')?.setValue(this.task.title);

    this.task.tags.forEach((tag) => {
      this.taskForm.controls.tags.push(
        this.fb.control(tag, Validators.required),
      );
    });

    this.task.links.forEach((link) => {
      this.taskForm.controls.links.push(
        this.fb.control(link, Validators.required),
      );
    });

    this.task.comments.forEach((comment) => {
      this.taskForm.controls.comments.push(
        this.fb.control(comment, Validators.required),
      );
    });
  }

  onChangeTitle(title: string): void {
    this.taskForm.patchValue({ title });
    this.isPristine = false;
  }

  onAddLink(link: Link): void {
    const linksForm = this.taskForm.get('links') as FormArray;
    linksForm.push(this.fb.control(link, Validators.required));
    this.isPristine = false;
  }

  onSaveComment(comment: Comment): void {
    const commentsForm = this.taskForm.get('comments') as FormArray;

    commentsForm.insert(0, this.fb.control(comment, Validators.required));
    this.isPristine = false;
  }

  onClickAddTag(tag: Tag): void {
    const tagsForm = this.taskForm.get('tags') as FormArray;

    tagsForm.push(this.fb.control(tag, Validators.required));
    this.isPristine = false;
  }

  onSaveChanges(): void {
    if (this.isPristine) return;

    const updatedTask: Task = {
      ...this.task,
      title: this.taskForm.controls.title.value as string,
      links: this.taskForm.controls.links.value as Link[],
      comments: this.taskForm.controls.comments.value as Comment[],
      tags: this.taskForm.controls.tags.value as Tag[],
    };

    this.tasksService.editTask(this.listId!, updatedTask);
    this.router.navigate(['/tasks', this.listId]);
  }

  onCancel(): void {
    this.router.navigate(['/tasks', this.listId]);
  }
}
