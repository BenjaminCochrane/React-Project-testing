import React, { useState, useEffect} from 'react'
import Search from './assets/components/Search.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList]= useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Could not fetch movies ');
      };

      const responseData = await response.json();
      if (responseData.Response === 'False') {
        setErrorMessage(responseData.Error|| 'Failed to fetch movies. Please try again later.');
        setMovieList([]);
        return;
      };

      setMovieList(responseData.results|| []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies()
  
    return () => {
      // Cleanup function if needed
    }
  }, [])
  
  
  return (
    <main>
      <div className="pattern"/>

      <div className='wrapper'>
        <header>
          <img src='src/assets/hero.png' alt="Hero Banner"/>
          <h1>These Movies go <span className="text-gradient">CRAAAAAAZZZZZYYYY</span> Bro</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ?(
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) =>(
                <div>
                  <p key={movie.id} className="text-white">{movie.title}</p>
                  <img
                      key={movie.id}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                </div>
              ))}
            </ul>
          )}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}

export default App