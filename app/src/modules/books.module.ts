import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';
import { BooksController } from '../controllers/books.controller';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';
import { Genre } from '../entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Genre]),
    TypeOrmModule.forRoot(ormconfig)
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
