import { AlertasService } from './../service/alertas.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  idUser = environment.id

  constructor(
    public authService: AuthService,
    private router: Router,
    private alert: AlertasService
  ) { }

  ngOnInit() {
  }

  sair() {
    this.router.navigate(['/inicio'])
    environment.id = 0
    environment.nome = ''
    environment.username = ''
    environment.token = ''
    environment.email = ''
    environment.admin = ''
    environment.foto = ''
    this.alert.showAlertSucess('Sua sessão foi encerrada. Volte sempre!')
  }

}
