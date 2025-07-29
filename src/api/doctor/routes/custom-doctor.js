"use strict";

module.exports = {
  routes: [
    {
      method: "PATCH",
      path: "/doctors/:id",
      handler: "api::doctor.doctor.partialUpdate", 
      config: {
        policies: [],
      },
    },
  ],
};
