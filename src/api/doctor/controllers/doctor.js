"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::doctor.doctor", ({ strapi }) => ({
  // Doctor ish jadvalini sanaga qarab olish
  async getWorkTimeByDate(ctx) {
    const { date, time, doctorId } = ctx.request.query;

    if (!date || !doctorId) {
      return ctx.badRequest("date va doctorId majburiy");
    }

    // Sana → hafta kuni nomi
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const jsDate = new Date(date);
    const dayName = days[jsDate.getDay()];

    // Doctor ish jadvalini olish
    const doctor = await strapi.db.query("api::doctor.doctor").findOne({
      where: { id: doctorId },
      populate: { workSchedule: true },
    });

    if (!doctor) return ctx.badRequest("Doctor topilmadi");

    const workDay = doctor.workSchedule[dayName];
    if (!workDay) {
      return {
        available: false,
        message: "Bu kuni doctor ishlamaydi",
      };
    }

    // Vaqtni minutlarga aylantirish
    const toMinutes = (t) => {
      const [h, m] = t.split(":");
      return parseInt(h) * 60 + parseInt(m);
    };

    const startMinutes = toMinutes(workDay.start_time);
    const endMinutes = toMinutes(workDay.end_time);
    let timeAvailable = null;

    if (time) {
      const selectedMinutes = toMinutes(time);
      timeAvailable =
        selectedMinutes >= startMinutes && selectedMinutes <= endMinutes;
    }

    return {
      available: true,
      day: dayName,
      start_time: workDay.start_time,
      end_time: workDay.end_time,
      timeAvailable,
    };
  },

  // Mavjud partialUpdate funksiyang
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
