import SuccessToast from "../SuccessToast";
import { useState } from "react";
export default function TablaEmpresas({empresas, error, loading, onUpdate, onEliminar}) {
  const [showToast, setShowToast] = useState(false);

  const setOnClipBoard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles:', err);
    });
  }
  return (
    <>
    <SuccessToast 
        isOpen={showToast} 
        message="Webhook copiado al portapapeles" 
        onClose={() => setShowToast(false)} 
      />
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID Empresa
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre Empresa
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Webhook
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Instancias
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Accion
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loading && (
          <tr>
            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Cargando...
            </td>
          </tr>
        )}
        {error && (
          <tr>
            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
              Error cargando empresas
            </td>
          </tr>
        )}
        {!loading && !error && empresas?.sort((a, b) => a.name.localeCompare(b.name)).map((e) => (
          <tr key={e.id} className="animate-fade-down animate-duration-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span className="flex items-center gap-2">
              {e.web_hook_url || "No configurado"}
              <span className="cursor-pointer" onClick={() => {setOnClipBoard(e.web_hook_url)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-sky-900">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                </svg>
              </span>
              </span>
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{e.instances?.length || 0}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm  font-medium">
              <button onClick={() => {onUpdate(e.id)}} className="text-sky-600 hover:text-sky-900 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
              <button onClick={() => {onEliminar(e.id)}} className="text-red-600 hover:text-red-900 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}