"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("../../utils/jwt");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/festival/', jwt_1.verify, controllers_1.getFestivalController);
router.post('/festival/create/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createFestivalController);
router.delete('/festival/delete/:id', jwt_1.verify, controllers_1.removeFestivalController);
exports.default = router;
//# sourceMappingURL=index.js.map