import { AlertasService } from './../../service/alertas.service';
import { AuthService } from './../../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Tema } from './../../model/Tema';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  // Instanciamento e criação de variáveis
  tema: Tema = new Tema()
  idTema: number

  // Injeção de módulos e services
  constructor(
    public authService: AuthService,
    private temaService: TemaService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private alert: AlertasService
  ) { }

  // Método do Angular que inicia primeiro todos os métodos dentro dele
  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

    this.authService.visitanteRota()
    this.idTema = this.actRoute.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  // Método para encontrar o tema pelo Id
  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  // Método para apagar o tema
  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      this.alert.showAlertSucess('Tema deletado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
