export default function ConnectionCardSkeleton() {
  return (
    <div className=" w-full max-w-sm rounded-xl shadow-lg border-gray-200 border p-5 bg-white">
    <div className="animate-pulse">
      {/* Parte Superior: Avatar, Texto e Iconos */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          {/* Avatar Circular */}
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          
          {/* Nombre y ID */}
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-gray-300"></div>
            <div className="h-2 w-32 rounded bg-gray-200"></div>
          </div>
        </div>

        {/* Iconos de la derecha (Números) */}
        <div className="flex space-x-4">
          <div className="h-4 w-6 rounded bg-gray-200"></div>
          <div className="h-4 w-6 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Parte Inferior: Botones/Etiquetas */}
      <div className="flex justify-between items-center mt-4">
        {/* Badge de Estado (Conectado) */}
        <div className="h-8 w-24 rounded-full bg-gray-200"></div>
        
        {/* Botón de Acción (Desconectar) */}
        <div className="h-9 w-28 rounded-lg bg-gray-300"></div>
      </div>
    </div>
  </div>
  );
}