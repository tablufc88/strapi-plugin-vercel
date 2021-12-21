import { useState, useEffect } from "react"
import { request } from "@strapi/helper-plugin"

/**
 * Get the staging site URL
 *
 * @returns the staging site url
 */
const useStagingSiteUrl = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    stagingSiteUrl: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request("/deployments/get-staging-site-url", {
          method: "GET"
        })
        const stagingSiteUrl = data.url
        setState({ error: null, isLoading: false, stagingSiteUrl })
      } catch (e) {
        strapi.notification.error("notification.error")
        setState({ error: e, isLoading: false, stagingSiteUrl: null })
      }
    }
    fetchData()
  }, [])

  return state
}

export default useStagingSiteUrl
