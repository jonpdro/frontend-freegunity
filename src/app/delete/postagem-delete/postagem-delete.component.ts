import { AuthService } from './../../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from './../../model/Postagem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  // Instanciamento e criação de variáveis
  postagem: Postagem = new Postagem()
  idPost: number

  // Injeção de módulos e services
  constructor(
    public authService: AuthService,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Método do Angular que inicia primeiro todos os métodos dentro dele
  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.authService.visitanteRota()
    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  // Método para encontrar postagem pelo Id
  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  // Método para apagar a postagem
  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/home'])
    })
  }
}
