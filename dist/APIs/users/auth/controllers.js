"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = exports.userResendCodeWhatsappController = exports.userResendCodeEmailController = exports.userRegisterController = exports.userUpdateEmailController = exports.userVerifyController = exports.userLoginController = void 0;
const jwt_1 = require("./../../../utils/jwt");
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const whatsapp_bot_1 = require("../../../utils/whatsapp-bot");
const services_2 = require("../services");
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body["username"];
    const loginBy = req.body["loginBy"];
    try {
        const user = yield (0, services_1.checkUserService)(username);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ຂໍ້ມູນຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ", status: "error" });
        }
        const code = yield (0, services_1.generateCodeService)(username);
        if (!code) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" });
        }
        if (loginBy === "whatsapp") {
            const whatsapp = user.whatsapp || '';
            (0, whatsapp_bot_1.whatsappBotVerifySender)(whatsapp, code);
        }
        else {
            // TODO: Call function sens mail
            (0, services_1.sendVerifyEmailService)(username, code);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success" });
    }
    catch (error) {
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.userLoginController = userLoginController;
const userVerifyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.body.key;
        const receive = req.body.receive;
        const check = yield (0, services_1.userVerifyService)(code, receive);
        if (!check || check.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ລະຫັດບໍ່ຖືກຕ້ອງ", status: "error" });
        }
        const user = yield (0, services_1.checkUserService)(receive);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ລະຫັດບໍ່ຖືກຕ້ອງ", status: "error" });
        }
        console.log('userVerifyController ', user);
        if (user && user.status !== 'On') {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ບັນຊີຂອງທ່ານ ຖືກລະງັບການໃຊ້ງານ ຊົ່ວຄາວ", status: "error" });
        }
        (0, services_1.deleteCodeService)(receive);
        const _user = {
            name: user.name,
            u_id: user.u_id,
            email: user.email,
            whatsapp: user.whatsapp,
            role: user.role,
        };
        let response = {
            status: "success",
            user: _user,
            token: '',
        };
        const token = yield (0, jwt_1.sign)(_user);
        response = Object.assign(Object.assign({}, response), { token, status: "success" });
        console.log(response);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.userVerifyController = userVerifyController;
const userUpdateEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const u_id = req.body.u_id;
    const email = req.body.email;
    const created_at = req.body.created_at;
    const result = yield (0, services_1.checkUserService)(email);
    console.log("7777 ", result);
    if (result.check_user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "Email ມີໃນລະບົບແລ້ວ ກະລຸນາໃຊ້ເມວອື່ນ",
        });
    }
    const user = yield (0, services_1.updateEmailService)(u_id, email, created_at);
    console.log(user);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "ອັບເດດ Email ຜິດພາດ",
        });
    }
    const code = yield (0, services_1.generateCodeService)(email);
    if (!code) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" });
    }
    try {
        // TODO: call function to send email
    }
    catch (error) {
        console.log("send whatsapp error ", error);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
});
exports.userUpdateEmailController = userUpdateEmailController;
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const whatsapp = req.body.whatsapp;
    const email = req.body.email;
    const role = "Member";
    const created_at = req.body.created_at;
    const resultW = yield (0, services_1.checkUserService)(whatsapp);
    if (resultW.check_user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
        });
    }
    const resultE = yield (0, services_1.checkUserService)(email);
    if (resultE.check_user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "Email ນີ້ມີໃນລະບົບແລ້ວ",
        });
    }
    const user = yield (0, services_2.userCreateService)({
        name,
        whatsapp: whatsapp,
        role,
        email,
        created_at,
        last_login: created_at
    });
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            status: "error",
            message: "ການລົງທະບຽນຜິດພາດ",
        });
    }
    const code = yield (0, services_1.generateCodeService)(whatsapp);
    if (!code) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" });
    }
    try {
        (0, whatsapp_bot_1.whatsappBotVerifySender)(whatsapp, code);
    }
    catch (error) {
        console.log("send whatsapp error ", error);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: " " });
});
exports.userRegisterController = userRegisterController;
const userResendCodeEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    console.log(email);
    const code = yield (0, services_1.generateCodeService)(email);
    if (!code) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" });
    }
    try {
        yield (0, services_1.sendVerifyEmailService)(email, code);
        return;
    }
    catch (error) {
        console.log("send email error ", error);
        return;
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
});
exports.userResendCodeEmailController = userResendCodeEmailController;
const userResendCodeWhatsappController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const whatsapp = req.body.whatsapp;
    const code = yield (0, services_1.generateCodeService)(whatsapp);
    if (!code) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" });
    }
    try {
        (0, whatsapp_bot_1.whatsappBotVerifySender)(whatsapp, code);
    }
    catch (error) {
        console.log("send whatsapp error ", error);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
});
exports.userResendCodeWhatsappController = userResendCodeWhatsappController;
const getMeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body.user;
    console.log('========================= USER REFRESH =======================================');
    console.log(user);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", user });
});
exports.getMeController = getMeController;
//# sourceMappingURL=controllers.js.map