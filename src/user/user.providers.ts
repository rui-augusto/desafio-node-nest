// REVER SOBRE PROVIDER.TS
// conexão a tabela de usuarios do banco de dados
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DB_CONNECTION'],
  },
];