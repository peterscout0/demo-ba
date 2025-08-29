import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UpdateModalComponent } from '../shared/update-modal/update-modal.component';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UpdateModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showBalance = true;
  accountStatus = {
    class: 'active',
    color: '#1a1a1a',
    text: 'Activa'
  };

  showUpdateModal = false;
  updateFeatures = [
    'Ocultar/Mostrar saldo: Botón toggle para privacidad del saldo',
    'Copiar número de cuenta: Funcionalidad para copiar al portapapeles'
  ];
  currentVersion: string;

  constructor(
    private router: Router,
    private versionService: VersionService
  ) {
    this.currentVersion = this.versionService.getCurrentVersion();
  }

  ngOnInit() {
    if (this.versionService.shouldShowUpdateModal('home')) {
      this.showUpdateModal = true;
    }
  }

  onCloseUpdateModal() {
    this.showUpdateModal = false;
    this.versionService.markUpdateModalAsShown('home');
  }

  onNavigateToSearchServices() {
    this.router.navigate(['/search']);
  }

  onNavigateToTransfer() {
    this.router.navigate(['/transfer']);
  }

  onToggleBalance() {
    this.showBalance = !this.showBalance;
  }

  onCopyAccount() {
    const accountNumber = '30-2847163-8';
    this.copyAccountNumber(accountNumber);
  }

  private copyAccountNumber(accountNumber: string) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(accountNumber).then(() => {
        this.showCopyMessage('Número de cuenta copiado');
      }).catch(() => {
        this.fallbackCopyTextToClipboard(accountNumber);
      });
    } else {
      this.fallbackCopyTextToClipboard(accountNumber);
    }
  }

  private fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopyMessage('Número de cuenta copiado');
    } catch (err) {
      console.error('Error al copiar:', err);
      this.showCopyMessage('Error al copiar número');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private showCopyMessage(message: string) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
      position: fixed;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
      if (document.body.contains(messageElement)) {
        document.body.removeChild(messageElement);
      }
    }, 2000);
  }
}
