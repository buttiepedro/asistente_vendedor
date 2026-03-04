import {useState, useContext} from 'react'
import DashboardSuperUsuario from '../components/dashboard/DashboardSuperUsuario.jsx'
import { AuthContext } from "../context/AuthContext";
import LineasEmpresas from '../components/dashboard/LineasEmpresas.jsx';
// import MiGrafico from '../components/graficos/MiGrafico.jsx'


export default function Lineas() {
  const { user } = useContext(AuthContext);

  return (
    <>
    {user && user.isSuperuser ?
      <DashboardSuperUsuario />
    :
    user ?
      <LineasEmpresas />
    :
    <></>
    }
    </>
  )
}
