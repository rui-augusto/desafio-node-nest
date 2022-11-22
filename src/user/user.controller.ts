import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller("account") // rota alterada para o padrão solicitado
export class UserController {
    constructor(private userService: UserService) {}

    // FIND ALL USERS
    @ApiOperation( {summary: 'Listar todos os usuários'} )
    @ApiResponse( {status: 200, description: 'Lista de usuários retornada com sucesso'} )
    @Get()
    async index() {
        return await this.userService.findAll();
    }

    // FIND ONE USER
    @ApiOperation( {summary: 'Exibir os dados de um usuário'} )
    @ApiResponse( {status: 200, description: 'Dados de um usuário retornados com sucesso'} )
    @ApiResponse( {status: 404, description: 'ID inválido!'} )
    @Get(":id")
    async findOne(@Param('id') id: number) {
        return await this.userService.findOne(id);
    }

    // VALIDATE LOGIN
    @ApiOperation( {summary: 'Validar os dados de um usuário'} )
    @ApiResponse({ status: 204, description: 'Usuário validado com sucesso' })
    @ApiResponse({ status: 404, description: 'Credenciais de usuário inválidas' })
    @Post("login")
    async login(@Body() loginUserDto: LoginUserDto){
        const user = await this.userService.login(loginUserDto);
        if (user){
            return "successful login!";
        }
        return "insuccessful login!";
    }


    //REGISTER NEW USER
    @ApiOperation( {summary: 'Registrar um novo usuário'} )
    @ApiResponse( {status: 201, description: 'Usuário registrado com sucesso'} )
    @ApiResponse({ status: 400, description: 'Usuário não põde ser registrado' })
    @Post("register")
    async create(@Body() createUserDto: CreateUserDto){
        const user = await this.userService.create(createUserDto);
        console.log(user);
        if (!user){
            return "error: data is invalid";
        }
        return "user registered";
    }

    // UPDATE USER
    @ApiOperation( {summary: 'Atualizar os dados de um usuário'})
    @ApiResponse({ status: 204, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'ID de usuário não foi encontrado' })
    @Put(":id")
    async update(@Param('id') id: number, @Body() body: any) {
        const updatedUser: any = await this.userService.update(id, body);
        console.log(updatedUser);
        return `user ${id} updated`;
    }

    // DELETE USER
    @ApiOperation( {summary: 'Deletar os dados de um usuário'})
    @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
    @ApiResponse({ status: 404, description: 'ID de usuário não foi encontrado' })
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
 
