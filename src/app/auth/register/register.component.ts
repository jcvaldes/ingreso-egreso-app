import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
      console.log('cargando subs');
    });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: err.message
        });
      });
  }
}
