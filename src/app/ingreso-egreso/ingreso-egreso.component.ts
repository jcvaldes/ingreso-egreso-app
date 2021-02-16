import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  tipo: string = 'ingreso';
  ingresoForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        this.store.dispatch(ui.stopLoading());
        this.ingresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

}
