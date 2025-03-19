import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  delete(id: string): void {
    this.getOne(id);

    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  create(movieData): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return true;
  }

  update(id: string, updateData): void {
    const movie = this.getOne(id);
    this.delete(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
