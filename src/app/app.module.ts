import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatosFormComponent } from './components/platos-form/platos-form.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MenuDiarioComponent } from './components/menu-diario/menu-diario.component';
import { BuzonComponent } from './components/buzon/buzon.component';


@NgModule({
  declarations: [
    AppComponent,
    PlatosFormComponent,
    MenuFormComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    UsuariosComponent,
    MenuDiarioComponent,
    BuzonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
