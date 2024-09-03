import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@shared/components/icon/icon.component';
import { IconName } from '@shared/interfaces/icons.interface';

@Component({
  selector: 'shared-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './sidebarItem.component.html',
})
export class SidebarItemComponent {
  @Input({ required: true }) name!: string;

  @Input({ required: true }) redirectTo!: string;

  @Input() icon?: IconName;
}
