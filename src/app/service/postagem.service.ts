import { Observable } from 'rxjs';
import { Postagem } from './../model/Postagem';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  // Injeção de módulos e services
  constructor(
    private http: HttpClient
  ) { }

  // Autorização para usar os métodos quando o usuário faz o login
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  // Métodos HTTP de postagem implemetados do back-end
  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://fregunity.herokuapp.com/postagens', this.token)
  }

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://fregunity.herokuapp.com/postagens/${id}`, this.token)
  }

  getByTituloPostagem(titulo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`https://fregunity.herokuapp.com/postagens/titulo/${titulo}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://fregunity.herokuapp.com/postagens', postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>('https://fregunity.herokuapp.com/postagens', postagem, this.token)
  }

  deletePostagem(id: number) {
    return this.http.delete(`https://fregunity.herokuapp.com/postagens/${id}`, this.token)
  }
}
