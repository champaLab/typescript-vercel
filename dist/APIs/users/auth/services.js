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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerifyEmailService = exports.updateEmailService = exports.deleteCodeService = exports.checkUserService = exports.userVerifyService = exports.generateCodeService = exports.userLoginService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_config_1 = __importDefault(require("../../../utils/mail-config"));
const transport = nodemailer_1.default.createTransport(mail_config_1.default);
const userLoginService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const last_login = new Date();
        let user = yield (0, exports.checkUserService)(email);
        const id = user === null || user === void 0 ? void 0 : user.u_id;
        if (user) {
            yield prisma_1.default.$queryRaw `UPDATE tbl_users SET last_login = ${last_login} WHERE id = ${id}`;
        }
        console.log("find use: ", user);
        if (!user)
            return null;
        return user;
    }
    catch (error) {
        console.error(error);
    }
});
exports.userLoginService = userLoginService;
const generateCodeService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created_at = new Date();
        const min = 100000;
        const max = 999999;
        const code = Math.floor(Math.random() * (max - min + 1)) + min;
        yield prisma_1.default.tbl_verify_login.upsert({
            where: { username },
            create: { username, code, created_at },
            update: { code, created_at },
        });
        return code;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.generateCodeService = generateCodeService;
const userVerifyService = (code, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rs = yield prisma_1.default.$queryRaw `SELECT * FROM tbl_verify_login WHERE code = ${code} AND username = ${username}`;
        return rs;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.userVerifyService = userVerifyService;
const checkUserService = (receive) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield prisma_1.default.tbl_users.findFirst({ where: { OR: [{ whatsapp: receive }, { email: receive }] } });
        console.log("check user: ", user);
        let check_user = false;
        if (user)
            check_user = true;
        return Object.assign(Object.assign({}, user), { check_user });
    }
    catch (error) {
        console.error(error);
        return { check_user: false };
    }
});
exports.checkUserService = checkUserService;
const deleteCodeService = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield prisma_1.default.$queryRaw `DELETE  FROM tbl_verify_login WHERE username = ${username}`;
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteCodeService = deleteCodeService;
const updateEmailService = (u_id, email, updated_at) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield prisma_1.default.tbl_users.update({
            where: { u_id },
            data: { email, updated_at }
        });
        return user;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateEmailService = updateEmailService;
const sendVerifyEmailService = (email, pinCode) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `<div className="">
        <h1 style="text-align: center;">ຢືນຢັນການເຂົ້າສູ່ລະບົບ</h1>
        <div style="margin-bottom: .8rem; font-size: 1.3rem;">ສະບາຍດີ KOB DEV,</div>
        <div class=""> ການຮ້ອງຂໍເຂົ້າໃຊ້ງານລະບົບ ມົນພິທີດ້ວຍບັນຊີ ${email}. ເພື່ອສືບຕໍ່ການຮ້ອງຂໍນີ້,
            ກະລຸນາໃສ່ລະຫັດຂ້າງລຸ່ມນີ້ໃນຫນ້າການຢັ້ງຢັນຕົວຕົນ:</div>
        <div style="font-size: 2rem; font-weight: 800;margin-bottom: 1rem;">${pinCode}</div>
        <div class="">ຫາກບໍ່ແມ່ນທ່ານເຄື່ອນໄຫວ ກະລຸນາຢ່ານຳລະຫັດດັ່ງກ່າວໃຫ້ບຸກຄົນອື່ນ ເພື່ອຄວາມປອດໄພ. </div>
        <div style="margin-top: 1rem;">ດ້ວຍຄວາມນັບຖື,</div>
        <div class="">ສະຫນັບສະຫນູນໂດຍ ມົນພິທີ</div>
    </div>
        `;
    const mailOption = {
        from: '"Monpity"<nopreply@monpity.la>',
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: html
    };
    try {
        const res = yield transport.sendMail(mailOption);
        if (res) {
            console.log("<-------------------------------------------------------------------->\n");
            console.log(`> Mail verify is sent to      ------------->        ${email}`);
            console.log(res);
            console.log("\n<-------------------------------------------------------------------->\n");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.sendVerifyEmailService = sendVerifyEmailService;
//# sourceMappingURL=services.js.map