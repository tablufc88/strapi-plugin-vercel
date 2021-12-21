"use strict";

// Add permissions
const RBAC_ACTIONS = [
  {
    section: "plugins",
    displayName: "Access the Deployments",
    uid: "read",
    pluginName: "deployments",
  },
  // {
  //   section: "settings",
  //   displayName: "Access the deployments staging URL",
  //   uid: "stagingUrl.read",
  //   pluginName: "deployments",
  // },
];

module.exports = async ({ strapi }) => {
  await strapi.admin.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS
  );

  const pluginStore = strapi.store({
    environment: "",
    type: "plugin",
    name: "deployments",
  });

  const config = await pluginStore.get({ key: "config" });

  if (!config) {
    pluginStore.set({ key: "config", value: { restrictedAccess: false } });
  }

  // await strapi
  //   .plugin('deployments')
  //   .service('deployments')
  //   .generateFullDoc();
};
