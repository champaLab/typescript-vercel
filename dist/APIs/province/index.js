"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("../../utils/jwt");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/provinces/', jwt_1.verify, controllers_1.getProvinceController);
router.post('/provinces/create/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createProvinceController);
router.post('/provinces/update/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.updateProvinceController);
router.delete('/provinces/delete/:id', jwt_1.verify, controllers_1.removeProvinceController);
exports.default = router;
//# sourceMappingURL=index.js.map