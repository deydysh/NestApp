import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from './genre.entity';
import { Author } from './author.entity';


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The title of the book' })
  @Column()
  title: string;

  @ApiProperty({ name: 'author', description: 'Author details', type: () => Author })
  @ManyToOne(() => Author, { eager: true }) 
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ApiProperty({ name: 'genre', description: 'Genre details', type: () => Genre })
  @ManyToOne(() => Genre, { eager: true }) 
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @ApiProperty({ description: 'The publication year of the book' })
  @Column()
  year: Date;

  @ApiProperty({ description: 'Availability of the book' })
  @Column({ name: 'availability', default: true })
  isAvailable: boolean;
  
}

