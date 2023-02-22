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
exports.removeFestivalController = exports.createFestivalController = exports.getFestivalController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const getFestivalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const festival = yield (0, services_1.getFestivalService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(festival);
});
exports.getFestivalController = getFestivalController;
const createFestivalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const festival = yield (0, services_1.createFestivalService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(festival);
});
exports.createFestivalController = createFestivalController;
const removeFestivalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" });
    }
    const festival = yield (0, services_1.removeFestivalService)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(festival);
});
exports.removeFestivalController = removeFestivalController;
//# sourceMappingURL=controllers.js.map