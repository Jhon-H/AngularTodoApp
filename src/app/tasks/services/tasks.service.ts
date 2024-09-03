import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from '@shared/services/local-storage.service';
import {
  Task,
  TaskList,
  TaskListMetadata,
} from '@tasks/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private localStorageService: LocalStorageService) {}

  public taskList = signal<Record<string, TaskList>>({});

  loadLists(taskList: Record<string, TaskList>) {
    this.taskList.set(taskList);
  }

  addList(listMetadata: TaskListMetadata) {
    if (Object.prototype.hasOwnProperty.call(this.taskList(), listMetadata.id))
      return;

    const updatedList = {
      ...this.taskList(),
      [listMetadata.id]: { ...listMetadata, tasks: [] },
    };

    this.taskList.set(updatedList);
    this.localStorageService.setItem('tasks', JSON.stringify(updatedList));
  }

  editList(listMetadata: TaskListMetadata) {
    if (!Object.prototype.hasOwnProperty.call(this.taskList(), listMetadata.id))
      return;

    const updatedList = {
      ...this.taskList(),
      [listMetadata.id]: {
        ...listMetadata,
        tasks: this.taskList()[listMetadata.id].tasks,
      },
    };

    this.taskList.set(updatedList);
    this.localStorageService.setItem('tasks', JSON.stringify(updatedList));
  }

  editListTitle(listId: string, name: string) {
    if (!Object.prototype.hasOwnProperty.call(this.taskList(), listId)) return;

    const updatedList = {
      ...this.taskList(),
      [listId]: {
        ...this.taskList()[listId],
        name,
      },
    };

    this.taskList.set(updatedList);
    this.localStorageService.setItem('tasks', JSON.stringify(updatedList));
  }

  deleteList(id: string) {
    const { [id]: extractedId, ...rest } = this.taskList();

    this.taskList.set(rest);
    this.localStorageService.setItem('tasks', JSON.stringify(rest));
  }

  addTask(listId: string, task: Task) {
    if (!Object.prototype.hasOwnProperty.call(this.taskList(), listId)) return;

    const updatedTasks = this.taskList()[listId].tasks;
    updatedTasks.unshift(task);

    const updatedList = {
      ...this.taskList(),
      [listId]: { ...this.taskList()[listId], tasks: updatedTasks },
    };

    this.taskList.set(updatedList);
    this.localStorageService.setItem('tasks', JSON.stringify(updatedList));
  }

  editTask(listId: string, updatedTask: Task) {
    if (!Object.prototype.hasOwnProperty.call(this.taskList(), listId)) return;


    const task = this.taskList()[listId].tasks.find(
      ({ id }) => id === updatedTask.id,
    );
    if (!task) return;

    const updatedList = {
      ...this.taskList(),
      [listId]: {
        ...this.taskList()[listId],
        tasks: this.taskList()[listId].tasks.map((currentTask) => {
          if (currentTask.id !== updatedTask.id) return currentTask;
          return updatedTask;
        }),
      },
    };

    this.taskList.set(updatedList);
    this.localStorageService.setItem('tasks', JSON.stringify(updatedList));
  }

  updatedCompletedStateOfTask(
    listId: string,
    taskId: string,
    actionType: 'toogle' | 'complete' | 'uncomplete',
  ) {
    if (!Object.prototype.hasOwnProperty.call(this.taskList(), listId)) return;

    const task = this.taskList()[listId].tasks.find(({ id }) => id === taskId);
    if (!task) return;

    const completedStateOptions = {
      toogle: !task.isComplete,
      complete: true,
      uncomplete: false,
    };

    const updatedList = {
      ...this.taskList(),
      [listId]: {
        ...this.taskList()[listId],
        tasks: this.taskList()[listId].tasks.map((currentTask) => {
          if (currentTask.id !== taskId) return currentTask;
          return {
            ...currentTask,
            isComplete: completedStateOptions[actionType],
          };
        }),
      },
    };

    this.taskList.set(updatedList);
    this.localStorageService.setItem('tasks', JSON.stringify(updatedList));
  }
}
