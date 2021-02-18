import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
  items: IngresoEgreso[];
}
// lo hago por que al hacer el store lazy load pierdo el state inggresosEgregoos del AppState
export interface AppStateWithIngreso extends State {
  ingresosEgresos: State;
}
export const initialState: State = {
  items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [ ...items ] })),
  on(unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
