import { useState, useEffect } from "react"
import { request } from "@strapi/helper-plugin"

/**
 * Get a single deployment
 *
 * @param {int} id The ID of the deployment
 * @returns The single deployment object
 */
const useDeployment = ({ id }) => {
  const [state, setState] = useState({
    error: null,
    isLoading: true,
    deployment: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request(`/deployments/get-deployment/${id}`, {
          method: "GET"
        })
        setState({ isLoading: false, deployment: data, error: null })
      } catch (e) {
        strapi.notification.error("notification.error")
        setState({ isLoading: false, error: e, deployment: null })
      }
    }

    fetchData()
  }, [])

  return state
}

export default useDeployment
