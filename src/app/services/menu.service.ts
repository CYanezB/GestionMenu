import { HttpClient } from '@angular/common/http';
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
      this.HttpClient.get<Plato[]>(`${this.baseUrl}/platos/${categoria}`)
    );
  }




}
