'use strict';

/**
 * book-appointment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-appointment.book-appointment');
