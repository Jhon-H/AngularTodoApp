import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { UuidService } from '@shared/services/uuid.service';
import { Task } from '@tasks/interfaces/task.interface';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'tasks-new-task',
  standalone: true,
  imports: [ClickOutsideDirective],
  templateUrl: './new-task.component.html',
})
export class NewTaskComponent implements OnInit, OnDestroy {
  public elementRef = inject(ElementRef);

  public uuidService = inject(UuidService);

  public $timer?: Subscription;

  public canCloseIfClickOutside = false;

  @ViewChild('txtInput') txtInput!: ElementRef;

  @Output() addTask = new EventEmitter<Task>();

  @Output() discart = new EventEmitter<void>();

  get inputText() {
    return this.txtInput.nativeElement.value.trim();
  }

  ngOnInit(): void {
    this.$timer = timer(300)
      .pipe(take(1))
      .subscribe(() => {
        this.canCloseIfClickOutside = true;
      });
  }

  ngOnDestroy(): void {
    this.$timer?.unsubscribe();
  }

  newEmptyTask(title: string): Task {
    return {
      id: this.uuidService.uuid(),
      lastUpdate: new Date(),
      title,
      isComplete: false,
      tags: [],
      links: [],
      comments: [],
    };
  }

  onKeyUpEnter() {
    if (!this.inputText) return;
    this.addTask.emit(this.newEmptyTask(this.inputText));
  }

  onClickOutside() {
    if (!this.canCloseIfClickOutside) return;

    if (!this.inputText) {
      this.discart.emit();
      return;
    }

    this.addTask.emit(this.newEmptyTask(this.inputText));
  }
}
