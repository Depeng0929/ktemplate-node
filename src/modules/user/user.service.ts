import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUser } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/model/role';

@Injectable()
export class UserService {
  constructor(private readonly mailService: MailerService) {}

  fetch() {
    return 'fetch';
  }

  find(id: string) {
    return 'find';
  }

  create(user: CreateUser): User {
    return {
      name: 'kong',
      age: 12,
      role: 'admin',
      sex: 0,
    };
  }

  update(id: string, message: string) {
    return `update`;
  }

  remove(id: string) {
    return 'remove';
  }

  sendEmail() {
    this.mailService.sendMail({
      to: '602939412@qq.com',
      from: '15365182986@163.com',
      subject: '主题',
      template: 'welcome',
    });
  }
}
