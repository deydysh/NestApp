
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';
import { AuthorsController } from '../controllers/author.controller';
import { AuthorsService } from '../services/author.service';
import { Author } from '../entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), TypeOrmModule.forRoot(ormconfig)],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
