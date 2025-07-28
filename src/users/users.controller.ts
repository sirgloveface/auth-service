// src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna 201 Created si la creación es exitosa
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.usersService.findAll();
  }

//   // Maneja peticiones GET a /products/:id
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     // @Param('id') extrae el parámetro 'id' de la URL. Lo convertimos a número.
//     const product = this.productsService.findOne(+id);
//     if (!product) {
//       // Puedes lanzar una excepción si el producto no se encuentra
//       // throw new NotFoundException(`Product with ID ${id} not found`);
//       return { message: `Product with ID ${id} not found` }; // Solo para este ejemplo
//     }
//     return product;
//   }

//   // Maneja peticiones PATCH a /products/:id
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
//     // Llama al método 'update' del servicio
//     const updatedProduct = this.productsService.update(+id, updateProductDto);
//     if (!updatedProduct) {
//       return { message: `Product with ID ${id} not found` };
//     }
//     return updatedProduct;
//   }

//   // Maneja peticiones DELETE a /products/:id
//   @Delete(':id')
//   @HttpCode(HttpStatus.NO_CONTENT) // Establece el código de estado HTTP a 204 No Content
//   remove(@Param('id') id: string) {
//     // Llama al método 'remove' del servicio
//     this.productsService.remove(+id);
//     // Para 204, no se devuelve contenido en el body
//   }
}