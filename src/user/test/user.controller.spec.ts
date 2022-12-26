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
                        create: jest.fn(),
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
        });
     });
});