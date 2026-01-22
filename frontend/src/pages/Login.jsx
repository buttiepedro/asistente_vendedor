import { useState } from "react"
import api from "../services/api"
import Spiner from "../components/Spiner"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({state: false, error: ""})
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials = {
      email: email,
      password: password
    }
    api.post("/auth/login", credentials)
      .then(res => {
        setLoading(true)
        login(res.data.access_token, rememberMe)
        // carga 3 segundos el spinner
        console.log("Login exitoso")
        navigate("/dashboard");
      })
      .catch(err => {
        setError({state: true, error: err.data})
      })
  }

  const handleSetErrorState = (e) => {
    setError([error, error.state = false])
  }

  return (
    <>
      <div className="grid h-full place-items-center content-center bg-gray-900 min-h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-sky-950 p-8 rounded-lg shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            alt="Your Company"
            src="https://bitautomatizacion.com.ar/wp-content/uploads/2025/12/cropped-Copy-of-LOGOPNG.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Iniciar Sesión </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Correo Electrónico
              </label>
              {error.state === true && <span className="text-red-500 text-xs flex animate-shake animate-once">{error.error}</span>}
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onClick={handleSetErrorState}
                  autoComplete="username"
                  onChange={e => { setEmail(e.target.value); handleSetErrorState(); }}
                  className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 ${error.state ? " outline-red-500" : " outline-white/10"} placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Olvidaste tu contraseña? haz clic aquí
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onClick={handleSetErrorState}
                  onChange={e => { setPassword(e.target.value)}}
                  autoComplete="current-password"
                  className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 ${error.state ? " outline-red-500" : " outline-white/10"} placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
                />
              </div>
              <div className="mt-2 flex items-center">
                <input 
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded-xl"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm/6 text-gray-100">
                  Recuérdame
                </label>
              </div>
            </div>

            <div>
              {loading ? <Spiner /> :
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Iniciar Sesión
              </button>
              }
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            No eres miembro?{' '}
            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Comienza una prueba gratuita de 14 días
            </a>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}