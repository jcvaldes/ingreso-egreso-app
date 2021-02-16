import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItems = createAction(
  '[IngresoEgreso] setItems',
  props<{items: IngresoEgreso[]}>()
);
export const unSetItems = createAction('[Ingreso Egreso] unSetItems');
