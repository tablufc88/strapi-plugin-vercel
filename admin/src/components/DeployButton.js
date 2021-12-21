import React, { useState } from "react"
import { Button } from "@strapi/design-system"
import { request } from "@strapi/helper-plugin"

const DeployButton = ({ to, ...rest }) => {
  const [state, setState] = useState({
    loading: false
  })

  const onClick = async () => {
    setState({ loading: true })
    try {
      const data = await request(`/deployments/deploy-${to}`, {
        method: "POST"
      })
      window.location.reload()
      return data
    } catch (e) {
      strapi.notification.error("notification.error")
    }
  }

  return (
    <Button {...rest} loading={state.loading} onClick={onClick}>
      {`Deploy to ${to}`}
    </Button>
  )
}

export default DeployButton
