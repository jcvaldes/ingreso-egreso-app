import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class IngresoEgreso {
  constructor(
    public descripcion: string,
    public monto: number,
    public tipo: string,
    public uid?: string,
  ) { }
}
