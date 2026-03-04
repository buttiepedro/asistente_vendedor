import { use, useEffect,useState } from "react"
import api from "../../services/api"


export default function DashboardEmpresas() {
  const [lookerUrl, setLookerUrl] = useState("")


  useEffect(() => {
    getLookerUrl()
  }, [])

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
        <div className="flex flex-row justify-center gap-6 flex-wrap mb-8 h-800">
        <iframe 
          width="80%" 
          height="auto" 
          src={lookerUrl} 
          frameborder="0" 
          style={{ border: 0,height: "100%" }} 
          allowFullScreen 
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
      </div>
      )
      :
      ""
      }
    </>
  )
}
