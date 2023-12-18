import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the genre' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ description: 'Description of the genre', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;
}
