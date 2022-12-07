import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Rating from "../rating";
import arrow from '../../assets/icon/arrow-right.png'
import fullFav from '../../assets/icon/fav-black.png'
import emptyFav from '../../assets/icon/fav-white.png'
import '../../styles/index.css'

function Details({addFavMovie, favorites}) {
  const swAlert = withReactContent(Swal)
  let token = sessionStorage.getItem('token')
  let query = new URLSearchParams(window.location.search)
  let movieID = query.get('movieID')
  const navigate = useNavigate()
  const isFavorite = favorites.find(movie => {
    return movie.id === movieID
  })

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleBack = () => {
    navigate(-1, {replace : true})
  }

  useEffect(() => {
    const apiEndpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=32182978fce0e42fb9959f133881340e&language=en-US`
    setLoading(true)
    axios.get(apiEndpoint)
    .then(response => {
      const movieData = response.data
      setMovie(movieData)
    })
    .catch(error => {
      swAlert.fire({title:<h2>{error.message}</h2>, icon:'error'})
    })
    .finally(() => {
      setLoading(false)
    })
    console.log(movieID)
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to={'/'} replace /> }
      {loading && <h1>Cargando...</h1>}
      <div className="flex flex-col items-center">
        {movie && (
          <div className="px-4 w-full mt-6 flex flex-col text-center">
            <div style={{ height : '50vh'}} className="img-transparency flex from-primary-50 absolute top-0 left-0 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                  />
              <img
                  src={arrow}
                  alt='arrow-right'
                  onClick={handleBack}
                  className="w-12 absolute top-0 right-0 cursor-pointer"
                  />
              <img
                  src={isFavorite ? fullFav : emptyFav}
                  alt='heart black'
                  onClick={addFavMovie}
                  data-movie-id={movie.id}
                  data-movie-img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  data-movie-title={movie.title}
                  className="w-10 bg-primary-50 rounded-3xl p-0.5 absolute top-0 left-0 cursor-pointer"
                  />
            </div>
            <div style={{marginTop: '35vh'}} className="text-left items-center bottom-0 w-full flex justify-between">
              <div>
                <h1 className="text-3xl font-semibold">{movie.original_title}</h1>
                <h1 className="text-md text-secondary-200">{movie.release_date}</h1>
              </div>
              <div>
                <div className="flex">
                  <Rating rating={movie.vote_average/2} maxStars={5} />
                </div>
                <h1 className="text-secondary-200">from {movie.vote_count} users</h1>
              </div>
            </div>
            <div className="mt-4 text-left group relative rounded-lg flex">
              <div className="flex flex-col">
                <span>{movie.overview}</span>
                <div className="flex justify-evenly my-8">
                  {movie.genres.map(genre=> (
                    <div
                      key={genre.id}
                      style={{backgroundColor: `rgb(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 100})`}}
                      className={`rounded-md p-2 ${genre}`}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Details;