import { useEffect, useState } from "react";

export default function FormUsuarios({empresas, onSubmit , showForm, setShowForm, error, setError}) {
  const handleSetErrorState = (e) => {
    setError([error, error.state = false])
  }

  const resetForm = (e) => {
    const form = document.getElementById("close-button").closest("form");
    form.reset();
  }

  return (
    <div className={`${showForm ? 'flex' : 'hidden'} absolute top-0 left-0 items-center justify-center p-12 w-screen h-screen bg-gray-900/50`}>
      <div className="mx-auto w-full max-w-[550px] bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={onSubmit} className="relative z-20">
          <div className="absolute right-0">
            <button onClick={() => (resetForm(), setShowForm(!showForm), document.body.style.overflow = showForm ? "auto" : "hidden")} id="close-button" type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-5 flex flex-col">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email
              {error.state === true && <span className="text-red-500 text-xs flex animate-shake animate-once">{error.error}</span>}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onClick={handleSetErrorState}
              placeholder="ejemplo@ejemplo.com"
              className={`${ error.state ? 'border-red-500 ' : 'border-[#e0e0e0] '} focus:invalid:border-red-500 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-900 focus:shadow-md`}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Contrseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su contraseña"
              required
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-900 focus:shadow-md"
            />
          </div>
            <div className="mb-5">
              <label
                htmlFor="empresa"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Empresa
              </label>
              <select
                name="empresa"
                id="empresa"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-900 focus:shadow-md"
              >
                {empresas.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
          <div>
            <button type="submit" className="bg-blue-900 hover:bg-blue-800 cursor-pointer text-white px-4 py-2 rounded">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}