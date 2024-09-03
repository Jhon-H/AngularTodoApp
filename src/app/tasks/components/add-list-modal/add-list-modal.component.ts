import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { IconName } from '@shared/interfaces/icons.interface';
import { UuidService } from '@shared/services/uuid.service';
import { iconList } from '@shared/utils/icons.util';
import { TaskListMetadata } from '@tasks/interfaces/task.interface';
import { TasksService } from '@tasks/services/tasks.service';

@Component({
  selector: 'tasks-add-list-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, IconComponent],
  templateUrl: './add-list-modal.component.html',
})
export class AddListModalComponent implements OnChanges {
  @ViewChild('txtInput') txtInput!: ElementRef;

  @Input() isOpen: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  public uuidService = inject(UuidService);

  public tasksService = inject(TasksService);

  public randomListIcon: IconName =
    iconList[Math.floor(Math.random() * iconList.length)];

  get isInputInvalid() {
    return !this.txtInput?.nativeElement.value.trim();
  }

  ngOnChanges(): void {
    this.randomListIcon = iconList[Math.floor(Math.random() * iconList.length)];
  }

  onAdd(): void {
    if (this.isInputInvalid) return;

    const listMetadata: TaskListMetadata = {
      id: this.uuidService.uuid(),
      name: this.txtInput.nativeElement.value.trim(),
      icon: this.randomListIcon,
    };

    this.tasksService.addList(listMetadata);
    this.cleanInputs();
    this.onCancel();
  }

  onCancel(): void {
    this.closeModal.emit();
    this.cleanInputs();
  }

  onClose(): void {
    this.closeModal.emit();
    this.cleanInputs();
  }

  cleanInputs(): void {
    this.txtInput.nativeElement.value = '';
  }
}
