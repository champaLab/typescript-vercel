"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("../../utils/jwt");
const express_1 = require("express");
const services_1 = require("./services");
const router = (0, express_1.Router)();
router.get('/calendars/', controllers_1.getCalendarController);
router.post('/calendars/create/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createCalendarController);
router.delete('/calendars/delete/:id', jwt_1.verify, controllers_1.removeCalendarController);
router.post('/calendars/update', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, services_1.updateCalendarService);
router.get('/calendars/data-for-add', jwt_1.verify, controllers_1.getDataForAddCalendarController);
exports.default = router;
//# sourceMappingURL=index.js.map