import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => this.users = data,
      error => console.error('Erro ao carregar usuários', error)
    );
  }

  addUser(): void {
    const newUser: User = {
      nome: 'Novo Usuário',
      email: 'novo@usuario.com',
      senha: 'senha123',
      data_nasc: '1990-01-01'
    };
    this.userService.createUser(newUser).subscribe(
      response => this.loadUsers(),
      error => console.error('Erro ao adicionar usuário', error)
    );
  }
}
