import { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Slider from "../slider";

function PopularMovies({addFavMovie}) {
  const [loading, setLoading] = useState(false)
  const swAlert = withReactContent(Swal)

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const apiEndpoint = "https://api.themoviedb.org/3/movie/popular?api_key=32182978fce0e42fb9959f133881340e&language=en-US&page=1"
    setLoading(true)
    axios.get(apiEndpoint)
    .then(response => {
      const movieData = response.data
      setMovieList(movieData.results)
    })
    .catch(error => {
      swAlert.fire({title:<h2>{error.message}</h2>, icon:'error'})
    })
    .finally(() => {
      setLoading(false)
    })
  }, [setMovieList]);
  
  return (
    <>
      {loading && <h1>Cargando...</h1>}
      {movieList && (
        <Slider movieList={movieList.slice(0,10)} navButtons={false} indicators={false} autoplay={true} stars={true} />
      )}
    </>
  )
}

export default PopularMovies