import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PlatosService } from 'src/app/services/platos.service';
import Swal from 'sweetalert2';

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
  comentario: FormGroup<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService,
    private platoService: PlatosService,
    private router: Router
  ) {
    this.menuSeleccionado = 1
    this.comentario = new FormGroup({
      mensaje: new FormControl('', [
        Validators.required
      ])
    })
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.menuSeleccionado = Number(params['menu_id'])
      this.menu = await this.menuService.getMenuById(this.menuSeleccionado);


      this.primero = await this.platoService.getById(this.menu.primero)
      console.log(this.primero.alergenos);

      this.segundo = await this.platoService.getById(this.menu.segundo)
      console.log(this.segundo);

      this.postre = await this.platoService.getById(this.menu.postre)
      console.log(this.postre);

    });
  }

  async onSubmit() {
    try {
      let pValues = {
        mensaje: this.comentario.value.mensaje,
        menu_id: this.menu.id
      }
      let response = await this.menuService.nuevoComentario(pValues)
      console.log(response);
      Swal.fire(
        'Hecho',
        'Tu comentario se ha guardado correctamente, nos pondremos en contacto contigo de ser necesario',
        'success'
      )
      this.comentario.reset()
    } catch (error) {
      console.log(error);

    }
  }

  clickVolver() {
    this.router.navigate(['/home'])
  }

}
