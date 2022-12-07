import { Navigate } from "react-router-dom"
import PopularMovies from "../releases";
import AllMovies from "./allMoviesList";

function List({addFavMovie}) {
  let token = sessionStorage.getItem('token')

  return (
    <>
      {!token && <Navigate to={'/'} replace/>}
      <div className="flex flex-col px-4">
        <div className="my-2">
          <h1 className="my-2 text-xl font-semibold">Popular</h1>
          <PopularMovies />
        </div>
        <div className="my-2">
          <h1 className="my-2 text-xl font-semibold">All Movies</h1>
          <AllMovies addFavMovie={addFavMovie} />
        </div>
      </div>
    </>
  )
}

export default List