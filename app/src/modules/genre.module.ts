import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';
import { GenresController } from '../controllers/genre.controller';
import { GenresService } from '../services/genre.service';
import { Genre } from '../entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre]), TypeOrmModule.forRoot(ormconfig)],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}