import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { PlatosFormComponent } from './components/platos-form/platos-form.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu/new', component: MenuFormComponent },
  { path: 'plato/new', component: PlatosFormComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
