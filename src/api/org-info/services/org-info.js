'use strict';

/**
 * org-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::org-info.org-info');
