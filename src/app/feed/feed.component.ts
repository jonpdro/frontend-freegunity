import { Postagem } from './../model/Postagem';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { Tema } from './../model/Tema';
import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { environment } from 'src/environments/environment.prod';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  user: User = new User()
  foto = environment.foto
  nome = environment.nome
  idUser = environment.id

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema
  listaTemas: Tema[]
  idTema: number

  key = 'data'
  reverse = true

  // Injeção de módulos e services
  constructor(
    public authService: AuthService,
    private router: Router,
    private alert: AlertasService,
    private temaService: TemaService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

    this.findByIdTema()
    this.getAllPostagens()
    this.getAllTemas()
    this.findByIdUser(this.idUser)
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.user = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alert.showAlertSucess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
