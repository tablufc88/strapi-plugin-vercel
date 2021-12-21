module.exports = [
  {
    method: "GET",
    path: "/get-deployments",
    handler: "deployments.getDeployments",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/get-deployment/:id",
    handler: "deployments.getDeployment",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/get-staging-site-url",
    handler: "deployments.getStagingSiteUrl",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/get-production-site-url",
    handler: "deployments.getProductionSiteUrl",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/deploy-staging",
    handler: "deployments.deployStaging",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/deploy-production",
    handler: "deployments.deployProduction",
    config: {
      policies: []
    }
  }
]
