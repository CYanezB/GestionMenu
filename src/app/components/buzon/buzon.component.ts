import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BuzonService } from 'src/app/services/buzon.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as dayjs from 'dayjs'
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.css']
})
export class BuzonComponent implements OnInit {

  filtro: FormGroup;
  comentarios: any;
  allMenus: any;
  usuarios: any;

  constructor(
    private buzonService: BuzonService,
    private usuariosService: UsuariosService,
    private menuService: MenuService
  ) {
    this.filtro = new FormGroup({
      inputNombre: new FormControl('', [])
    })
    this.comentarios = []
  }

  ngOnInit(): void {
    this.getAllComentarios()
    this.getAllMenuses()
  }

  async getAllComentarios() {
    try {
      this.comentarios = await this.buzonService.getAllComentarios()
      console.log(this.comentarios);


    } catch (error) {
      console.log(error);
    }
  }

  async getAllMenuses() {
    this.allMenus = await this.menuService.getAllMenuses()
  }

  async filtrarPorNombre() {
    this.comentarios = await this.buzonService.getAllComentarios(this.filtro.value.inputNombre)

  }

  async filtrarPorMenu($event: any) {
    this.comentarios = await this.buzonService.getComentarioByMenuId($event.target.value);

  }

  async deleteComentario(id: number) {
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
        let response = await this.buzonService.deleteComentario(id)
        console.log(response);
        this.getAllComentarios()
        Swal.fire(
          'Eliminado',
          'El comentario ha sido eliminado',
          'success'
        )
      }
    })


  }
}
