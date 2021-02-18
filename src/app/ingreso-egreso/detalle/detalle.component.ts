import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs: Subscription = new Subscription();
  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppStateWithIngreso>
  ) { }
  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => this.ingresosEgresos = items);
  }
  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
  }
  borrar(uid) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(() => {
      Swal.fire('Borrado', 'Item borrado', 'success');
    }).catch((err) => {
      Swal.fire('Error', err.message, 'error');
    });
  }

}
