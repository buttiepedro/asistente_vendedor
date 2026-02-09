const ConnectionCard = ({ title, name, phone, followers, messages, avatarUrl, estado, conectarInstancia, desconectarInstancia }) => {
  return (
    <div key={name} className="w-full max-w-md bg-white text-slate-800 p-6 rounded-xl border border-slate-200 font-sans shadow-sm flex flex-col justify-between">
      
      {/* User Info Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="rounded-full overflow-hidden block w-12 h-12 border border-slate-200">
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className=""
              />
            </span>
            {/* Indicador visual de estado pequeño */}
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${estado === "open" ? "bg-green-500" : "bg-red-500"}`}></span>
          </div>
          <div>
            <h4 className="font-bold text-lg leading-tight text-[#1e3a8a]">{name}</h4>
            <p className="text-slate-500 text-sm font-medium">{phone}</p>
          </div>
        </div>

        {/* Stats - Iconos en el azul del header de tu imagen */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#25408f]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="text-sm font-bold text-slate-700">{followers}</span>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#25408f]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span className="text-sm font-bold text-slate-700">{messages}</span>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="flex justify-between items-center">
        <span className={`${
          estado === "open" ? "bg-green-100 text-green-700 border-green-200" : 
          estado === "close" ? "bg-red-100 text-red-700 border-red-200" : 
          "bg-amber-100 text-amber-700 border-amber-200"
        } px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider`}>
          {estado === "open" ? "Conectado" : estado === "close" ? "Desconectado" : "Conectando"}
        </span>

        { estado === "open" ? (
          <button 
            onClick={desconectarInstancia} 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-1.5 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95"
          >
            Desconectar
          </button>
        ) : estado === "connecting" ? (
          <button onClick={conectarInstancia} className="bg-slate-200 hover:bg-slate-300 cursor-pointer px-6 py-1.5 rounded-lg text-sm font-bold text-slate-500 border border-slate-300">
            Ver Qr
          </button>
        ) : (
          <button 
            onClick={conectarInstancia} 
            className="bg-[#25408f] hover:bg-[#1a2e66] text-white px-6 py-1.5 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95"
          >
            Conectar
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;