import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth-service.service';

@Component({
  selector: 'app-summary-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './summary-page.component.html',
})
export class SummaryPageComponent implements OnInit {
  public authService = inject(AuthService);

  public username: string = '';

  public email: string = '';

  public name: string = '';

  ngOnInit(): void {
    this.authService.auth$.subscribe((authState) => {
      this.username = authState.username!;
      this.email = authState.email!;
      this.name = authState.name!;
    });
  }
}
