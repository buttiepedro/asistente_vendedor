import {useState, useContext} from 'react'
import DashboardSuperUsuario from '../components/dashboard/DashboardSuperUsuario.jsx'
// import DashboardEmpresas from '../components/dashboard/DashboardEmpresas.jsx'
import { AuthContext } from "../context/AuthContext";
// import MiGrafico from '../components/graficos/MiGrafico.jsx'


export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
    {user && user.isSuperuser ?
      <DashboardSuperUsuario />
    :
    <></>
    // user && user.isAdmin ?
    //   <DashboardEmpresas />
    
    
    }
    </>
  )
}
