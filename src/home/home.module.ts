import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { UserService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [UserService],
  // otherModule can import
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
