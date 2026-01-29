export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop (Fondo oscuro) */}
      <div 
        className="fixed inset-0 bg-gray-900/50 bg-opacity-50 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Contenedor del Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
        
        {/* Icono de advertencia (Opcional) */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <span className="text-red-600 text-xl">⚠️</span>
        </div>

        {/* Texto */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {title || "¿Estás seguro?"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {message || "Esta acción no se puede deshacer. ¿Deseas continuar?"}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="cursor-pointer flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};