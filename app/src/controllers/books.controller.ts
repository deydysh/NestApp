import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/book.entity';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('books')
@Controller('crud/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Returns all books' })
  @ApiResponse({ status: 404, description: 'Books not found' })
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Return book with given id' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getBookById(@Param('id') id: number): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a book' })
  @ApiBody({ type: Book, description: 'Book data' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created' })
  async createBook(@Body() bookData: Partial<Book>): Promise<Book> {
    return this.booksService.createBook(bookData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Book ID' })
  @ApiBody({ type: Book, description: 'Updated book data' })
  @ApiResponse({ status: 200, description: 'The book has been successfully updated' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async updateBook(@Param('id') id: number, @Body() bookData: Partial<Book>): Promise<Book> {
    return this.booksService.updateBook(id, bookData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'The book has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async deleteBook(@Param('id') id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}