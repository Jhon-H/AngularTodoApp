import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() isOpen = true;

  @Output() closeModal = new EventEmitter<void>();

  handleOutsideClick(event: MouseEvent) {
    if (event.target !== event.currentTarget) return;
    this.closeModal.emit();
  }
}
