/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/products/products.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private users: any = [];
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param createUserDto Datos para crear el usuario.
   * @returns El usuario creado.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error?.code === '23505') {
        throw new ConflictException('Email address already exists.');
      }

      throw new InternalServerErrorException(
        'Failed to create user. Please try again later.',
      );
    }
  }
  /**
   * Obtiene todos los usuarios de la base de datos.
   * @returns Un array de usuarios.
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id El ID del usuario.
   * @returns El usuario encontrado o lanza NotFoundException.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  /**
   * Obtiene un usuario por su email.
   * @param email El email del usuario.
   * @returns El usuario encontrado o lanza NotFoundException.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  /**
   * Actualiza un usuario existente por su ID.
   * @param id El ID del usuario a actualizar.
   * @param updateUserDto Datos para actualizar el usuario.
   * @returns El usuario actualizado.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    try {
      return await this.usersRepository.save(user); // Guarda los cambios
    } catch (error) {
      if (error?.code === '23505') {
        throw new ConflictException('Email address already exists.');
      }
      throw new InternalServerErrorException(
        'Failed to update user. Please try again later.',
      );
    }
  }

  /**
   * Elimina un usuario por su ID.
   * @param id El ID del usuario a eliminar.
   * @returns `true` si se eliminó, `false` si no se encontró.
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return true;
  }
}
