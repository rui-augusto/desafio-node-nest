import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller("account") // rota alterada para o padrão solicitado
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
    async login(@Body() loginUserDto: LoginUserDto){
        const user = await this.userService.login(loginUserDto);
        if (user){
            return "successful login!";
        }
        return "insuccessful login!";
    }

    @Post("register")
    async create(@Body() createUserDto: CreateUserDto){
        const user = await this.userService.create(createUserDto);
        console.log(user);
        if (!user){
            return "error: data is invalid";
        }
        return "user registered";
    }

    @Put(":id")
    async update(@Param('id') id: number, @Body() body: any) {
        const updatedUser: any = await this.userService.update(id, body);
        console.log(updatedUser);
        return `user ${id} updated`;
    }

    @Delete("remove/:id")
    async remove(@Param('id') id: number) {
        const user = await this.userService.findOne(id);
        await this.userService.remove(id);
        if (!user) {
            return "error: verify the id number and try again";
        }
        return `user ${id} removed`;
    }

}
 
