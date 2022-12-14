import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from './services/registro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    public registroService: RegistroService
  ) { }

  onLogOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
