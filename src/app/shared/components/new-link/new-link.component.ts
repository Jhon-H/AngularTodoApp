import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { UuidService } from '@shared/services/uuid.service';
import { UrlValidator } from '@shared/validator/url.validator';
import { Link } from '@tasks/interfaces/task.interface';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'shared-new-link',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClickOutsideDirective],
  templateUrl: './new-link.component.html',
})
export class NewLinkComponent implements OnDestroy {
  public uuidService = inject(UuidService);

  public fb = inject(FormBuilder);

  public isAddingNewLink: boolean = false;

  public canCloseIfClickOutside = signal(false);

  public $timer?: Subscription;

  public linkForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    link: this.fb.control('', [Validators.required, UrlValidator]),
  });

  public inputs = [
    { name: 'name', placeholder: 'Título' },
    { name: 'link', placeholder: 'Link' },
  ];

  @Output() addLink = new EventEmitter<Link>();

  ngOnDestroy(): void {
    this.$timer?.unsubscribe();
  }

  getInput(name: string) {
    return this.linkForm.controls[name as keyof typeof this.linkForm.controls];
  }

  onClick(): void {
    this.$timer = timer(300)
      .pipe(take(1))
      .subscribe(() => {
        this.canCloseIfClickOutside.set(true);
      });

    this.isAddingNewLink = true;
  }

  onAddLink(): void {
    if (this.linkForm.invalid) {
      this.linkForm.markAllAsTouched();
      return;
    }

    const newLink: Link = {
      id: this.uuidService.uuid(),
      name: this.linkForm.controls.name.value!,
      link: this.linkForm.controls.link.value!,
    };

    this.isAddingNewLink = false;
    this.linkForm.reset();
    this.addLink.emit(newLink);
  }

  onCancel(): void {
    if (!this.canCloseIfClickOutside()) return;

    this.isAddingNewLink = false;
    this.linkForm.reset();
  }
}
