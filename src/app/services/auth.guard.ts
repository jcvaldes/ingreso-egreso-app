import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  canLoad():  Observable<boolean>  {

    // dispara la subscripcion cuando se carga

    return this.authService.isAuth()
    .pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigate(['/login']);
        }
      }),
      take(1) // camcela la subscipcion cuando ya resuelva la primera vez
    );
  }
  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        // tslint:disable-next-line: max-line-length
        /* Realiza un efecto secundario para cada emisión en la fuente Observable y devuelve un Observable que sea idéntico a la fuente. En otras palabras, después de una solicitud de API exitosa, el operador tap() hará la función que desee que realice con la respuesta.
        */
        tap(estado => {

          if (!estado) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
