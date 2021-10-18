import { AlertasService } from './../service/alertas.service';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import { User } from '../model/User';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // Instanciamento e criação de variáveis
  userLogin: UserLogin = new UserLogin()
  user: User = new User()

  confirmarSenha: string
  tipoUsuario: string

  foto = new Image(100, 100)

  // Injeção de módulos e services
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasService
  ) { }

  // Método do Angular que inicia primeiro todos os métodos dentro dele
  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }
  }

  // Método para chamar o botão entrar da página inicial
  clickLogin() {
    document.getElementById('btnLogin')?.click()
  }

  // Método para fazer login
  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.id = this.userLogin.id
      environment.nome = this.userLogin.nome
      environment.username = this.userLogin.username
      environment.foto = this.userLogin.foto
      environment.token = this.userLogin.token
      environment.email = this.userLogin.email
      environment.admin = this.userLogin.admin

      this.router.navigate(['/feed'])
    }, erro => {
      if (erro.status == 500) {
        this.alert.showAlertWarning('Usuário ou senha estão incorretos!')
      }
    })
  }

  entrarVisitante() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {

      environment.id = this.userLogin.id = 4
      environment.nome = this.userLogin.nome = 'Visitante'
      environment.username = this.userLogin.username= 'visitante'
      environment.foto = this.userLogin.foto = ''
      environment.token = this.userLogin.token
      environment.email = this.userLogin.email = 'visitante@email.com'
      environment.admin = this.userLogin.admin = 'guest'

      this.userLogin = resp

      this.router.navigate(['/feed'])
    })
  }

  // Métodos para cadastrar usuários
  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    if (this.tipoUsuario == "admin" || this.tipoUsuario == "root") {
      this.user.admin = "adm"
    } else {
      this.user.admin = "user"
    }

    if (this.user.senha != this.confirmarSenha) {
      this.alert.showAlertDanger('As senhas estão incorretas!')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/inicio'])
        this.alert.showAlertSucess('O usuário foi cadastrado com sucesso!')
        this.clickLogin() // Chamando o método de clicar no botão entrar assim que cadastrar
      })
    }
  }
}
