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
exports.removeCityController = exports.createCityController = exports.updateCityController = exports.getCityByProIdController = exports.getCityController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const City = yield (0, services_1.getCityService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
});
exports.getCityController = getCityController;
const getCityByProIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pro_id = req.body.province_id;
    const City = yield (0, services_1.getCityByProIdService)(pro_id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
});
exports.getCityByProIdController = getCityByProIdController;
const updateCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const City = yield (0, services_1.updateCityService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
});
exports.updateCityController = updateCityController;
const createCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const City = yield (0, services_1.createCityService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
});
exports.createCityController = createCityController;
const removeCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" });
    }
    const City = yield (0, services_1.removeCityService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
});
exports.removeCityController = removeCityController;
//# sourceMappingURL=controllers.js.map