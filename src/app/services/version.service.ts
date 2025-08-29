import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private currentVersion = '1.10.4';
  private storageKey = 'bam-app-version';

  constructor() {}

  shouldShowUpdateModal(viewName: string): boolean {
    const lastShownVersion = localStorage.getItem(`${this.storageKey}-${viewName}`);
    return lastShownVersion !== this.currentVersion;
  }

  markUpdateModalAsShown(viewName: string): void {
    localStorage.setItem(`${this.storageKey}-${viewName}`, this.currentVersion);
  }

  getCurrentVersion(): string {
    return this.currentVersion;
  }
}
