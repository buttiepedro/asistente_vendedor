export default function Pagination({currentPage, totalPages, esEmpresas, totalItems, onPageChange}) {
  return (
    <div className="flex items-center justify-center border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex items-center sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-600">
            Pagina <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>{' - '}Resultados totales:
            <span className="font-medium"> {totalItems}</span>
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">
            <a
              onClick={()=> {
                if (currentPage <= 1){
                  return
                }
                onPageChange(currentPage - 1,esEmpresas)
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 cursor-pointer z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:stroke-blue-900 active:stroke-blue-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>  
            </a>
            {/* Funcion para mostrar solo 5 paginas, sison las 2 primeras mostrar las 3 siguientes pero si son las 2 ultimas mostras las 3 anteriores */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (currentPage <= 3) {
                pageNumber = i + 1;
              }
              else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              }
              else {
                pageNumber = currentPage - 2 + i;
              }
              return pageNumber;
            }).map(i => (
              <a
                key={i}
                onClick={() => onPageChange(i,esEmpresas)}
                className={`${i === currentPage ? 'bg-white/10 text-black' : 'text-gray-400 hover:bg-white/5'} relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 cursor-pointer`}
              >
                {i}
              </a>
            ))}            
            <a
              onClick={()=> {
                if (currentPage >= totalPages){
                  return
                }
                onPageChange(currentPage + 1,esEmpresas)
              }}
              className=" cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="z-0 size-6 hover:stroke-blue-900 active:stroke-blue-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
