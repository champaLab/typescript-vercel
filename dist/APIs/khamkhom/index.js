"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("../../utils/jwt");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/khamkhom/random', controllers_1.randomKhamkhomController);
router.get('/khamkhom', controllers_1.getKhamkhomController);
router.post('/khamkhom/update', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.updateKhamkhomController);
router.delete('/khamkhom/delete/:id', jwt_1.verify, controllers_1.deleteKhamkhomController);
router.get('/khamkhom/by-user-id', jwt_1.verify, controllers_1.getKhamkhomControllerByUserId);
router.post('/khamkhom/create', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createKhamkhomController);
exports.default = router;
//# sourceMappingURL=index.js.map