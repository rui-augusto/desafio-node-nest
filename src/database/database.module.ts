import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule.forRoot()], // load .env infos
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}