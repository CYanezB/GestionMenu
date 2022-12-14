import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  baseUrl: string;
  decoded: any;

  constructor(
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  registrarUsuario(pUsuario: any) {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/usuarios/registro`, pUsuario)
    );
  }
  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  }
}
