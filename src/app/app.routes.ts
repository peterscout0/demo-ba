import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchServicesComponent } from './components/search-services/search-services.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { MobileCashComponent } from './components/mobile-cash/mobile-cash.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchServicesComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'mobile-cash', component: MobileCashComponent },
  { path: '**', redirectTo: '' }
];
