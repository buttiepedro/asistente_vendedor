import { use, useEffect,useState } from "react"
import api from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import Qr from "../Qr"
import ConnectionCard from "../ConnectionCard"
import ConnectionCardSkeleton from "../Skeleton/ConnectionCardSkeleton"
import ConfirmationModal from '../ConfirmationModal.jsx'
import userIMG from "../../assets/user.png"

export default function Dashboard() {
  const { user } = useAuth()
  const [showModalInstancia, setShowModalInstancia] = useState(false)
  const [instances, setInstances] = useState([])
  const [instancesBack, setInstancesBack] = useState([])
  const [QrData, setQrData] = useState(null)
  const [showQr, setShowQr] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedInstance, setSelectedInstance] = useState(null)
  const [lookerUrl, setLookerUrl] = useState("")

  const [error, setError] = useState()
  const [errorCrear, setErrorCrear] = useState({
    error: null, 
    state: false,
  })

  useEffect(() => {
    getInstanceBack()
    setQrData(null)
  }, [showQr])

    const getInstance = () => {
    api.get("/instances/")
      .then(res => {
        setLoading(false)
        setInstances(res.data)
      })
      .catch(err => {
        console.error("Error en evoApi:", err)
      }
    )   
  }
  useEffect(() => {
    getLookerUrl()
  }, [])

  const getInstanceBack = () => {
    api.get("/instances/instancesdb")
      .then(res => {
        setInstancesBack(res.data)
        getInstance()
      })
      .catch(err => {
        console.error("Error en evoApi:", err)
      }
    )   
  }
  
  const conectarInstancia = (instanceName) => {
    api.get(`/instances/qr/${instanceName}`)
      .then(res => {
        setQrData(res.data)
      })
      .catch(err => {
        console.error("Error en evoApi:", err)
      }
    ).then(() => {
      getInstance()
      setLoading(false)
    })
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden"
    setShowQr(true)
  }

  const desconectarInstancia = (instanceName) => {
    api.delete(`/instances/logout/${instanceName}`)
      .then(res => {
        console.log(res.data)
        getInstance()
        setShowModalInstancia(false)
        setQrData(null)
      })
      .catch(err => {
        console.error("Error en evoApi:", err)
      }
    )
  }


  const getLookerUrl = () => {
    api.get("companies/looker_url")
      .then(res => {  
        setLookerUrl(res.data.looker_url)
      }
      )
      .catch(err => {
        console.error("Error en evoApi:", err)
      }
    )
  }

  return (
    <>
      {lookerUrl ? (
        <div className="flex flex-row justify-center gap-6 flex-wrap mb-8">
        <iframe 
          width="80%" 
          height="1750" 
          src={lookerUrl} 
          frameborder="0" 
          style={{ border: 0 }} 
          allowFullScreen 
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
      </div>
      )
      :
      ""
      }
      <div className="">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-sky-950">Mis Lineas</h1>
        </div>
      </div>
      <Qr qrCodeUrl={QrData?.base64} showQr={showQr} setShowQr={setShowQr} />
        <div className="flex flex-row justify-center gap-6 flex-wrap mb-8">
        {loading ? 
          instancesBack.map((_, index) => (
            <ConnectionCardSkeleton key={index} />
          ))
         : 
         <>
          {instances.map((instance) => (
            <ConnectionCard 
              title={instance.name} 
              name={instance.profileName}  
              phone={instance.ownerJid?.split('@')[0]} 
              followers={instance._count.Contact} 
              messages={instance._count.Message} 
              avatarUrl={instance.profilePicUrl || userIMG} 
              estado={instance.connectionStatus}
              conectarInstancia={() => conectarInstancia(instance.name)}
              desconectarInstancia={() => {
                setSelectedInstance(instance);
                setShowModalInstancia(true);
              }}
            /> 
          ))}
           <ConfirmationModal 
              isOpen={showModalInstancia} 
              onClose={() => setShowModalInstancia(false)} 
              onConfirm={() => desconectarInstancia(selectedInstance?.name)}
              title="Confirmar Desconexión"
              message={`¿Estás seguro de que quieres desconectar el número ${selectedInstance?.ownerJid?.split('@')[0]}?`}
            />
          </>
        }
        
        </div>
    </>
  )
}
