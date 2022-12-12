import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  formulario: FormGroup;
  primeros: string[];
  segundos: string[];
  postres: string[];

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
    this.primeros = [];
    this.segundos = [];
    this.postres = [];
  }

  ngOnInit(): void {
    this.getByCategoria()
  }


  async getByCategoria() {
    let arrPrimeros = await this.menuService.getByCategoria('primero')

    for (let plato of arrPrimeros) {
      this.primeros.push(plato.nombre!)
    }

    let arrSegundos = await this.menuService.getByCategoria('segundo')

    for (let plato of arrSegundos) {
      this.segundos.push(plato.nombre!)
    }

    let arrPostres = await this.menuService.getByCategoria('postre')

    for (let plato of arrPostres) {
      this.postres.push(plato.nombre!)
    }
    // console.log(this.primeros);
    // console.log(this.segundos);
    // console.log(this.postres);
  }

  onSubmit() {
    console.log(this.formulario.value)
  }


}
