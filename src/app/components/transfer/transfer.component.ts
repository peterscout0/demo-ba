import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {
  constructor(private router: Router) {}

  onNavigateToHome() {
    this.router.navigate(['/home']);
  }

  onSelectMobileTransfer() {
    this.router.navigate(['/mobile-cash']);
  }
}
