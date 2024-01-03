import { User } from '@app/shared/lib/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findOne(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { username: username},
            select: ['id', 'username', 'password']
        });
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id: id}
        });
    }
}
