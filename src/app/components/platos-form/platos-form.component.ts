
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plato } from 'src/app/interfaces/plato.interface';
import { MenuService } from 'src/app/services/menu.service';
import { PlatosService } from 'src/app/services/platos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-platos-form',
  templateUrl: './platos-form.component.html',
  styleUrls: ['./platos-form.component.css']
})
export class PlatosFormComponent implements OnInit {


  formulario: FormGroup;
  @ViewChild('inputIngredientes') inputIngredientes!: ElementRef;

  ingredientes: string[];
  alergenos: string[];
  alergenosSeleccionados: number[];
  botonIngredientes: string;
  allPlatos: any;
  allMenuses: any;
  menu: any;
  plato: any;

  constructor(
    private PlatosService: PlatosService,
    private MenuService: MenuService,
    private router: Router
  ) {
    this.alergenos = ['Gluten', 'Crustáceos', 'Huevos', 'Pescado', 'Cacahuetes', 'Soja', 'Lácteos', 'Frutos con cáscara', 'Apio', 'Mostaza', 'Sésamo', 'Sulfitos', 'Altramuces', 'Moluscos']
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      categoria: new FormControl('', [
        Validators.required
      ])
    })
    this.ingredientes = []
    this.alergenosSeleccionados = []
    this.botonIngredientes = '';
    this.menu = []
    this.plato = []
  }

  ngOnInit(): void {
    this.getAll()
  }

  async getAll() {
    try {
      this.allPlatos = await this.PlatosService.getAll()
      for (let p of this.allPlatos) {
        const response = await this.PlatosService.getById(p.id)
        this.plato.push(response)
      }
      console.log(this.plato);

    } catch (error) {
      console.log(error);
    }
  }

  async getAllMenuses() {
    try {
      this.allMenuses = await this.MenuService.getAllMenuses()

      for (let m of this.allMenuses) {

        let p = await this.PlatosService.getById(m.primero)
        let s = await this.PlatosService.getById(m.segundo)
        let pos = await this.PlatosService.getById(m.postre)
        let result = {
          primero: p,
          segundo: s,
          postre: pos
        }
        this.menu.push(result)
      }
    } catch (error) {
      console.log(error);
    }
  }


  async onSubmit() {
    try {
      this.formulario.value.ingredientes = this.ingredientes;
      this.formulario.value.alergenos = this.alergenosSeleccionados;
      const pValues = {
        nombre: this.formulario.value.nombre,
        ingredientes: this.formulario.value.ingredientes,
        alergenos: this.formulario.value.alergenos,
        categoria: this.formulario.value.categoria
      }
      const response = await this.PlatosService.nuevoPlato(pValues);
      console.log(response);


      Swal.fire(
        'Hecho',
        'Has añadido el plato correctamente',
        'success'
      )



    } catch (error) {
      console.log(error);

      Swal.fire(
        'ERROR  ',
        'You clicked the button!',
        'error'
      )
    }
    setTimeout(() => {
      document.location.reload();
    }, 3000);
  };


  nuevoIngrediente($event: any) {
    $event.preventDefault()
    if (this.inputIngredientes.nativeElement.value !== '') {
      if (!this.ingredientes.includes(this.inputIngredientes.nativeElement.value)) {
        this.botonIngredientes = ''
        this.ingredientes.push(this.inputIngredientes.nativeElement.value)
      } else {
        this.botonIngredientes = 'Ya has introducido este ingrediente'
      }
    } else {
      this.botonIngredientes = 'Debes introducir algún ingrediente'
    }
    this.inputIngredientes.nativeElement.value = ''
  };

  seleccionAlergenos($event: any) {
    const value = Number($event.target.value);
    if (this.alergenosSeleccionados.includes(value)) {
      this.alergenosSeleccionados = this.alergenosSeleccionados.filter((item) => item != value)
    } else {
      this.alergenosSeleccionados.push(value)
    }
  };

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  };


  borrarIngrediente($event: any) {
    this.ingredientes.splice($event.target.id, 1);

    // this.ingredientes.splice($event.target.index, 1)
  }



}
