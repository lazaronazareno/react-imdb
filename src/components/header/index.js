import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../search";
import menu from '../../assets/icon/menu.png'
import close from '../../assets/icon/close.png'
import movie from '../../assets/icon/movie.png'
import { useRef } from "react";
import '../../styles/index.css'

function Header() {
  const [navbar, setNavbar] = useState(false);
  const listaRef = useRef(null);

  let token = sessionStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token')
    navigate('/', {replace : true})
  } 

  useEffect(() => {
    const ocultarLista = event => {
      if (event.target !== listaRef.current) {
        setNavbar(false);
      }
    };

    document.addEventListener("click", ocultarLista);

    return () => {
      document.removeEventListener("click", ocultarLista);
    };
  }, [listaRef]);

  return (
    <>
      {token && (
        <header className="mx-auto max-w-7xl px-4 sm:px-6 bg-primary-900">
          <nav className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to={'/list'} >
                <span className="sr-only">Your Company</span>
                <img
                  className="h-6 w-auto sm:h-10"
                  src={movie}
                  alt="movie claqueta freeicon"
                />
              </Link>
              <div className="md:hidden">
                <div
                  className="navbar-icon pointer p-2 text-white-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                  ref={listaRef}
                  style={{backgroundImage : navbar ? `url(${close})` : `url(${menu})`}}
                />
              </div>
            </div>
            <div className={`flex pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}>
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-primary-50 hover:text-primary-300">
                    <Link to={'/list'}>Listado</Link>
                  </li>
                  <li className="text-primary-50 hover:text-primary-300">
                    <Link to={'/favorites'} >Favoritos</Link>
                  </li>
                  <div className="flex">
                    <Search />
                  </div>
                  <button className="btn-grad px-6 py-2" onClick={handleLogout} to={'/login'}>Logout</button>
              </ul>
            </div>
          </nav>
        </header>
      )}
    </>
  )
}

export default Header;