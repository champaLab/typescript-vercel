"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("../../utils/jwt");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/cities/', jwt_1.verify, controllers_1.getCityController);
router.post('/cities', jwt_1.verify, validate_1.validateGetCitiesSchema, validate_1.validateResults, controllers_1.getCityByProIdController);
router.post('/cities/create/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createCityController);
router.post('/cities/update/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.updateCityController);
router.delete('/cities/delete/:id', jwt_1.verify, controllers_1.removeCityController);
exports.default = router;
//# sourceMappingURL=index.js.map