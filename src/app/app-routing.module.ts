import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { LoginComponent } from './components/login/login.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { PlatosFormComponent } from './components/platos-form/platos-form.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu/new', component: MenuFormComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'plato/new', component: PlatosFormComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'calendario', component: CalendarioComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
