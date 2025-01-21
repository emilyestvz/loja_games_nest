import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { User } from '../entities/user.entity';
import { isAdult } from '../../util/validation-age';
import { CreateUserDto } from '../dto/user.dto';
import { format } from 'date-fns';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(user: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                user: user
            }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();

    }

    async findById(id: number): Promise<User> {

        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if (!user)
            throw new HttpException('⚠ User not found!', HttpStatus.NOT_FOUND);

        return user;

    }

    async create(userDto: CreateUserDto): Promise<User> {
        
        const { birthDate, user, password } = userDto;

        // Formata a data de nascimento 
        const formatDate = format(new Date(birthDate), 'dd/MM/yyyy');

        // Criptografa a senha
        const encryptedPassword = await this.bcrypt.encryptPassword(password);

        // Cria uma instância do usuário e associa os dados formatados
        const newUser = new User();
        Object.assign(newUser, userDto, {
            birthDate: formatDate,
            password: encryptedPassword,
        });

        // Valida se o usuário é maior de idade
        if (!isAdult(new Date(birthDate))) {
            throw new BadRequestException('⚠ Users must be of legal age to register.');
        }

        // Verifica se o usuário já existe
        const userSearch = await this.findByUser(user);
        if (userSearch)
            throw new HttpException('⚠ User already exists!', HttpStatus.BAD_REQUEST);


        // Cria e salva o usuário
        return await this.userRepository.save(newUser);
    }

    async update(user: User): Promise<User> {

        await this.findById(user.id);

        const userSearch = await this.findByUser(user.user);

        if (userSearch && userSearch.id !== user.id)
            throw new HttpException('⚠ User (e-mail) already registered!', HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptPassword(user.password)
        return await this.userRepository.save(user);

    }

    async delete(id: number): Promise<DeleteResult> {
            
            await this.findById(id);
            return await this.userRepository.delete(id);
        } 

}