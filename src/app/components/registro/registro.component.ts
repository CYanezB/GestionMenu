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
  ciclosSeleccionados: number[]

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

    this.ciclosSeleccionados = []
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
        let pValues = {
          nombre: this.formulario.value.nombre,
          email: this.formulario.value.email,
          ciclos_id: this.ciclosSeleccionados,
          password: this.formulario.value.password
        }
        const response = await this.registroService.registrarUsuario(pValues)
        console.log(response);
        Swal.fire(
          'Hecho',
          'Te has registrado correctamente',
          'success'
        )
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  cicloSeleccionado(ciclo_id: number) {
    if (this.ciclosSeleccionados.includes(ciclo_id)) {
      this.ciclosSeleccionados = this.ciclosSeleccionados.filter((item) => item != ciclo_id)
    } else {
      this.ciclosSeleccionados.push(ciclo_id)
    }

  };
}
