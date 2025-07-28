import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d23sqqngi27c738d4otg-a.oregon-postgres.render.com',
      port: 5432,
      username: 'curdoapp_user',
      password: 'FSOXkbiebFZSnmp1XlZJ7DZ4MkQug2g9',
      database: 'curdoapp',
      entities: [User],
      synchronize: true,
      logging: ['query', 'error'],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
