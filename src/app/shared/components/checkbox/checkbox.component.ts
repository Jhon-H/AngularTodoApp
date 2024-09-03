import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() checked: boolean = false;

  @ViewChild('inputCheck') inputCheck!: ElementRef;

  @Output() check = new EventEmitter<boolean>();

  handleInputCheck() {
    const isChecked = this.inputCheck.nativeElement.checked;
    this.check.emit(isChecked);
  }
}
