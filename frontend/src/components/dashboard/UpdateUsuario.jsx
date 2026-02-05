export default function UpdateUsuario({showForm, setShowForm, onSubmit, usuario}) {
  
  const resetForm = (e) => {
    const form = document.getElementById("close-buttonUpdateUsuario").closest("form");
    form.reset();
  }

  return (
     <div className={`${showForm ? 'flex' : 'hidden'} absolute top-0 left-0 items-center justify-center p-12 w-screen h-screen bg-gray-900/50`}>
      <div className="mx-auto w-full max-w-[550px] bg-white p-8 rounded-lg shadow-lg">
        <form 
          onSubmit={(e)=>{
            e.preventDefault(),
            onSubmit({"user_id":usuario.id,"new_password": e.target.new_password.value})}} 
          className="relative z-20"
        >
          <div className="absolute right-0">
            <button onClick={() => (resetForm(), setShowForm(!showForm), document.body.style.overflow = showForm ? "auto" : "hidden")} id="close-buttonUpdateUsuario" type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <label
              htmlFor="new_password"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Nueva Contraseña
            </label>
            <input
              type="text"
              name="new_password"
              id="new_password"
              required
              placeholder="Nueva Contraseña"
              className="focus:invalid:border-red-500 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-900 focus:shadow-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-blue-900 py-3 px-8 text-base font-semibold text-white outline-none hover:bg-blue-800 cursor-pointer"
            >
              Actualizar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}