import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../../styles/index.css'

function Search() {
  const swAlert = withReactContent(Swal)
  const navigate = useNavigate()

  const submitHandler= (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    console.log(keyword)

    if (keyword.length === 0) {
      swAlert.fire({title:<h2>El campo no puede estar vacio.</h2>, icon:'warning'})
    } else if (keyword.length < 3) {
      swAlert.fire({title:<h2>Introduce al menos 3 carácteres.</h2>, icon:'warning'})
    } else {
      e.currentTarget.keyword.value = ''
      navigate(`/results?keyword=${keyword}`, {replace : true})
      navigate(0)
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="col-span-3 sm:col-span-2">
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="keyword"
            className="block w-full text-secondary-900 flex-1 rounded border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Escribe una pelicula..."
          />
          <button
            type="submit"
            className="btn-grad px-6 py-2"
            >Buscar
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search;