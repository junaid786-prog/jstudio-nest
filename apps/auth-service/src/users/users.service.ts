import { User } from '@app/shared/lib/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            username: 'john',
            password: '123',
        },
        {
            id: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findUserById(userId: number): Promise<User | undefined> {
        return this.users.find(user => user.id === userId);
    }
}
