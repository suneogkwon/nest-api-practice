import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array of movies', () => {
      const movies = service.getAll();

      expect(movies).toBeInstanceOf(Array);
      // const expectedMovies = [
      //   { id: 1, title: 'Movie 1', genre: 'Action' },
      //   { id: 2, title: 'Movie 2', genre: 'Drama' },
      // ];
      // jest.spyOn(service, 'getAllMovies').mockResolvedValue(expectedMovies);
      //
      // const result = await service.getAllMovies();
      // expect(result).toEqual(expectedMovies);
    });
  });

  describe('getMovieById', () => {
    it('should return a single movie by ID', () => {
      service.create({
        title: 'Movie 1',
        year: 2020,
        genres: ['Action'],
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      // const movieId = 1;
      // const expectedMovie = { id: movieId, title: 'Movie 1', genre: 'Action' };
      // jest.spyOn(service, 'getMovieById').mockResolvedValue(expectedMovie);
      //
      // const result = await service.getMovieById(movieId);
      // expect(result).toEqual(expectedMovie);
    });

    it('should throw an error if movie is not found', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
      //   const movieId = 999;
      //   jest
      //     .spyOn(service, 'getMovieById')
      //     .mockRejectedValue(new Error('Movie not found'));
      //
      //   await expect(service.getMovieById(movieId)).rejects.toThrow(
      //     'Movie not found',
      //   );
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie by ID', () => {
      service.create({
        title: 'Movie 1',
        year: 2020,
        genres: ['Action'],
      });
      const movies = service.getAll();
      service.delete(1);
      const resolvedMovies = service.getAll();
      expect(resolvedMovies.length).toBeLessThan(movies.length);
      //       const movieId = 1;
      //       jest.spyOn(service, 'deleteMovie').mockResolvedValue(undefined);
      //
      //       await expect(service.deleteMovie(movieId)).resolves.toBeUndefined();
    });

    it('should throw an error if movie is not found', () => {
      try {
        service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const isCreated = service.create({
        title: 'Movie 1',
        year: 2020,
        genres: ['Action'],
      });
      expect(isCreated).toEqual(true);

      //     it('should create and return a new movie', async () => {
      //       const newMovie = { title: 'Movie 3', genre: 'Comedy' };
      //       const createdMovie = { id: 3, ...newMovie };
      //       jest.spyOn(service, 'createMovie').mockResolvedValue(createdMovie);
      //
      //       const result = await service.createMovie(newMovie);
      //       expect(result).toEqual(createdMovie);
      //     });
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Movie 1',
        year: 2020,
        genres: ['Action'],
      });

      service.update(1, {
        title: 'Movie 2',
      });

      const movie = service.getOne(1);

      expect(movie.title).toEqual('Movie 2');
    });

    it('should throw an error if movie is not found', () => {
      try {
        service.update(999, {
          title: 'Movie 2',
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
