import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-link',
  standalone: true,
  imports: [],
  templateUrl: './link.component.html',
})
export class LinkComponent {
  @Input({ required: true }) link!: string;

  @Input() title?: string;
}
