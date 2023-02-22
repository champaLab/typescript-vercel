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
exports.validateResults = exports.validateSearchSchema = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('title')
        .not().isEmpty()
        .withMessage("ກະລຸນາເພີ່ມຫົວຂໍ້"),
    (0, express_validator_1.check)('content')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມເນື້ອຫາ'),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ'),
    (0, express_validator_1.check)('book_type_id')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກໝວດໝູ່ໜັງສື')
        .isNumeric()
        .withMessage("ໝວດໝູ່ໜັງສື ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
];
exports.validateSearchSchema = [
    (0, express_validator_1.check)('key')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຄຳຄົ້ນຫາ"),
];
const validateResults = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    next();
});
exports.validateResults = validateResults;
//# sourceMappingURL=validate.js.map