import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  Usuarios: any;
  filtro: FormGroup;
  updateRole: FormGroup;

  constructor(
    private usuariosService: UsuariosService
  ) {
    this.Usuarios = [];
    this.filtro = new FormGroup({
      input: new FormControl('', [])
    })
    this.updateRole = new FormGroup({
      role: new FormControl('', [])
    })
  }

  ngOnInit(): void {
    this.getAllUsuarios()
  }


  async getAllUsuarios() {
    try {
      this.Usuarios = await this.usuariosService.getAllUsuarios()

    } catch (error) {
      console.log(error);
    }
  }

  async filtrarRol($event: any) {
    if ($event.target.value !== 'todos') {
      try {
        this.Usuarios = await this.usuariosService.getByRole($event.target.value)


      } catch (error) {
        console.log(error);
      }
    } else {
      this.getAllUsuarios()
    }
  }


  async filtrarPorNombre() {
    this.Usuarios = await this.usuariosService.filterByInput(this.filtro.value)
  }

  async onClick(usuario_id: any, selectRole: any) {
    try {
      let pValues = {
        id: usuario_id,
        role: selectRole.value
      }
      let response = this.usuariosService.updateRole(pValues);
      console.log(response);
      Swal.fire(
        'Hecho',
        'Has actualizado los permisos correctamente a este usuario',
        'success'
      )
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUsuario(usuario_id: any) {

    try {
      Swal.fire({
        title: '¿Seguro?',
        text: "Esta acción no puede revertirse",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2d856f',
        cancelButtonColor: 'tomato',
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await this.usuariosService.deleteUser(usuario_id)
          console.log(response);
          Swal.fire(
            'Hecho',
            'Has eliminado correctamente a este usuario',
            'success'
          )
          this.getAllUsuarios()

        }
      })
    } catch (error) {
      console.log(error);

    }
  }
}
