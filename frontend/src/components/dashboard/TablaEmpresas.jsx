export default function TablaEmpresas({empresas, error, loading, onEliminar}){
  
  return (
    <>
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
            Activa
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Accion
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loading && (
          <tr>
            <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Cargando...
            </td>
          </tr>
        )}
        {error && (
          <tr>
            <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
              Error cargando empresas
            </td>
          </tr>
        )}
        {!loading && !error && empresas?.map((e) => (
          <tr key={e.id} className="animate-fade-down animate-duration-300">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{e.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.active ? "Sí" : "No"}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm  font-medium">
              <button onClick={() => {onEliminar(e.id)}} className="text-red-600 hover:text-red-900 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
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