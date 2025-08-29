import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UpdateModalComponent } from '../shared/update-modal/update-modal.component';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-search-services',
  standalone: true,
  imports: [CommonModule, UpdateModalComponent],
  templateUrl: './search-services.component.html',
  styleUrl: './search-services.component.scss'
})
export class SearchServicesComponent implements OnInit {
  showSearchAlert = false;
  
  showUpdateModal = false;
  updateFeatures = [
    'Mensaje de servicio no encontrado: Guía al usuario hacia "Pagar otro servicio" cuando no encuentra resultados'
  ];
  currentVersion: string;

  constructor(
    private router: Router,
    private versionService: VersionService
  ) {
    this.currentVersion = this.versionService.getCurrentVersion();
  }

  ngOnInit() {
    if (this.versionService.shouldShowUpdateModal('search-services')) {
      this.showUpdateModal = true;
    }
  }

  onCloseUpdateModal() {
    this.showUpdateModal = false;
    this.versionService.markUpdateModalAsShown('search-services');
  }

  onNavigateToHome() {
    console.log('Button clicked - Navigating to home from search services'); 
    try {
      this.router.navigate(['/home']).then(() => {
        console.log('Navigation to home successful');
      }).catch((error) => {
        console.error('Navigation failed:', error);
      });
    } catch (error) {
      console.error('Router navigate error:', error);
    }
  }

  onKeyboardNavigateToHome(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onNavigateToHome();
    }
  }
  
  onSearchFocus() {
    this.showSearchAlert = false;
  }
  
  onSearchBlur() {
  }
  
  onSearchInput(event: any) {
    const searchValue = event.target.value.trim();
    if (searchValue.length > 0) {
      this.showSearchAlert = true;
    } else {
      this.showSearchAlert = false;
    }
  }
}
