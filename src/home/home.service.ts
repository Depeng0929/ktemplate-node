import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { User } from 'src/home/interface/user.interface';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(private httpService: HttpService) {}

  create(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  findByProxy(): Observable<AxiosResponse<User[]>> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(map((res) => res.data));
  }
}
