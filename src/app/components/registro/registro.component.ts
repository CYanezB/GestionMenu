import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      repitePassword: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
  }


  async onSubmit() {
    try {
      if (this.formulario.value.password !== this.formulario.value.repitePassword) {
        Swal.fire(
          'ERROR  ',
          'las contraseñas no coinciden',
          'error'
        )
      } else {

        const response = await this.registroService.registrarUsuario(this.formulario.value)
        console.log(response);
        Swal.fire(
          'Hecho',
          'Te has registrado correctamente',
          'success'
        )
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }





  }
}
