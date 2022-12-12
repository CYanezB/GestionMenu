import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Plato } from '../interfaces/plato.interface';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  baseUrl: string;

  constructor(
    private HttpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/api'
  }



  nuevoPlato(pValues: {
    nombre: string,
    ingredientes: string[],
    alergenos: number[],
    categoria: string
  }) {
    return firstValueFrom(
      this.HttpClient.post<Plato>(`${this.baseUrl}/platos/new`, pValues)
    );
  }



}
