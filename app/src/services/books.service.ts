import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { Genre } from '../entities/genre.entity';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    const { author: authorData, genre: genreData, ...bookDetails } = bookData;
  
    let author, genre;
  
    if (authorData && authorData.name) {
      author = await this.authorRepository.findOne({ where: { name: authorData.name } });
      if (!author) {
        author = await this.authorRepository.save(this.authorRepository.create(authorData));
      }
    }
  
    if (genreData && genreData.name) {
      genre = await this.genreRepository.findOne({ where: { name: genreData.name } });
      if (!genre) {
        genre = await this.genreRepository.save(this.genreRepository.create(genreData));
      }
    }
  
    const newBook = this.bookRepository.create({
      ...bookDetails,
      author: author || authorData?.id,
      genre: genre || genreData?.id,
    });
  
    return await this.bookRepository.save(newBook);
  }
  
  async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
    const { author: authorData, genre: genreData, ...bookDetails } = bookData;
  
    let author, genre;
  
    if (authorData && authorData.name) {
      author = await this.authorRepository.findOne({ where: { name: authorData.name } });
      if (!author) {
        author = await this.authorRepository.save(this.authorRepository.create(authorData));
      }
    }
  
    if (genreData && genreData.name) {
      genre = await this.genreRepository.findOne({ where: { name: genreData.name } });
      if (!genre) {
        genre = await this.genreRepository.save(this.genreRepository.create(genreData));
      }
    }
  
    await this.bookRepository.update(id, {
      ...bookDetails,
      author: author || authorData?.id,
      genre: genre || genreData?.id,
    });
  
    return await this.getBookById(id);
  }
  

  async deleteBook(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }
  }
}
