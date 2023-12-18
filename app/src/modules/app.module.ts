import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books.module';
import { GenresModule } from './genre.module';
import { AuthorsModule } from './author.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import * as ormconfig from '../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    BooksModule,
    GenresModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
