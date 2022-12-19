import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuzonService {

  baseUrl: string
  constructor(
    private HttpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  getAllComentarios(input: string = '') {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/comentarios`, { input })
    );
  }

  getComentarioByUserId(user_id: number) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/comentarios/usuario/${user_id}`)
    )
  }
  getComentarioByMenuId(menu_id: number) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/comentarios/menu/${menu_id}`)
    )
  }
  deleteComentario(comentario_id: number) {
    return firstValueFrom(
      this.HttpClient.delete<any>(`${this.baseUrl}/comentarios/${comentario_id}`)
    )
  }
}
