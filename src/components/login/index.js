import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../../styles/index.css'

function Login() {
  const swAlert = withReactContent(Swal)
  const navigate = useNavigate()

  const submitHandler = e => {
    e.preventDefault();

    const email = e.target.email.value
    const password = e.target.password.value
    
    const regexValidation = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (email === '' || password === '') {
      swAlert.fire({title:<h2>Los campos no pueden estar vacios</h2>, icon:'warning'})
      return
    }

    if (email !== '' && !regexValidation.test(email)) {
      swAlert.fire({title:<h2>Debe escribir una direccion de correo electronica valida</h2>, icon:'error'})
    }

    if (email !== 'challenge@alkemy.org' || password !== 'react') {
      swAlert.fire({title:<h2>Credenciales invalidas</h2>, icon:'error'})
      return
    }

    axios.post('http://challenge-react.alkemy.org', { email, password})
    .then(res => {
      swAlert.fire({title:<h2>Ingresaste Correctamente</h2>, icon:'success'})
      const token = res.data.token
      sessionStorage.setItem('token', token)
      navigate("/list", {replace : true})
    })
  }
  return (
    <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-secondary-700 text-primary-50 h-screen">
      <h1 className="text-xl font-bold">Formulario de ingreso</h1>
      <form className="w-64 mt-8 flex flex-col text-center" onSubmit={submitHandler}>
        <label>
          <span className="font-medium text-lg">Correo electronico</span>
          <input placeholder="Email..." type={'email'} name='email' className="focus:ring-2 focus:ring-primary-500 focus:outline-none border rounded-lg p-4 bg-black border-primary-600 placeholder-secondary-400 text-white" />
        </label> 
        <label className="m-2">
          <span className="font-medium text-lg">Contraseña</span>
          <input className="focus:ring-2 focus:ring-primary-500 focus:outline-none border rounded-lg p-4 bg-black border-primary-600 placeholder-secondary-400 text-white" type={'password'} name='password'/>
        </label>
        <button className="btn-grad mt-4 px-6 py-2" type="submit">Ingresar</button>      
      </form>
    </div>
  )
}

export default Login;