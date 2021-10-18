import { AuthService } from './../../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Tema } from './../../model/Tema';
import { TemaService } from './../../service/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  // Instanciamento e criação de variáveis
  tema: Tema = new Tema()

  // Injeção de módulos e services
  constructor(
    public authService: AuthService,
    private temaService: TemaService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  // Método do Angular que inicia primeiro todos os métodos dentro dele
  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.authService.visitanteRota()
    let id = this.actRoute.snapshot.params['id']
    this.findByIdTema(id)
  }

  // Método para encontrar o tema pelo ID
  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  // Método para editar o tema
  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
