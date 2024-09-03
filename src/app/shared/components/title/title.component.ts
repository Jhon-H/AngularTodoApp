import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { TasksService } from '@tasks/services/tasks.service';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'shared-title',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './title.component.html',
})
export class TitleComponent implements OnDestroy {
  public tasksService = inject(TasksService);

  public isEditing = signal(false);

  public $timer?: Subscription;

  public canCloseIfClickOutside = signal(false);

  @Input({ required: true }) title!: string;

  @ViewChild('txtInput') txtInput?: ElementRef;

  @Output() changeTitle = new EventEmitter<string>();

  get inputText(): string {
    return this.txtInput?.nativeElement.value.trim();
  }

  ngOnDestroy(): void {
    this.$timer?.unsubscribe();
  }

  onClickTitle(): void {
    this.isEditing.set(true);

    this.$timer = timer(300)
      .pipe(take(1))
      .subscribe(() => {
        this.canCloseIfClickOutside.set(true);
      });
  }

  onClickOutside(): void {
    if (!this.canCloseIfClickOutside()) return;

    this.isEditing.set(false);
    this.canCloseIfClickOutside.set(false);

    if (this.inputText) {
      this.changeTitle.emit(this.inputText);
    }
  }

  onKeyupEnter(): void {
    this.isEditing.set(false);
    this.canCloseIfClickOutside.set(false);

    if (this.inputText) {
      this.changeTitle.emit(this.inputText);
    }
  }
}
