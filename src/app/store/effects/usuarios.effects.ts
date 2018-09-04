import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuariosActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

    constructor( private actions$: Actions, public usuarioService: UsuarioService) {}

    // Estoy escucha la accion CARGAR_USUARIOS
    @Effect()
    cargarUsuarios$ = this.actions$.ofType( usuariosActions.CARGAR_USUARIOS)
                .pipe(
                    switchMap( () => {
                        return this.usuarioService.getUsers()
                                .pipe(
                                    map( users => new usuariosActions.CargarUsuariosSuccess(users)),
                                    catchError( (error) => of(new usuariosActions.CargarUsuariosFail(error)))
                                );
                    })
                );

}
