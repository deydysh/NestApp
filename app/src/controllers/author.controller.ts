import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AuthorsService } from '../services/author.service';
import { Author } from '../entities/author.entity';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('crud/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'Returns all authors' })
  @ApiResponse({ status: 404, description: 'Authors not found' })
  async getAllAuthors(): Promise<Author[]> {
    return this.authorsService.getAllAuthors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'Return author with given id' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  async getAuthorById(@Param('id') id: number): Promise<Author> {
    return this.authorsService.getAuthorById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an author' })
  @ApiBody({ type: Author, description: 'Author data' })
  @ApiResponse({ status: 201, description: 'The author has been successfully created' })
  async createAuthor(@Body() authorData: Partial<Author>): Promise<Author> {
    return this.authorsService.createAuthor(authorData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Author ID' })
  @ApiBody({ type: Author, description: 'Updated author data' })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  async updateAuthor(@Param('id') id: number, @Body() authorData: Partial<Author>): Promise<Author> {
    return this.authorsService.updateAuthor(id, authorData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'The author has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  async deleteAuthor(@Param('id') id: number): Promise<void> {
    return this.authorsService.deleteAuthor(id);
  }
}