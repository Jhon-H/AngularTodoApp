import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { transparentColors } from '@shared/interfaces/colors.interface';
import { UuidService } from '@shared/services/uuid.service';
import { Tag } from '@tasks/interfaces/task.interface';
import { take, timer } from 'rxjs';

@Component({
  selector: 'shared-new-tag',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './new-tag.component.html',
})
export class NewTagComponent {
  public uuidService = inject(UuidService);

  public isAddingTag: boolean = false;

  public canCloseIfClickOutside = signal(false);

  @ViewChild('txtInput') txtInput!: ElementRef<HTMLInputElement>;

  @Output() addTag = new EventEmitter<Tag>();

  onClickAddTag(): void {
    this.isAddingTag = true;

    timer(300)
      .pipe(take(1))
      .subscribe(() => {
        this.canCloseIfClickOutside.set(true);
      });
  }

  onClickOutside(): void {
    if (!this.canCloseIfClickOutside()) return;

    if (!this.txtInput.nativeElement.value.trim()) {
      this.canCloseIfClickOutside.set(false);
      this.isAddingTag = false;
      return;
    }

    const newTag: Tag = {
      id: this.uuidService.uuid(),
      name: this.txtInput.nativeElement.value.trim(),
      color:
        transparentColors[Math.floor(Math.random() * transparentColors.length)],
    };

    this.addTag.emit(newTag);
    this.isAddingTag = false;
  }
}
