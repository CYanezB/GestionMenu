import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PlatosService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-menu-diario',
  templateUrl: './menu-diario.component.html',
  styleUrls: ['./menu-diario.component.css']
})
export class MenuDiarioComponent implements OnInit {


  menuSeleccionado: any;
  menu: any;
  primero: any;
  segundo: any;
  postre: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService,
    private platoService: PlatosService
  ) {
    this.menuSeleccionado = 1
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.menuSeleccionado = Number(params['menu_id'])
      this.menu = await this.menuService.getMenuById(this.menuSeleccionado);
      console.log(this.menu);


      this.primero = await this.platoService.getById(this.menu.primero)
      this.segundo = await this.platoService.getById(this.menu.segundo)
      this.postre = await this.platoService.getById(this.menu.postre)
    });
  }

}
