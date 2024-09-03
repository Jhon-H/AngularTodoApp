import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { TransparentColor } from '@shared/interfaces/colors.interface';

@Component({
  selector: 'shared-tag',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './tag.component.html',
})
export class TagComponent {
  @Input() name!: string;

  @Input() color: TransparentColor = 'peach';

  @Input({ transform: booleanAttribute }) withIcon: boolean = false;

  private bgColors: Record<TransparentColor, { bg: string; text: string }> = {
    pink: { bg: 'rgba(255, 173, 204, 0.4)', text: 'rgba(255, 51, 153, 0.9)' },
    blue: { bg: 'rgba(135, 218, 255, 0.4)', text: 'rgba(0, 153, 255, 0.9)' },
    green: { bg: 'rgba(153, 255, 153, 0.4)', text: 'rgba(0, 204, 102, 0.9)' },
    purple: { bg: 'rgba(229, 160, 250, 0.4)', text: 'rgba(153, 51, 204, 0.9)' },
    yellow: { bg: 'rgba(255, 255, 153, 0.4)', text: 'rgba(204, 204, 0, 0.9)' },
    orange: { bg: 'rgba(255, 204, 102, 0.4)', text: 'rgba(255, 102, 0, 0.9)' },
    turquoise: {
      bg: 'rgba(153, 238, 238, 0.4)',
      text: 'rgba(0, 204, 204, 0.9)',
    },
    lavender: {
      bg: 'rgba(204, 204, 255, 0.4)',
      text: 'rgba(102, 102, 255, 0.9)',
    },
    peach: { bg: 'rgba(255, 218, 185, 0.4)', text: 'rgba(255, 153, 102, 0.9)' },
    mint: { bg: 'rgba(204, 255, 204, 0.4)', text: 'rgba(51, 204, 102, 0.9)' },
  };

  get tagColor() {
    return this.bgColors[this.color];
  }
}
