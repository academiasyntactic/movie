"use client"
import { useState } from "react";

export default function Home() {

  interface Movies {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }

  // const apiKey = process.env.API_KEY;
  const url = `https://www.omdbapi.com/?apikey=8b7cd718`;
  const [movie, setMovie] = useState<string>();
  const [datos, setDatos] = useState<any>(null);
  const [movies, setMovies] = useState<Movies[] | undefined >();

  const searchMovie = async () => {
    const response = await fetch(`${url}&s=${movie}`);
    const data = await response.json();
    console.log(data);
    setDatos(data)
    setMovies(data.Search);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24 bg-black">
      <h1 className="text-6xl font-bold text-red-600 ">
        Netflix
      </h1>

      <div className="flex">
        <input type="text" onChange={(e) => setMovie(e.target.value)} />
        <button className="bg-red-600" onClick={searchMovie} >Buscar</button>
      </div>

      <div className="text-white">
        {datos && datos.Search ? (
          movies.map(
            (movie) => (
              <div key={movie.imdbID}>
                <div className="flex gap-10">
                  <img
                    src={movie.Poster}
                    width={200}
                    height={300}
                    alt={movie.Title}
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{movie.Title}</h2>
                    <p>{movie.Year}</p>
                  </div>
                </div>
              </div>
            )
          )
        ) : 'No hay peliculas'}
      </div>
    </main>
  );
}
