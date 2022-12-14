import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Plato } from 'src/app/interfaces/plato.interface';
import { MenuService } from 'src/app/services/menu.service';
import { PlatosService } from 'src/app/services/platos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  formulario: FormGroup;
  formularioCurso: FormGroup;
  primeros: any;
  segundos: any;
  postres: any;
  menuId: number;
  menuses: any;


  constructor(
    private menuService: MenuService
  ) {
    this.formulario = new FormGroup({
      primero: new FormControl('', [
        Validators.required
      ]),
      segundo: new FormControl('', [
        Validators.required
      ]),
      postre: new FormControl('', [
        Validators.required
      ])
    })
    this.formularioCurso = new FormGroup({
      curso: new FormControl('', [
        Validators.required
      ]),
      fecha: new FormControl('', [
        Validators.required
      ])
    })
    this.primeros = [];
    this.segundos = [];
    this.postres = [];
    this.menuId = 0;
  }

  ngOnInit(): void {
    this.getByCategoria()
    this.getAllMenuses()
  }

  async getAllMenuses() {
    this.menuses = await this.menuService.getAllMenuses()
    console.log(this.menuses);
  }

  async getByCategoria() {
    this.primeros = await this.menuService.getByCategoria('primero')
    this.segundos = await this.menuService.getByCategoria('segundo')
    this.postres = await this.menuService.getByCategoria('postre')

    // console.log(this.primeros);
    // console.log(this.segundos);
    // console.log(this.postres);
  }

  async onSubmit() {

    const response = await this.menuService.nuevoMenu(this.formulario.value);
    console.log(response);
    this.menuId = response.insertId;
    Swal.fire(
      'Hecho',
      'Has creado correctamente el menú',
      'success'
    )
    this.formulario.reset()
    this.getAllMenuses()


  }

  async onSubmitCurso($event: any) {
    const asignarMenu = {
      ciclos_id: Number(this.formularioCurso.value.curso),
      menu_id: Number($event.submitter.id),
      fecha: this.formularioCurso.value.fecha
    }


    const menuAsignado = await this.menuService.asignarMenu(asignarMenu)
    console.log(menuAsignado);

    const curso = await this.menuService.getCicloById(asignarMenu.ciclos_id)
    Swal.fire(
      'Hecho',
      `Has asignado correctamente el menú al ${curso.nombre} `,
      'success'
    )
  }

  async borrarMenu($event: any) {
    try {
      $event.preventDefault()
      const menuBorrado = await this.menuService.deleteMenuById(($event.target.id))
      console.log(menuBorrado);
    } catch (error) {
      console.log(error);
    }

  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  };





}
