import { Module } from '@nestjs/common';
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}



// TODO:

// TODO: when a user is logging in,
// TODO: confer if the account is active

// TODO: create app.controller and app.service
// TODO: create string return with:
// * personal info
// * project info