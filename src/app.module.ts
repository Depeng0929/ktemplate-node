import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UserModule } from 'src/modules/user/user.module';
import { MailerModule } from '@nest-modules/mailer';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { StatusMonitorModule } from 'nest-status-monitor';
import StatusMonitorConfig from './config/statusMonitor';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    StatusMonitorModule.setUp(StatusMonitorConfig),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 选择控制的controller
  }
}
