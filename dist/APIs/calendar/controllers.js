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
exports.getDataForAddCalendarController = exports.removeCalendarController = exports.createCalendarController = exports.getCalendarController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getCalendarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Calendar = yield (0, services_1.getCalendarService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
});
exports.getCalendarController = getCalendarController;
const createCalendarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Calendar = yield (0, services_1.createCalendarService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
});
exports.createCalendarController = createCalendarController;
const removeCalendarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    console.log(id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" });
    }
    const Calendar = yield (0, services_1.removeCalendarService)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
});
exports.removeCalendarController = removeCalendarController;
const getDataForAddCalendarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Calendar = yield (0, services_1.getDataForAddCalendarService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
});
exports.getDataForAddCalendarController = getDataForAddCalendarController;
//# sourceMappingURL=controllers.js.map