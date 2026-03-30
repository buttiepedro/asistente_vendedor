import SuccessToast from "../SuccessToast";
import { useState } from "react";
import ConfirmationModal from '../ConfirmationModal'
export default function TablaInstancias({instancias, error, loading, onUpdateInstance, onEliminar}) {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [instanciaEliminar, setInstanciaEliminar] = useState(null);


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
            Nombre Vendedor
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cargo
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre Empresa
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre Instancia
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Accion
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {instancias?.map((e) => (
          <tr key={e.id} className="animate-fade-down animate-duration-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.name_vendor}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.position_vendor}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.company.name}</td>
            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">{e.evolution_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm  font-medium">
              <button onClick={() => {onUpdateInstance(e.id)}} className="text-sky-600 hover:text-sky-900 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
              <button onClick={() => {setShowModal(true); setInstanciaEliminar({id: e.id, name: e.evolution_name})}} className="text-red-600 hover:text-red-900 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ConfirmationModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
      onConfirm={() => onEliminar(instanciaEliminar)}
      title="Confirmar Eliminación"
      message={`¿Estás seguro de que quieres eliminar esta instancia? Esta acción no se puede deshacer.`}
    />
    </>
  )
}