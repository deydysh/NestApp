import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GenresService } from '../services/genre.service';
import { Genre } from '../entities/genre.entity';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('crud/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'Returns all genres' })
  @ApiResponse({ status: 404, description: 'Genres not found' })
  async getAllGenres(): Promise<Genre[]> {
    return this.genresService.getAllGenres();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Genre ID' })
  @ApiResponse({ status: 200, description: 'Return genre with given id' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  async getGenreById(@Param('id') id: number): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a genre' })
  @ApiBody({ type: Genre, description: 'Genre data' })
  @ApiResponse({ status: 201, description: 'The genre has been successfully created' })
  async createGenre(@Body() genreData: Partial<Genre>): Promise<Genre> {
    return this.genresService.createGenre(genreData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Genre ID' })
  @ApiBody({ type: Genre, description: 'Updated genre data' })
  @ApiResponse({ status: 200, description: 'The genre has been successfully updated' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  async updateGenre(@Param('id') id: number, @Body() genreData: Partial<Genre>): Promise<Genre> {
    return this.genresService.updateGenre(id, genreData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Genre ID' })
  @ApiResponse({ status: 200, description: 'The genre has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  async deleteGenre(@Param('id') id: number): Promise<void> {
    return this.genresService.deleteGenre(id);
  }
}