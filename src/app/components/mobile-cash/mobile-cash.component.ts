import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateModalComponent } from '../shared/update-modal/update-modal.component';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-mobile-cash',
  standalone: true,
  imports: [CommonModule, FormsModule, UpdateModalComponent],
  templateUrl: './mobile-cash.component.html',
  styleUrl: './mobile-cash.component.scss'
})
export class MobileCashComponent implements OnInit {
  activeTab = 'enviar';
  selectedAmount = 100;
  minAmount = 100;
  maxAmount = 1500;
  showBeneficiaryInfo = false;
  description = 'Transferencia Efectivo Móvil';

  showUpdateModal = false;
  updateFeatures = [
    'Campo actualizado: Cambio de texto a "Número de teléfono del beneficiario"',
    'Icono informativo: Tooltip que recuerda mantener actualizado el número de teléfono'
  ];
  currentVersion: string;

  constructor(
    private router: Router,
    private versionService: VersionService
  ) {
    this.currentVersion = this.versionService.getCurrentVersion();
  }

  ngOnInit() {
    if (this.versionService.shouldShowUpdateModal('mobile-cash')) {
      this.showUpdateModal = true;
    }
  }

  onCloseUpdateModal() {
    this.showUpdateModal = false;
    this.versionService.markUpdateModalAsShown('mobile-cash');
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateSliderProgress(), 0);
  }

  onAmountChange() {
    this.updateSliderProgress();
  }

  private updateSliderProgress() {
    const progress = ((this.selectedAmount - this.minAmount) / (this.maxAmount - this.minAmount)) * 100;
    
    const sliderElement = document.querySelector('.amount-slider') as HTMLElement;
    if (sliderElement) {
      requestAnimationFrame(() => {
        sliderElement.style.setProperty('--progress', `${progress}%`);
      });
    }
  }

  onNavigateToTransfer() {
    this.router.navigate(['/transfer']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  formatCurrency(amount: number): string {
    return `Q ${amount.toLocaleString('es-GT', { minimumFractionDigits: 2 })}`;
  }

  onTransfer() {
    console.log('Transferir efectivo móvil:', this.selectedAmount);
  }

  onAutoSend() {
    console.log('Autoenvío seleccionado');
  }

  onAddBeneficiary() {
    console.log('Agregar beneficiario');
  }

  onEditAccount() {
    console.log('Editar cuenta');
  }
}
