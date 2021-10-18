import { User } from './../model/User';
import { AuthService } from './../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService } from './../service/alertas.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  user: User = new User()
  idUser: number

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

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }
}
