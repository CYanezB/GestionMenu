import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Plato } from '../interfaces/plato.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl: string;

  constructor(
    private HttpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api'
  }

  getByCategoria(categoria: string) {
    return firstValueFrom(
      this.HttpClient.get<Plato[]>(`${this.baseUrl}/platos/cat/${categoria}`)
    );
  }

  nuevoMenu(pValues: {
    primero: number,
    segundo: number,
    postre: number
  }) {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/menus/new`, pValues)
    );
  }

  getAllMenuses() {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/menus`)
    );
  }

  asignarMenu(pValues: {
    ciclos_id: number,
    menu_id: number,
    fecha: Date
  }) {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/ciclos/assign`, pValues)
    );
  }

  getCicloById(ciclos_id: number) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/ciclos/${ciclos_id}`)
    );
  }

  deleteMenuById(menu_id: number) {
    return firstValueFrom(
      this.HttpClient.delete<any>(`${this.baseUrl}/menus/delete/${menu_id}`)
    );
  }

  getMenuSemanalBySemanaAndCicloId(pValues: {
    ano: number,
    semana: number,
    ciclo_id: number
  }) {
    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/usuarios/semana`, pValues)
    )
  }

  getMenuById(menu_id: number) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/menus/${menu_id}`)
    )
  }

  nuevoComentario(pValues: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!,
        'Content-Type': 'application/json'
      })
    }

    return firstValueFrom(
      this.HttpClient.post<any>(`${this.baseUrl}/comentarios/nuevo`, pValues, httpOptions)
    )
  }


}
