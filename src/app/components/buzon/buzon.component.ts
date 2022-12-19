import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BuzonService } from 'src/app/services/buzon.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as dayjs from 'dayjs'
import { MenuService } from 'src/app/services/menu.service';

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

  async deleteComentario($event: any) {
    let response = await this.buzonService.deleteComentario($event.target.value);
    this.getAllComentarios()

    console.log($event.target.value);

  }
}
