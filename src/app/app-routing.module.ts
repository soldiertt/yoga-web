import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicModule} from './public/public.module';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public'
  }
];
@NgModule({
  imports: [
    PublicModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
