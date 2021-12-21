"use strict";

module.exports = {
  async getDeployments(ctx) {
    ctx.body = await strapi
      .plugin("deployments")
      .service("deployments")
      .getDeployments();
  },
  async getDeployment(ctx) {
    const { id } = ctx.params;
    ctx.body = await strapi
      .plugin("deployments")
      .service("deployments")
      .getDeployment(id);
  },
  getStagingSiteUrl(ctx) {
    ctx.body = strapi
      .plugin("deployments")
      .service("deployments")
      .getStagingSiteUrl();
  },
  getProductionSiteUrl(ctx) {
    ctx.body = strapi
      .plugin("deployments")
      .service("deployments")
      .getProductionSiteUrl();
  },
  async deployStaging(ctx) {
    ctx.body = await strapi
      .plugin("deployments")
      .service("deployments")
      .deployStaging();
  },
  async deployProduction(ctx) {
    ctx.body = await strapi
      .plugin("deployments")
      .service("deployments")
      .deployProduction();
  },
};
