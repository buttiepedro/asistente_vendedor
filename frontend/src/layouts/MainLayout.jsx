import { Outlet } from "react-router-dom"
import Header from "../components/Header"


export default function MainLayout() {

  return (
    <div className="flex-1 flex flex-col">
      <Header/>
      <main className="p-6 bg-slate-100 flex-1">
        <Outlet />
      </main>
    </div>
  )
}