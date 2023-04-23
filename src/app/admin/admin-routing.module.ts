import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRootComponent} from './components/root/admin-root.component';
import {AdminSlotsComponent} from './components/slots/admin-slots.component';
import {adminGuard} from './admin-guard';
import {AdminCardsComponent} from './components/cards/admin-cards.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRootComponent,
    canActivate: [adminGuard],
    children: [
      {path: 'slots', component: AdminSlotsComponent},
      {path: 'cards', component: AdminCardsComponent}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
