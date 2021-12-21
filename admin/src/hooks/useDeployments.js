import { useState, useEffect } from "react"
import { request } from "@strapi/helper-plugin"

const useDeployments = () => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployments: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deployments = await request("/deployments/get-deployments", {
          method: "GET"
        })
        setState({ isLoading: false, deployments, error: null })
      } catch (e) {
        strapi.notification.error("notification.error")
        setState({ isLoading: false, error: e, deployments: [] })
      }
    }

    fetchData()
  }, [])

  return state
}

export default useDeployments
