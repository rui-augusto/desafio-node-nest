import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from "express";
import { UserService } from './user.service';

interface UserDto{
    firstName: string,
    lastName: string,
    password: string,
    email: string,
}

interface LoginDto{
    email: string,
    password: string,
}

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async index() {
        return await this.userService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number) {
        return await this.userService.findOne(id);
    }

    @Post("login")
    async login(@Body() loginUserDto: LoginDto){
        const user = await this.userService.login(loginUserDto);
        
        if (user){
            return "successful login!";
        }
        return "insuccessful login!";
    }

    @Post("register")
    async create(@Body() createUserDto: UserDto){
        const user = await this.userService.create(createUserDto);
        console.log(user);
        if (!user){
            return "error: data is invalid";
        }
        return "data of user created successfully!";
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() body: any) {
        const updatedUser: any = await this.userService.update(id, body);
        console.log(updatedUser);
        return "user updated!";
    }

    @Delete("remove/:id")
    remove(@Param('id') id: number) {
        return this.userService.remove(id)
    }

}
 
