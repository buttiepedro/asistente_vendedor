import { useEffect,useState } from "react"
import api from "../../services/api"

import { useAuth } from "../../context/AuthContext"
import TablaEmpresas from "./TablaEmpresas"
import TablaUsuarios from "./TablaUsuarios"
import FormUsuarios from "./FormUsuarios"
import FormEmpresas from "./FormEmpresas"
import Pagination from "../Pagination.jsx"


export default function Dashboard() {
  // Estado para completar formulario de creacion de usuarios
  const { user } = useAuth()
  // lista de empresas y usuarios 
  const [empresas, setEmpresas] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [showFormUsuarios, setShowFormUsuarios] = useState(false)
  const [errorCrearUsuario, setErrorCrearUsuario] = useState({state: false, error: ''})
  const [showFormEmpresas, setShowFormEmpresas] = useState(false)
  const [errorCrearEmpresa, setErrorCrearEmpresa] = useState({state: false, error: ''})
  const [usuariosPagination, setUsuariosPagination] = useState({
    current_page: 1,
    total_items: 0,
    total_pages: 0,
    per_page: 5
  })
  const [empresasPagination, setEmpresasPagination] = useState({
    current_page: 1,
    total_items: 0,
    total_pages: 0,
    per_page: 5
  })

  // lista de empresa para llenar formulario
  const [listEmpresas, setListEmpresas] = useState([])

  // Fetch empresas
  useEffect(() => {
    api.get(`/companies/pagination?page=${empresasPagination.current_page}`)
      .then(res => {
        setEmpresas(res.data.companies)
        setEmpresasPagination({
          ...empresasPagination,
          total_items: res.data.pagination.total_items,
          total_pages: res.data.pagination.total_pages,
        })
      })
      .catch(err => {
        console.error("Error fetching companies:", err)
      }
    )
    api.get(`/users/?page=${usuariosPagination.current_page}`)
      .then(res => {
        setUsuarios(res.data.users)
        setUsuariosPagination({
          ...usuariosPagination,
          total_items: res.data.pagination.total_items,
          total_pages: res.data.pagination.total_pages,
        })
      })
      .catch(err => {
        console.error("Error fetching users:", err)
      }
    )
    api.get("/companies/")
      .then(res => {
        setListEmpresas(res.data)
      })
      .catch(err => {
        console.error("Error fetching companies:", err)
      }
    )
  }, [
    empresas.length, 
    usuarios.length,
    usuariosPagination.current_page,
    empresasPagination.current_page,
    listEmpresas.length
  ])

  const handleShowFormUsuarios = () => {
    setShowFormUsuarios(!showFormUsuarios)
    document.body.style.overflow = showFormUsuarios ? "auto" : "hidden"
  }

  const crearUsuario = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      company_id: formData.get("empresa") || null,
    }
    api.post("/users/", data)
      .then(res => {
        setErrorCrearUsuario({state: false, error: ''})
        setShowFormUsuarios(false)
        document.body.style.overflow = "auto"
        usuarios.push(res.data)
      }
      )
      .catch(err => {
        setErrorCrearUsuario({state: true, error: err.response?.data?.msg || 'Error creando usuario'})
      }
    )
  }

  const handleShowFormEmpresas = () => {
    setShowFormEmpresas(!showFormEmpresas)
    document.body.style.overflow = showFormEmpresas ? "auto" : "hidden"
  }

  const crearEmpresa = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("nombre_empresa"),
    }
    api.post("/companies/", data)
      .then(res => {
        setErrorCrearEmpresa({state: false, error: ''})
        setShowFormEmpresas(false)
        document.body.style.overflow = "auto"
        empresas.push(res.data)
      }
      )
      .catch(err => {
        setErrorCrearEmpresa({state: true, error: err.response?.data?.msg || 'Error creando empresa'})
      }
    )
  }

  const eliminarEmpresa = (id) => {
    let confirmacion = confirm("¿Estás seguro de que deseas eliminar esta empresa? Esta acción no se puede deshacer.")
    if (!confirmacion) return;
    api.delete(`/companies/${id}`)
      .then(res => {
        setEmpresas(empresas.filter(e => e.id !== id))
      })
      .catch(err => {
        console.error("Error eliminando empresa:", err)
      }
    )
  }

  const handlePageChange = (page,isEmpresas) => {
    if (!isEmpresas){
      setUsuariosPagination({
        ...usuariosPagination,
        current_page: page
      })
    }else{
      setEmpresasPagination({
        ...empresasPagination,
        current_page: page
      })
    }
  }

  const eliminarUsuario = (id) => {
    let confirmacion = confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.")
    if (!confirmacion) return;
    api.delete(`/users/${id}`)
      .then(res => {
        setUsuarios(usuarios.filter(u => u.id !== id))
      })
      .catch(err => {
        console.error("Error eliminando usuario:", err)
      }
    )
  }


  return (
    <>
      <div className="">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-sky-950">Dashboard</h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={handleShowFormUsuarios}
          className="mb-4 mx-2 rounded-md bg-blue-900 py-2 px-4 text-base font-semibold text-white hover:bg-blue-800 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:fill-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
        </button>
        <button
          onClick={handleShowFormEmpresas}
          className="mb-4 mx-2 rounded-md bg-blue-900 py-2 px-4 text-base font-semibold text-white hover:bg-blue-800 cursor-pointer"
        >
          <span className="flex relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:fill-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={2.8} stroke="#FFFFFF" className="size-3 fill-white absolute top-1 -right-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        </button>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="overflow-auto">
          <h2>Lista de Usuarios</h2>
          <TablaUsuarios usuarios={usuarios} onEliminar={eliminarUsuario} />
        </div>
        <Pagination 
          esEmpresas={false}
          currentPage={usuariosPagination.current_page} 
          totalItems={usuariosPagination.total_items} 
          totalPages={usuariosPagination.total_pages} 
          perPage={usuariosPagination.per_page}
          onPageChange={handlePageChange}
          >
        </Pagination>
        
        <div className="overflow-auto">
          <h2>Lista de Empresas</h2>
          <TablaEmpresas empresas={empresas} onEliminar={eliminarEmpresa} />
        </div>
        <Pagination 
          esEmpresas={true}
          currentPage={empresasPagination.current_page} 
          totalItems={empresasPagination.total_items} 
          totalPages={empresasPagination.total_pages} 
          perPage={empresasPagination.per_page}
          onPageChange={handlePageChange}
          >
        </Pagination>

        <FormUsuarios empresas={listEmpresas} onSubmit={crearUsuario} showForm={showFormUsuarios} setShowForm={setShowFormUsuarios} error={errorCrearUsuario} setError={setErrorCrearUsuario} />
        <FormEmpresas onSubmit={crearEmpresa} showForm={showFormEmpresas} setShowForm={setShowFormEmpresas}  />
      </div>
    </>
  )
}
