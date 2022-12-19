import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;

  constructor(
    private HttpClient: HttpClient,
    private router: Router
  ) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  getAllUsuarios() {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/usuarios`)
    )
  }

  getByRole(role: string) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/usuarios/role/${role}`)
    )
  }

  filterByInput(input: string) {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/usuarios/filtro`, input)
    )
  }

  updateRole(pValues: any) {
    return firstValueFrom(
      this.HttpClient.put<any>(`${this.baseUrl}/usuarios/${pValues.id}`, pValues)
    )
  }

  deleteUser(usuario_id: number) {
    return firstValueFrom(
      this.HttpClient.delete<any>(`${this.baseUrl}/usuarios/${usuario_id}`)
    )
  }

  getUserById(usuario_id: number) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/usuarios/${usuario_id}`)
    )
  }

}
