"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const book_1 = __importDefault(require("./book"));
const bookTypes_1 = __importDefault(require("./bookTypes"));
const province_1 = __importDefault(require("./province"));
const city_1 = __importDefault(require("./city"));
const calendar_1 = __importDefault(require("./calendar"));
const festival_1 = __importDefault(require("./festival"));
const dashboard_1 = __importDefault(require("./dashboard"));
const contact_1 = __importDefault(require("./contact"));
const khamkhom_1 = __importDefault(require("./khamkhom"));
const router = (0, express_1.Router)();
router.use("/", users_1.default);
router.use("/", book_1.default);
router.use("/", bookTypes_1.default);
router.use("/", city_1.default);
router.use("/", province_1.default);
router.use("/", festival_1.default);
router.use("/", calendar_1.default);
router.use("/", dashboard_1.default);
router.use("/", contact_1.default);
router.use("/", khamkhom_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map