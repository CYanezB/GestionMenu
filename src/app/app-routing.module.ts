import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuzonComponent } from './components/buzon/buzon.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { MenuDiarioComponent } from './components/menu-diario/menu-diario.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { PlatosFormComponent } from './components/platos-form/platos-form.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'home/dia/:menu_id', component: MenuDiarioComponent },
  { path: 'menu/new', component: MenuFormComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'plato/new', component: PlatosFormComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'buzon', component: BuzonComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
