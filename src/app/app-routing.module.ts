import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./module/home/home.module').then(home => home.HomeModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModuleRoutingModule { }
