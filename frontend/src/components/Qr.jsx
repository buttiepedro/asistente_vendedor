import Spiner from "./Spiner";
export default function Qr({ qrCodeUrl, showQr, setShowQr}) {
  return (
    <div className={`${showQr ? 'flex' : 'hidden'} absolute top-0 left-0 items-center justify-center p-12 w-screen h-screen bg-gray-900/50 z-20`}>
      <div className={`${showQr ? 'flex' : 'hidden'} relative flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md mx-auto w-full max-w-[550px] z-20`}>
        <div className="absolute top-0 right-0 p-5">
          <button onClick={() => (setShowQr(!showQr), document.body.style.overflow = showQr ? "auto" : "hidden")} id="close-button" type="button" className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Escanea el código QR</h2>
        {showQr && !qrCodeUrl && (
          <Spiner />
        )}
        {qrCodeUrl && (
          <img src={qrCodeUrl} alt="Código QR" className="w-48 h-48 mb-4" />
        )}
        <p className="text-gray-600">Utiliza tu aplicación de WhatsApp para escanear el código QR y conectar tu cuenta.</p>
      </div>
    </div>
  );
}