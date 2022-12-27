import { CreateUserDto } from './../dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';

const UserList: User[] = [
    new User({ 
        id: '', 
        firstName: 'fn',
        lastName: 'ln', 
        password: 'password', 
        email: 'email@email.com',
        isActive: true
    })
]

const CreateUser: User = new User({
    firstName: 'fn',
    lastName: 'ln',
    password: "password",
    email: 'fn.ln@dreamlabs.com'
});

describe ('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(UserList), 
                        findOne: jest.fn(),
                        login: jest.fn(),
                        create: jest.fn().mockResolvedValue(CreateUser), 
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });


    it('should be defined', () => {
        expect(userController).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('findAll', () => {
        it('should return a list of users', async () => {
            const result = await userController.index();
            expect(result).toEqual(UserList);
            expect(typeof result).toEqual('object');
        });
     });

     // * confer if in the controller the return value of create should be a User
     describe('create', () => {
        it('should create a new user', async () => {

            const body: CreateUserDto = {
                firstName: "fn",
                lastName: "sn",
                password: "password",
                email: "email@email.com"
            }

            const result = await userController.create(body);
            expect(result).toEqual(`${CreateUser.email} registered`);
        });
     })
});