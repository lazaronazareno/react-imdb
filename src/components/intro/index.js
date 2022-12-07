import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import '../../styles/index.css'

function Intro() {
  let token = sessionStorage.getItem('token')
  const [trendingList, setTrendingList] = useState([])
  const [loading, setLoading] = useState(false)
  const swAlert = withReactContent(Swal)

  useEffect(() => {
    const apiEndpoint = "https://api.themoviedb.org/3/trending/all/day?api_key=32182978fce0e42fb9959f133881340e"
    setLoading(true)
    axios.get(apiEndpoint)
    .then(response => {
      const apiData = response.data
      const newList = apiData.results.slice(0,6)
      setTrendingList(newList)
    })
    .catch(error => {
      swAlert.fire({title:<h2>{error.message}</h2>, icon:'error'})
    })
    .finally(()=> {
      setLoading(false)
    })
  }, [setTrendingList]);
  return (
    <div className="flex flex-col items-center h-screen">
      {token && <Navigate to={'/list'} replace/>}
      {loading && <h1>Cargando...</h1>}
      {trendingList &&
        <>
        <div className="movieList m-2">
          {trendingList.map(movie => (
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            className="img-item"
            />
          ))}
        </div>
        <h1 className="text-2xl">Movies App</h1>
        <span className="text-lg">Movies database powered by themoviedb</span>
        <Link to={'/login'} className='btn-grad px-6 py-2'>Enter</Link>
        </>
      }
    </div>
  )
}

export default Intro;