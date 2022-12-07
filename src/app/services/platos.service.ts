import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  baseUrl: string;

  constructor(
    private HttpClient: HttpClient
  ) {
    this.baseUrl = 'http://localhost:3000/'
  }






}
