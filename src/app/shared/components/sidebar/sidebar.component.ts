import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth-service.service';
import { IconComponent } from '@shared/components/icon/icon.component';
import { SidebarItemComponent } from '@shared/components/sidebar/sidebarItem/sidebarItem.component';
import { MenuItem } from '@shared/interfaces/menuItem.interface';
import { TasksService } from '@tasks/services/tasks.service';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public tasksService = inject(TasksService);

  public authService = inject(AuthService);

  public isOpen = signal(true);

  public isLoggedIn = false;

  public user?: { username: string };

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.auth$.subscribe(({ username }) => {
      this.user = { username: username! };
    });
  }

  @Output() openAddListModal = new EventEmitter<void>();

  get menuItems(): MenuItem[] {
    const taskListItems = Object.values(this.tasksService.taskList());

    return taskListItems.map(({ tasks, ...rest }) => ({
      ...rest,
      redirectTo: `/tasks/${rest.id}`,
    }));
  }

  toogleOpen(): void {
    this.isOpen.update((value) => !value);
  }

  addList(): void {
    this.openAddListModal.emit();
  }

  signOut(): void {
    this.authService.signOutUser();
  }
}
