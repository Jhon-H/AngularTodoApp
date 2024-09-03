import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAward,
  faChevronLeft,
  faChevronRight,
  faClock,
  faCoffee,
  faEdit,
  faLink,
  faPlus,
  faCircle,
  faGhost,
  faClose,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { IconName } from '@shared/interfaces/icons.interface';

@Component({
  selector: 'shared-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  private iconsMap: Record<IconName, IconDefinition> = {
    award: faAward,
    'chevron-left': faChevronLeft,
    'chevron-right': faChevronRight,
    clock: faClock,
    coffee: faCoffee,
    comment: faComment,
    circle: faCircle,
    edit: faEdit,
    link: faLink,
    plus: faPlus,
    ghost: faGhost,
    close: faClose,
  };

  get iconElement() {
    return this.iconsMap[this.icon];
  }

  @Input({ required: true }) icon!: IconName;

  @Input() iconClass?: string;

  @Input() size?: SizeProp;
}
