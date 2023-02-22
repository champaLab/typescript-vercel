"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../../../utils/jwt");
const validate_1 = require("../validate");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.post('/login', validate_1.validateLogin, validate_1.validateResults, controllers_1.userLoginController);
router.post('/verify', validate_1.validateVerify, validate_1.validateResults, controllers_1.userVerifyController);
router.post("/register", validate_1.validateUserRegister, validate_1.validateResults, controllers_1.userRegisterController);
router.post("/email-send-pin", validate_1.validateUserSendMail, validate_1.validateResults, controllers_1.userResendCodeEmailController);
router.post("/whatsapp-send-pin", validate_1.validateUserRegister, validate_1.validateResults, controllers_1.userResendCodeWhatsappController);
router.post('/me', jwt_1.verify, controllers_1.getMeController);
exports.default = router;
//# sourceMappingURL=index.js.map