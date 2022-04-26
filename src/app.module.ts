import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from 'src/home/home.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware) // other middleware such as auth(),logger...
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
