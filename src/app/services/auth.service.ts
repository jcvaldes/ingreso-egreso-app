import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import * as authActions from '../auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
// import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription = new Subscription();
  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  // nos avisa cualquier cambio con la autenticacion, cuando tengamos el usuario o cierro sesion
  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      if ( fuser ) {
        // existe
        this.userSubscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {
            console.log({firestoreUser});
            const user = Usuario.fromFirebase( firestoreUser );
            this.store.dispatch( authActions.setUser({ user }) );
          })

      } else {
        // no existe
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
      }
    });
  }
  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`)
          .set({ ...newUser });
        // fb no acepta instancias de clases y hay que desestructurar
      });
  }
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
