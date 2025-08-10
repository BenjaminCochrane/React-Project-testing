import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <div key={movie.id}>
        <p className="text-white">
            {movie.title}
            <img src="src\assets\star.svg" alt="Star Icon" className="inline-block w-4 h-4 ml-2"/>
            {movie.vote_average}</p>
        <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
        />

    </div>
  )
}

export default MovieCard