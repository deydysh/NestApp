import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getAllGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async getGenreById(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return genre;
  }

  async createGenre(genreData: Partial<Genre>): Promise<Genre> {
    const newGenre = this.genreRepository.create(genreData);
    return await this.genreRepository.save(newGenre);
  }

  async updateGenre(id: number, genreData: Partial<Genre>): Promise<Genre> {
    await this.genreRepository.update(id, genreData);
    return await this.getGenreById(id);
  }

  async deleteGenre(id: number): Promise<void> {
    const result = await this.genreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Genre not found');
    }
  }
}
