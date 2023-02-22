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
exports.adminCancelReserve = exports.adminReserve = exports.editorCancelReserve = exports.editorReserve = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const prisma_1 = __importDefault(require("../../prisma"));
const editorReserve = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("payload ", payload);
        const date = (0, dayjs_1.default)(payload.checking_date).format('YYYY-MM-DD HH:mm:ss');
        console.log("checking_date ", date);
        let checking = yield prisma_1.default.$queryRaw `UPDATE tbl_books SET 
        editor_checking_by = ${payload.userId},
        editor_checking_date=  ${date}
        WHERE b_id = ${payload.b_id} AND editor_checking_by IS NULL
        `;
        console.log("editor reserve updated ", checking);
        return checking;
    }
    catch (e) {
        console.log('editor reserve error', e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.editorReserve = editorReserve;
const editorCancelReserve = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield prisma_1.default.tbl_books.update({
            where: { b_id: payload.b_id },
            data: {
                editor_checking_by: null,
                editor_checking_date: null
            }
        });
        console.log('editor cancel reserve success', book);
        return book;
    }
    catch (e) {
        console.log('editor cancel reserve error', e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.editorCancelReserve = editorCancelReserve;
const adminReserve = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("payload ", payload);
        const date = (0, dayjs_1.default)(payload.checking_date).format('YYYY-MM-DD HH:mm:ss');
        let checking = yield prisma_1.default.$queryRaw `UPDATE tbl_books SET 
        admin_checking_by = ${payload.userId},
        admin_checking_date = ${date}
        WHERE b_id = ${payload.b_id} AND admin_checking_by IS NULL
        `;
        console.log("admin reserve updated ", checking);
        return checking;
    }
    catch (e) {
        console.log('admin reserve error', e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.adminReserve = adminReserve;
const adminCancelReserve = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield prisma_1.default.tbl_books.update({
            where: { b_id: payload.b_id },
            data: {
                admin_checking_by: null,
                admin_checking_date: null
            }
        });
        console.log('admin cancel reserve success', book);
        return book;
    }
    catch (e) {
        console.log('admin cancel reserve error', e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.adminCancelReserve = adminCancelReserve;
//# sourceMappingURL=services.js.map