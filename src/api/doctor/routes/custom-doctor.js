module.exports = {
  routes: [
    {
      method: "GET",
      path: "/doctors/worktime",
      handler: "doctor.getWorkTimeByDate",
      config: {
        auth: false,
      },
    },
  ],
};
