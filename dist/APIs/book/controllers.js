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
exports.getBookSearchController = exports.getBookByBookTypeController = exports.removeBookController = exports.createBookController = exports.updateBookController = exports.getMyBookController = exports.adminApproveBookController = exports.editorApproveBookController = exports.adminGetNewBookController = exports.editorGetNewBookController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const editorGetNewBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const book = yield (0, services_1.editorGetNewBookService)(user);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.editorGetNewBookController = editorGetNewBookController;
const adminGetNewBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, services_1.adminGetNewBookService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.adminGetNewBookController = adminGetNewBookController;
const editorApproveBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, services_1.editorApproveBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.editorApproveBookController = editorApproveBookController;
const adminApproveBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, services_1.adminApproveBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.adminApproveBookController = adminApproveBookController;
const getMyBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    const book = yield (0, services_1.getMyBookService)(user);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.getMyBookController = getMyBookController;
const updateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, services_1.updateBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.updateBookController = updateBookController;
const createBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, services_1.createBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.createBookController = createBookController;
const removeBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" });
    }
    const Book = yield (0, services_1.removeBookService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(Book);
});
exports.removeBookController = removeBookController;
const getBookByBookTypeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" });
    }
    const Book = yield (0, services_1.getBookByTypeBookService)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Book);
});
exports.getBookByBookTypeController = getBookByBookTypeController;
const getBookSearchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.body.key;
    const column = `${req.body.column}`.trim();
    const Book = yield (0, services_1.getBookSearchService)(key, column);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Book);
});
exports.getBookSearchController = getBookSearchController;
//# sourceMappingURL=controllers.js.map