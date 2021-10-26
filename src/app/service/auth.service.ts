import { User } from './../model/User';
import { AlertasService } from './alertas.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Injeção de módulos e services
  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertasService
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  // Métodos HTTP de logar e cadastrar implemetados do back-end
  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://fregunity.herokuapp.com/usuarios/entrar', userLogin)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://fregunity.herokuapp.com/usuarios/cadastrar', user)
  }

  atualizar(user: User): Observable<User> {
    return this.http.put<User>('https://fregunity.herokuapp.com/usuarios/atualizar', user, this.token)
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://fregunity.herokuapp.com/usuarios/${id}`, this.token)
  }

  // Método para ativar certos componentes quando estiver logado
  logado() {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }

  // Permissão de admin no menu
  adm() {
    let ok: boolean = true

    if (environment.admin != 'adm') {
      ok = false
    }

    return ok
  }

  // Modo visitante
  visitante() {
    let ok: boolean = false

    if (environment.admin != 'guest') {
      ok = true
    }

    return ok
  }

  // Privar o visitante das rotas
  visitanteRota() {
    let rota: string = '/feed'

    if (environment.id == 4) {
      if (this.router.url != rota) {
        this.alert.showAlertWarning('Você precisa fazer login ou se cadastrar para acessar essa rota!')
        this.router.navigate(['/feed'])
      }
    }
  }
}
