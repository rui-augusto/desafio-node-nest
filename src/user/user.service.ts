import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export interface UserInterface{
    firstName: string,
    lastName: string,
    password: string,
    email: string,
}

export interface LoginInterface{
  email: string,
  password: string,
}

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(user: UserInterface): Promise<any> {
    const data = await this.findAll();
    // colocar low case no fn e ln /////////////////////////////////
    user.email = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@dreamlabs.com`;
    // verifica se já existe algum dado cadastrado
    if (data.length == 0){
      return this.usersRepository.save(this.usersRepository.create(user));
    }
    for(let i = 0; i < data.length; i++){
      const a = user.firstName == data[i].firstName && user.lastName == data[i].lastName && user.password == data[i].password;
      console.log(a);
      if(user.firstName == data[i].firstName && user.lastName == data[i].lastName){
        return false;
      }
      return this.usersRepository.save(this.usersRepository.create(user));
    }
  }

  async login(user: LoginInterface): Promise<any> {
    const data = await this.findAll();
    for(let i = 0; i < data.length; i++){
      if(user.email == data[i].email && user.password == data[i].password){
        return true;
      }
      return false;
    }
  }

  async update(id: number, user: UserInterface) {
    const updatedUser = await this.findOne(id);
    this.usersRepository.merge(updatedUser, user);
    return await this.usersRepository.save(updatedUser);
  }


  // new function for deleting an account
  async delete(id: number) {
    return await this.usersRepository.delete(id);
  }

  async findOne(id: number): Promise<User> {
    try{
      return await this.usersRepository.findOneBy({ id });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async remove(id: number): Promise<void> {
      await this.usersRepository.delete(id);
  }
}
