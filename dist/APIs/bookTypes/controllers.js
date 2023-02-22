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
exports.removeBookTypeController = exports.createBookTypeController = exports.getBookTypeController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getBookTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, services_1.getBookTypesService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.getBookTypeController = getBookTypeController;
const createBookTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.json({ status: "error", message: "ກະລຸນາອັບໂຫຼດ ໄອຄອນ" });
    }
    const book = yield (0, services_1.createBookTypesService)(req.body, req.file.path);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.createBookTypeController = createBookTypeController;
const removeBookTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" });
    }
    const book = yield (0, services_1.removeBookTypesService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.removeBookTypeController = removeBookTypeController;
//# sourceMappingURL=controllers.js.map