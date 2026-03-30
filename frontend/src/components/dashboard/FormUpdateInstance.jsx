export default function FormUpdateInstance({showForm, setShowForm, onSubmit, instancia}) {
  
  const resetForm = (e) => {
    const form = document.getElementById("close-buttonUpdateInstance").closest("form");
    form.reset();
  }

  return (
     <div className={`${showForm ? 'flex' : 'hidden'} absolute top-0 left-0 items-center justify-center p-12 w-screen h-screen bg-gray-900/50`}>
      <div className="mx-auto w-full max-w-[550px] bg-white p-8 rounded-lg shadow-lg">
        <form 
          onSubmit={(e)=>{
            e.preventDefault(),
            onSubmit(instancia.id,{"name_vendor": e.target.name_vendor.value, "position_vendor": e.target.position_vendor.value})}} 
          className="relative z-20"
        >
          <div className="absolute right-0">
            <button onClick={() => (resetForm(), setShowForm(!showForm), document.body.style.overflow = showForm ? "auto" : "hidden")} id="close-buttonUpdateInstance" type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <label
              htmlFor="name_vendor"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nombre Vendedor
            </label>
            <input
              type="text"
              name="name_vendor"
              id="name_vendor"
              required
              placeholder="Nombre del vendedor"
              className="focus:invalid:border-red-500 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-900 focus:shadow-md"
              defaultValue={instancia?.name_vendor || ""}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="position_vendor"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Cargo Vendedor
            </label>
            <input
              type="text"
              name="position_vendor"
              defaultValue={instancia?.position_vendor || ""}
              id="position_vendor"
              placeholder="Cargo del vendedor"
              className="focus:invalid:border-red-500 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-900 focus:shadow-md"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-blue-900 py-3 px-8 text-base font-semibold text-white outline-none hover:bg-blue-800 cursor-pointer"
            >
              Actualizar Instancia
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}