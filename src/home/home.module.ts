import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { UserService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [UserService],
  // otherModule can import
  exports: [UserService],
})
export class UserModule {}
