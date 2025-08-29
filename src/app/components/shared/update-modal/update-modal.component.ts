import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isVisible" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
          <button class="close-btn" (click)="onClose()">×</button>
        </div>
        
        <div class="modal-body">
          <div class="version-badge">v{{ version }}</div>
          
          <div class="features-list">
            <div class="feature-item" *ngFor="let feature of features">
              • {{ feature }}
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="continue-btn" (click)="onClose()">Continuar</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent {
  @Input() isVisible = false;
  @Input() title = 'Novedades';
  @Input() version = '1.10.4';
  @Input() features: string[] = [];
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
