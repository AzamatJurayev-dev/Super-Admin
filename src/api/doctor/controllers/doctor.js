"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::doctor.doctor", ({ strapi }) => ({
  async partialUpdate(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    const existingEntry = await strapi.entityService.findOne(
      "api::doctor.doctor",
      id
    );
    if (!existingEntry) {
      return ctx.notFound("Doctor not found");
    }

    const updated = await strapi.entityService.update(
      "api::doctor.doctor",
      id,
      {
        data,
      }
    );

    return updated;
  },
}));
