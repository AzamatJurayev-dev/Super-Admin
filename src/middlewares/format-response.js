// src/middlewares/format-response.js
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Faqat /api bilan boshlansa ishlaydi
    if (!ctx.request.url.startsWith("/api")) {
      return next();
    }

    await next();

    if (ctx.body && ctx.body.data !== undefined) {
      ctx.body.data = formatEntity(ctx.body.data);
    }
  };
};

function formatEntity(entity) {
  if (entity === null) return null;

  if (Array.isArray(entity)) {
    return entity.map(formatEntity);
  }

  if (
    typeof entity === "object" &&
    entity !== null &&
    entity.attributes &&
    typeof entity.attributes === "object"
  ) {
    const formatted = {
      id: entity.id,
      ...entity.attributes,
    };

    for (const key in formatted) {
      if (formatted[key] !== null && typeof formatted[key] === "object") {
        formatted[key] = formatEntity(formatted[key]);
      }
    }

    return formatted;
  }

  if (typeof entity === "object" && entity !== null) {
    for (const key in entity) {
      if (entity[key] !== null && typeof entity[key] === "object") {
        entity[key] = formatEntity(entity[key]);
      }
    }
    return entity;
  }

  return entity;
}
