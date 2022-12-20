import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const data = await this.findAll();
    user.email = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@dreamlabs.com`;
    // verify if exists a register
    if (data.length == 0){
      return this.usersRepository.save(this.usersRepository.create(user));
    }
    // validate an register
    for(let i = 0; i < data.length; i++){
      if(user.firstName == data[i].firstName && user.lastName == data[i].lastName){
        return false;
      }
      return this.usersRepository.save(this.usersRepository.create(user));
    }
  }

  async login(user: LoginUserDto): Promise<boolean> {
    const data = await this.findAll();
    for(let i = 0; i < data.length; i++){
      if(user.email == data[i].email && user.password == data[i].password && user.isActive){
        return true;
      }
      return false;
    }
  }

  async update(id: string, user: UpdateUserDto) {
    const updatedUser = await this.findOne(id);
    this.usersRepository.merge(updatedUser, user);
    return await this.usersRepository.save(updatedUser);
  }


  // new function for deleting an account
  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }

  async findOne(id: string): Promise<User> {
    try{
      return await this.usersRepository.findOneBy({ id });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async remove(id: string): Promise<void> {
      await this.usersRepository.delete(id);
  }
}
