import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;

  constructor(
    private HttpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  login(pUsuario: any) {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/usuarios/login`, pUsuario)
    );
  }
}
