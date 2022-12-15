import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  semanaSeleccionada($event: any) {
    const arrSeleccionado = $event.target.value
    let semanaSeleccionada = arrSeleccionado.slice(-2)
    let anoSeleccionado = arrSeleccionado.slice(0, 4)
    console.log(anoSeleccionado);
    console.log(semanaSeleccionada);





  }


}
