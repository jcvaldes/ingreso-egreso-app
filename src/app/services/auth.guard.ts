import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router

  ) { }
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
