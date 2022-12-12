
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  alergenosSeleccionados: string[];
  botonIngredientes: string;

  constructor(
    private PlatosService: PlatosService
  ) {
    this.alergenos = ['Huevos', 'Frutos secos', 'Crustáceos', 'Lácteos', 'Gluten', 'Pescado', 'Cacahuetes', 'Soja', 'Apio', 'Mostaza', 'Sésamo', 'Sulfitos', 'Altramuces', 'Moluscos']
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
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.formulario.value.ingredientes = this.ingredientes;
    this.formulario.value.alergenos = this.alergenosSeleccionados;
    console.log(this.formulario.value);
    Swal.fire(
      'Hecho',
      'Has añadido el plato correctamente',
      'success'
    )
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
  };

  seleccionAlergenos($event: any) {
    const value = $event.target.value;
    if (this.alergenosSeleccionados.includes(value)) {
      this.alergenosSeleccionados = this.alergenosSeleccionados.filter((item) => item != value)
    } else {
      this.alergenosSeleccionados.push(value)
    }
  };

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  };






}
