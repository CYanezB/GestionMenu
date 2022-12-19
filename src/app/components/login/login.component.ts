import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }
  ngOnInit(): void {
  }
  async onSubmit() {
    try {
      const response = await this.loginService.login(this.formulario.value)
      console.log(response)

      if (response.success) {
        Swal.fire(
          'Login completo',
          'Has iniciado sesión con éxito',
          'success'
        )
        localStorage.setItem('token', response.token)
      } else {
        Swal.fire(
          'ERROR  ',
          'Email y/o contraseña incorrecto',
          'error'
        )
      }
    } catch (error) {
      console.log(error);

    }
    this.formulario.reset()
  }

  navigateRegistro() {
    this.router.navigate(['/registro'])
  }
}