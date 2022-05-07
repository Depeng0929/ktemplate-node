import { resolve } from 'path';
import { PugAdapter } from '@nest-modules/mailer';

export default {
  useFactory: () => ({
    transport: {
      host: 'smtp.163.com',
      port: '465',
      auth: {
        user: '15365182986@163.com',
        pass: '',
      },
    },
    defaults: {
      form: '15365182986@163.com',
    },
    template: {
      dir: resolve(__dirname, '../templates/email'),
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
};
