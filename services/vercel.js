"use strict";
const fetch = require("node-fetch");

/**
 * vercel.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  async getDeployments() {
    const res = await fetch(
      `https://api.vercel.com/v5/now/deployments?projectId=${this._getProjectId()}${
        this._getTeamId() && `&teamId=${this._getTeamId()}&limit=10`
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._getToken()}`,
        },
      }
    );
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch deployments");
    }

    return json.deployments;
  },

  async getDeployment(id) {
    const res = await fetch(
      `https://api.vercel.com/v10/now/deployments/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._getToken()}`,
        },
      }
    );
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch deployment");
    }

    return json;
  },

  async deployStaging() {
    const res = await fetch(this._getDeployStaging(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to deploy");
    } else {
      return json;
    }
  },

  async deployProduction() {
    const res = await fetch(this._getDeployProduction(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to deploy");
    } else {
      return json;
    }
  },

  async stagingSiteUrl() {
    return { url: this._getStagingSiteUrl() };
  },

  async productionSiteUrl() {
    return { url: this._getProductionSiteUrl() };
  },

  _getToken() {
    const conf = strapi.config.plugins.vercel.token;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.token";
    return conf;
  },
  _getProjectId() {
    const conf = strapi.config.plugins.vercel.projectId;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.projectId";
    return conf;
  },
  _getTeamId() {
    const conf = strapi.config.plugins.vercel.teamId;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.teamId";
    return conf;
  },
  _getDeployStaging() {
    const conf = strapi.config.plugins.vercel.deployStaging;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.deployStaging";
    return conf;
  },
  _getDeployProduction() {
    const conf = strapi.config.plugins.vercel.deployProduction;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.deployProduction";
    return conf;
  },
  _getStagingSiteUrl() {
    const conf = strapi.config.plugins.vercel.stagingSiteUrl;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.stagingSiteUrl";
    return conf;
  },
  _getProductionSiteUrl() {
    const conf = strapi.config.plugins.vercel.productionSiteUrl;
    if (!conf) throw "[strapi-plugin-vercel] Missing vercel.productionSiteUrl";
    return conf;
  },
};
