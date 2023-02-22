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
exports.randomKhamkhomService = exports.deleteKhamkhomService = exports.updateKhamkhomService = exports.getKhamkhomService = exports.checkKhamkhomService = exports.getKhamkhomServiceByUserId = exports.createKhamkhomService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const date = (0, dayjs_1.default)(new Date()).format();
// const date = dayjs(new Date()).tz('Asia/Bangkok').format()
const createKhamkhomService = (title, created_by) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("date ", date);
        let result = yield prisma_1.default.tbl_khamkhom.create({
            data: { title: title, created_at: date, created_by }
        });
        yield prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.createKhamkhomService = createKhamkhomService;
const getKhamkhomServiceByUserId = (created_by) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield prisma_1.default.tbl_khamkhom.findMany({
            where: { created_by }
        });
        yield prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.getKhamkhomServiceByUserId = getKhamkhomServiceByUserId;
const checkKhamkhomService = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma_1.default.tbl_khamkhom.findUnique({
            where: { title }
        });
        yield prisma_1.default.$disconnect();
        return check;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.checkKhamkhomService = checkKhamkhomService;
const getKhamkhomService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma_1.default.tbl_khamkhom.findMany({});
        yield prisma_1.default.$disconnect();
        return check;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.getKhamkhomService = getKhamkhomService;
const updateKhamkhomService = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield prisma_1.default.tbl_khamkhom.update({
            where: { id },
            data: { title }
        });
        yield prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return null;
    }
});
exports.updateKhamkhomService = updateKhamkhomService;
const deleteKhamkhomService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("delete khamkhom ", typeof id, id);
        let result = yield prisma_1.default.tbl_khamkhom.delete({
            where: { id }
        });
        console.log(result);
        yield prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return null;
    }
});
exports.deleteKhamkhomService = deleteKhamkhomService;
const randomKhamkhomService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield prisma_1.default.$queryRaw `
        SELECT K.title, U.name FROM tbl_khamkhom AS K
        LEFT JOIN tbl_users AS U 
        ON U.u_id = K.created_by 
        `;
        yield prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return null;
    }
});
exports.randomKhamkhomService = randomKhamkhomService;
//# sourceMappingURL=services.js.map