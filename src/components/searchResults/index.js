import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import fullFav from '../../assets/icon/fav-white.png'

function SearchResults({addFavMovie}) {
  let token = sessionStorage.getItem('token')
  let query = new URLSearchParams(window.location.search)
  let keyword = query.get('keyword')
  const swAlert = withReactContent(Swal)

  const [movieResults, setmovieResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const apiEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=32182978fce0e42fb9959f133881340e&language=en-US&query=${keyword}`
    setLoading(true)
    axios.get(apiEndpoint)
    .then(response => {
      const movieData = response.data.results
      if (movieData.length === 0) {
        swAlert.fire({title:<h2>Tu busqueda no arrojo resultados.</h2>, icon:'error'})
      }
      setmovieResults(movieData)
    })
    .catch(error => {
      swAlert.fire({title:<h2>{error.message}</h2>, icon:'error'})
    })
    .finally(() => {
      setLoading(false)
    })
  }, [keyword]);

  return (
    <div className="px-4">
      {!token && <Navigate to={'/'} replace/>}
      {loading && <h1>Cargando...</h1>}
      <h1 className="text-3xl font-semibold">Resultado de busqueda </h1>
      <h1 className="text-lg">Mostrando Resultados de : {keyword}</h1>
      {movieResults.length === 0 && <h1>No hay Resultados</h1>}
      {movieResults && (
        <div className=" m-6 grid grid-cols-2 gap-y-3 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movieResults.map(movie => (
            <div key={movie.id} className="relative">
            <Link to={`/details?movieID=${movie.id}`} className="group relative rounded-xl flex">
              <div className="h-80 overflow-hidden aspect-w-1 aspect-h-1 w-full rounded-xl bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                />
                <div className="absolute mb-6 items-center bottom-0 w-full flex justify-between">
                  <h1 className="text-3xl font-semibold text-primary-50">{movie.title}</h1>
                </div>
              </div>
            </Link>
              <img
                className="w-8 bg-primary-50 rounded-lg p-0.5 absolute bottom-5 right-0 cursor-pointer"
                src={fullFav}
                alt="heart black freeicon"
                onClick={addFavMovie}
                data-movie-id={movie.id}
                data-movie-img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                data-movie-title={movie.title}
              />
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults