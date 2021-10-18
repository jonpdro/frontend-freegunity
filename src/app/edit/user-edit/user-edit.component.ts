import { AlertasService } from './../../service/alertas.service';
import { environment } from './../../../environments/environment.prod';
import { User } from './../../model/User';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number

  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

    this.authService.visitanteRota()
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  icon() {
    let pic: string = 'assets/img/user-default.jpg'

    if (this.user.foto == '') {
      environment.foto = pic
    } else {
      environment.foto = this.user.foto
    }

    return environment.foto
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  atualizar() {
    if (this.user.senha != this.confirmarSenha) {
      this.alert.showAlertWarning('As senhas estão incorretas!')
    } else if (this.user.email == '') {
      this.alert.showAlertWarning('O campo "email" não pode ficar vazio.')
    } else if (this.user.nome == '') {
      this.alert.showAlertWarning('O campo "nome" não pode ficar vazio.')
    } else if (this.user.username == '') {
      this.alert.showAlertWarning('O campo "usuário" não pode ficar vazio.')
    } else {
      this.authService.atualizar(this.user).subscribe((resp: User) => {
        this.user = resp

        this.alert.showAlertSucess('O usuário foi atualizado com sucesso!')

        this.router.navigate(['/user', this.idUser])
      })
    }
  }
}
