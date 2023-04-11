import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRootComponent} from './components/root/admin-root.component';
import {AdminSlotsComponent} from './components/slots/admin-slots.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRootComponent,
    children: [
      {path: 'slots', component: AdminSlotsComponent}
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
