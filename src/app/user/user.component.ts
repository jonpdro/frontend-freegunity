import { AlertasService } from './../service/alertas.service';
import { environment } from 'src/environments/environment.prod';
import { User } from './../model/User';
import { AuthService } from './../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User()
  idUser: number
  editUser = environment.id

  key: 'data'
  reverse: true

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
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

}
