import { AuthService } from './../../service/auth.service';
import { Postagem } from './../../model/Postagem';
import { Tema } from './../../model/Tema';
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from './../../service/postagem.service';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  // Instanciamento e criação de variáveis
  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()

  listarTemas: Tema[]
  idTema: number

  // Injeção de módulos e services
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  // Método do Angular que inicia primeiro todos os métodos dentro dele
  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.authService.visitanteRota()
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  // Métodos para encontrar a postagens e temas
  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listarTemas = resp
    })
  }

  // Método para editar a postagem
  atualizar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/home'])
    })
  }
}
