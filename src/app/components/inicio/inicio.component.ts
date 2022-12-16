import { Component, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio.service';
import { MenuService } from 'src/app/services/menu.service';
import * as dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
import * as es from 'dayjs/locale/es'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'
import { Router } from '@angular/router';
dayjs.locale(es)
dayjs.extend(weekOfYear)
dayjs.extend(advancedFormat)




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ciclo: any;
  menuSemanal: any;
  dias: string[];
  constructor(
    private inicioService: InicioService,
    private menuService: MenuService,
    private router: Router
  ) {
    this.ciclo = 1;
    this.dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  }

  async ngOnInit() {
    let semanaActual = parseInt(dayjs().format('w'))
    let anoActual = parseInt(dayjs().format('YYYY'))
    // console.log(semanaActual - 1);
    // console.log(anoActual);
    let pValues = {
      ano: anoActual,
      semana: semanaActual - 1,
      ciclo_id: this.ciclo
    }

    this.menuSemanal = await this.menuService.getMenuSemanalBySemanaAndCicloId(pValues)
    // console.log(this.menuSemanal);

  }

  cicloSeleccionado($event: any) {
    this.ciclo = $event.target.value
  }

  async semanaSeleccionada($event: any) {
    const arrSeleccionado = $event.target.value
    let semanaSeleccionada = arrSeleccionado.slice(-2)
    let anoSeleccionado = arrSeleccionado.slice(0, 4)
    // console.log(anoSeleccionado);
    // console.log(semanaSeleccionada);
    let pValues = {
      ano: anoSeleccionado,
      semana: semanaSeleccionada,
      ciclo_id: this.ciclo
    }
    this.menuSemanal = await this.menuService.getMenuSemanalBySemanaAndCicloId(pValues)
  }



}
