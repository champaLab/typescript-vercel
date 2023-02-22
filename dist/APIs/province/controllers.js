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
exports.removeProvinceController = exports.createProvinceController = exports.updateProvinceController = exports.getProvinceController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getProvinceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Province = yield (0, services_1.getProvinceService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
});
exports.getProvinceController = getProvinceController;
const updateProvinceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Province = yield (0, services_1.updateProvinceService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
});
exports.updateProvinceController = updateProvinceController;
const createProvinceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Province = yield (0, services_1.createProvinceService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
});
exports.createProvinceController = createProvinceController;
const removeProvinceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" });
    }
    const Province = yield (0, services_1.removeProvinceService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
});
exports.removeProvinceController = removeProvinceController;
//# sourceMappingURL=controllers.js.map