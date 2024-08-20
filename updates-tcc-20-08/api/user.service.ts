import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/usuarios';  // Substitua pela URL da sua API PHP

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Criar um novo usuário
  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, this.httpOptions);
  }

  // Obter todos os usuários
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Obter um usuário por ID
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  // Atualizar um usuário
  updateUser(id: number, user: User): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, user, this.httpOptions);
  }

  // Excluir um usuário
  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }
}
