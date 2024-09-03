import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '@shared/components/icon/icon.component';
import { TitleComponent } from '@shared/components/title/title.component';
import { NewTaskComponent } from '@tasks/components/new-task/new-task.component';
import { TaskComponent } from '@tasks/components/task/task.component';
import { Task } from '@tasks/interfaces/task.interface';
import { TasksService } from '@tasks/services/tasks.service';

@Component({
  selector: 'tasks-list-page',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    IconComponent,
    NewTaskComponent,
    TitleComponent,
  ],
  templateUrl: './list-page.component.html',
})
export default class ListPageComponent {
  public activatedRoute = inject(ActivatedRoute);

  public router = inject(Router);

  public tasksService = inject(TasksService);

  public listId?: string;

  public isCreatingTask: boolean = false;

  get listTitle(): string {
    return this.tasksService.taskList()[this.listId!].name;
  }

  get tasks(): Task[] {
    if (!this.listId) return [];
    return this.tasksService.taskList()[this.listId].tasks;
  }

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['list-id'];
      const existListById = Object.prototype.hasOwnProperty.call(
        this.tasksService.taskList(),
        id,
      );

      if (!existListById) {
        this.router.navigate(['/404']);
        return;
      }

      this.listId = id;
    });
  }

  onCheck({ isChecked, taskId }: { isChecked: boolean; taskId: string }) {
    this.tasksService.updatedCompletedStateOfTask(
      this.listId!,
      taskId,
      isChecked ? 'complete' : 'uncomplete',
    );
  }

  onClickNewTask() {
    if (this.isCreatingTask) return;
    this.isCreatingTask = true;
  }

  onChangeTitle(newTitle: string): void {
    this.tasksService.editListTitle(this.listId!, newTitle);
  }

  redirectTaskTo(taskId: string): string {
    return `/tasks/${this.listId}/${taskId}`;
  }

  onAddTask(task: Task) {
    this.tasksService.addTask(this.listId!, task);
    this.isCreatingTask = false;
  }

  onDiscart() {
    this.isCreatingTask = false;
  }
}
