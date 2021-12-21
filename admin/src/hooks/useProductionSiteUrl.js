import { useState, useEffect } from "react"
import { request } from "@strapi/helper-plugin"

const useProductionSiteUrl = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    productionSiteUrl: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request("/deployments/get-production-site-url", {
          method: "GET"
        })
        const productionSiteUrl = data.url
        setState({ error: null, isLoading: false, productionSiteUrl })
      } catch (e) {
        strapi.notification.error("notification.error")
        setState({ error: e, isLoading: false, productionSiteUrl: null })
      }
    }
    fetchData()
  }, [])

  return state
}

export default useProductionSiteUrl
