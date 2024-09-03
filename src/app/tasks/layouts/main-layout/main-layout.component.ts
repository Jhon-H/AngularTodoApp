import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { AddListModalComponent } from '@tasks/components/add-list-modal/add-list-modal.component';

@Component({
  selector: 'tasks-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, AddListModalComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

  public isOpenModal = signal(false);

  openAddListModal() {
    this.isOpenModal.set(true);
  }

  closeAddListModal() {
    this.isOpenModal.set(false);
  }
}
