import { Tema } from './../model/Tema';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  // Injeção de módulos e services
  constructor(
    private http: HttpClient
  ) { }

  // Autorização para usar os métodos quando o usuário faz o login
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  // Métodos HTTP do tema implemetados do back-end
  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://fregunity.herokuapp.com/temas', this.token)
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`https://fregunity.herokuapp.com/temas/${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://fregunity.herokuapp.com/temas', tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>('https://fregunity.herokuapp.com/temas', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://fregunity.herokuapp.com/temas/${id}`, this.token)
  }
}
