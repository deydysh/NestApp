import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async getAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async createAuthor(authorData: Partial<Author>): Promise<Author> {
    const newAuthor = this.authorRepository.create(authorData);
    return await this.authorRepository.save(newAuthor);
  }

  async updateAuthor(id: number, authorData: Partial<Author>): Promise<Author> {
    await this.authorRepository.update(id, authorData);
    return await this.getAuthorById(id);
  }

  async deleteAuthor(id: number): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Author not found');
    }
  }
}