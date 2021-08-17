"use strict";

/**
 * vercel.js controller
 *
 * @description: A set of functions called "actions" of the `vercel` plugin.
 */

module.exports = {
  async find(ctx) {
    try {
      const data = await strapi.plugins.vercel.services.vercel.getDeployments();
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    try {
      const data = await strapi.plugins.vercel.services.vercel.getDeployment(
        id
      );
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async deployStaging(ctx) {
    try {
      const data = await strapi.plugins.vercel.services.vercel.deployStaging();
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async deployProduction(ctx) {
    try {
      const data =
        await strapi.plugins.vercel.services.vercel.deployProduction();
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async stagingSiteUrl(ctx) {
    try {
      const data = await strapi.plugins.vercel.services.vercel.stagingSiteUrl();
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
  async productionSiteUrl(ctx) {
    try {
      const data =
        await strapi.plugins.vercel.services.vercel.productionSiteUrl();
      ctx.send(data);
    } catch (e) {
      ctx.send({ error: e }, 400);
    }
  },
};
