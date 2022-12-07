import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import List from './components/list';
import Header from './components/header';
import Footer from './components/footer';
import Details from './components/details';
import SearchResults from './components/searchResults';
import Favorites from './components/favorites';
import Intro from './components/intro';


function App() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs')
    if (favsInLocal !== null) {
      const favArray = JSON.parse(favsInLocal)
      console.log(favArray)
      setFavorites(favArray)
    }
  }, []);

  const addFavMovie = (e) => {
    const favMovies = localStorage.getItem('favs')
    let tempFavMovies;
  
    if (favMovies === null) {
      tempFavMovies = [];
      console.log(tempFavMovies)
    } else {
      tempFavMovies = JSON.parse(favMovies)
    }
    
    const btn = e.currentTarget
    console.log(btn.dataset)
    const movieData = {
      id : btn.dataset.movieId,
      img : btn.dataset.movieImg,
      title : btn.dataset.movieTitle
    }
    let movieInArray = tempFavMovies.find(movie => {
      return movie.id === movieData.id
    })

    if (!movieInArray) {
      tempFavMovies.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempFavMovies))
      console.log('pelicula agregada')
      setFavorites(tempFavMovies)
    } else {
      let moviesLeft = tempFavMovies.filter(movie => {
        return movie.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      console.log('pelicula eliminada')
      setFavorites(moviesLeft)
    }
  }
  console.log(localStorage.getItem('favs'))
  return (
    <div className='font-mono bg-secondary-700 text-primary-50'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Intro />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/list"} element={<List addFavMovie={addFavMovie} />} />
          <Route path={"/details"} element={<Details favorites={favorites} addFavMovie={addFavMovie} />} />
          <Route path={"/results"} element={<SearchResults />} />
          <Route path={"/favorites"} element={<Favorites favorites={favorites} addFavMovie={addFavMovie} />} />
          <Route path='*' element={ <Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
