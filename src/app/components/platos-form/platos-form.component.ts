import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-platos-form',
  templateUrl: './platos-form.component.html',
  styleUrls: ['./platos-form.component.css']
})
export class PlatosFormComponent implements OnInit {

  formulario: FormGroup;


  constructor() {
    this.formulario = new FormGroup({

    })
  }

  ngOnInit(): void {
  }


  onSubmit() {

    console.log(this.formulario.value)

  }
}
