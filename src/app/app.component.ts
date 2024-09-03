import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth-service.service';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TaskList } from '@tasks/interfaces/task.interface';
import { TasksService } from '@tasks/services/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public localStorageService = inject(LocalStorageService);

  public tasksService = inject(TasksService);

  public authService = inject(AuthService);

  ngOnInit(): void {
    try {
      const tasks: Record<string, TaskList> = JSON.parse(
        this.localStorageService.getItem('tasks') ?? '',
      );

      if (tasks) {
        this.tasksService.loadLists(tasks);
      }
    } catch (error) {
      this.tasksService.loadLists({});
    }

    try {
      this.authService.validateCurrentSession();
    } catch (error) {
      console.log(error);
    }
  }
}
