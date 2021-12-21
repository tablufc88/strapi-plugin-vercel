"use strict"
const fetch = require("node-fetch")

module.exports = ({ strapi }) => {
  const config = strapi.config.get("plugin.deployments")
  return {
    async getDeployments() {
      const res = await fetch(
        `https://api.vercel.com/v5/now/deployments?projectId=${
          config.projectId
        }${config.teamId && `&teamId=${config.teamId}&limit=10`}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.token}`
          }
        }
      )
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error("Failed to fetch deployments")
      }
      return json.deployments
    },
    async getDeployment(id) {
      const res = await fetch(
        `https://api.vercel.com/v10/now/deployments/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.token}`
          }
        }
      )
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error("Failed to fetch deployment")
      }
      return json
    },
    getStagingSiteUrl() {
      return { url: config.stagingSiteUrl }
    },
    getProductionSiteUrl() {
      return { url: config.productionSiteUrl }
    },
    async deployStaging() {
      const res = await fetch(config.deployStaging, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error("Failed to deploy")
      } else {
        return json
      }
    },

    async deployProduction() {
      const res = await fetch(config.deployProduction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error("Failed to deploy")
      } else {
        return json
      }
    }
  }
}
