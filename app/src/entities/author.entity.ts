import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the author' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ description: 'The country of the author' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ description: 'The birth date of the author' })
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @ApiProperty({ description: 'The biography of the author' })
  @Column({ type: 'text', nullable: true })
  biography: string;

}