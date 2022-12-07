import { Link, Navigate } from "react-router-dom";
import fullFav from '../../assets/icon/fav-black.png'

function Favorites({favorites, addFavMovie}) {
  let token = sessionStorage.getItem('token')

  return (
    <>
      {!token && <Navigate to={'/'} replace/>}
      <h1 className="px-4 text-3xl">Favoritos</h1>
      {!favorites.length && <span>No hay favoritos.</span>}
      {favorites && (
        <div className="px-4 m-6 grid grid-cols-2 gap-y-3 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {favorites.map(movie => (
            <div key={movie.id} className="relative">
              <Link to={`/details?movieID=${movie.id}`} className="group relative rounded-xl flex">
                <div className="h-80 overflow-hidden aspect-w-1 aspect-h-1 w-full rounded-xl bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.img}`}
                    alt={movie.title}
                    className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                  />
                  <div className="absolute mb-6 items-center bottom-0 w-full flex justify-between">
                    <h1 className="text-3xl font-semibold text-primary-50">{movie.title}</h1>
                  </div>
                </div>
              </Link>
              <img
                  src={fullFav}
                  alt='heart black'
                  onClick={addFavMovie}
                  data-movie-id={movie.id}
                  data-movie-img={movie.img}
                  data-movie-title={movie.title}
                  className="w-8 bg-primary-50 rounded-lg p-0.5 absolute bottom-5 right-0 cursor-pointer"
              />
          </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Favorites;