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
exports.validateResults = exports.validateVerify = exports.validateLogin = exports.validateUserSendMail = exports.validateUserUpdate = exports.validateUserUpdateEmail = exports.validateUserRegister = exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
exports.validateUser = [
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້")
        .isLength({ min: 3 })
        .withMessage("ຊື່ຜູ້ໃຊ້ຄວນມີຢ່າງໜ້ອຍ 3 ໂຕ")
        .matches(/^[A-Za-z0-9 .,'!&]+$/),
    // .withMessage("ບໍ່ຄວນມີຕົວອັກສອນພິເສດ"),
    (0, express_validator_1.check)("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນອີເມວ")
        .isEmail()
        .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
    (0, express_validator_1.check)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນລະຫັດຜ່ານ")
        .isLength({ min: 8 })
        .withMessage("ລະຫັດຜ່ານຄວນມີຢ່າງໜ້ອຍ 8 ໂຕ")
        .custom((password, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body.confirm_password !== password) {
            throw new Error('ລະຫັດຜ່ານ ບໍ່ກົງກັນ');
        }
    })),
    (0, express_validator_1.check)("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
];
exports.validateUserRegister = [
    (0, express_validator_1.check)("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້")
        .isLength({ min: 3 })
        .withMessage("ຊື່ຜູ້ໃຊ້ຄວນມີຢ່າງໜ້ອຍ 3 ໂຕ"),
    // .matches(/^[A-Za-z0-9 .,'!&]+$/),
    // .withMessage("ບໍ່ຄວນມີຕົວອັກສອນພິເສດ"),
    // check("email")
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage("ກະລຸນາປ້ອນອີເມວ")
    //     .isEmail()
    //     .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
    (0, express_validator_1.check)("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ whatsapp")
        .isLength({ min: 13 })
        .withMessage("whatsapp ຄວນມີຕົວເລກ 13 ໂຕ"),
    (0, express_validator_1.check)('created_at')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ')
];
exports.validateUserUpdateEmail = [
    (0, express_validator_1.check)("u_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ID"),
    (0, express_validator_1.check)('email')
        .not().isEmpty()
        .withMessage('ກະລຸນາປ້ອນ Email'),
    (0, express_validator_1.check)('created_at')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ'),
];
exports.validateUserUpdate = [
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້")
        .isLength({ min: 3 })
        .withMessage("ຊື່ຜູ້ໃຊ້ຄວນມີຢ່າງໜ້ອຍ 3 ໂຕ"),
    (0, express_validator_1.check)("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນອີເມວ")
        .isEmail()
        .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
    (0, express_validator_1.check)("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
];
exports.validateUserSendMail = [
    (0, express_validator_1.check)("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນອີເມວ")
        .isEmail()
        .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
];
exports.validateLogin = [
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ WhatsApp Or Email"),
];
exports.validateVerify = [
    (0, express_validator_1.check)("receive")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ WhatsApp Or Email"),
    (0, express_validator_1.check)("key")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຢືນຢັນ")
];
function validateResults(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                errors: errors.array(),
            });
        next();
    });
}
exports.validateResults = validateResults;
//# sourceMappingURL=validate.js.map