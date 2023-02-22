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
exports.removeFestivalService = exports.createFestivalService = exports.getFestivalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getFestivalService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("get Festival service");
        let Festival = yield prisma_1.default.$queryRaw `
            SELECT  DATE_FORMAT(created_at,'%d-%m-%Y') created_at,  fe_id, festival_name
            FROM tbl_festival 
        `;
        yield prisma_1.default.$disconnect();
        return Festival;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.getFestivalService = getFestivalService;
const createFestivalService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== create Festival  ============================");
        const created_at = new Date(data.created_at);
        const festival_name = data.festival_name;
        const created_by = Number(data.created_by);
        const checkFestival = yield prisma_1.default.tbl_festival.findFirst({ where: { festival_name: festival_name } });
        console.log(checkFestival);
        console.log("======================= check Festival =====================================");
        if (checkFestival) {
            yield prisma_1.default.$disconnect();
            return { message: "ລາຍການນີ້ມີໃນລະບົບແລ້ວ", status: "error", };
        }
        const festival = yield prisma_1.default.tbl_festival.create({
            data: {
                festival_name,
                created_by,
                created_at,
            }
        });
        console.log("festival create ", festival);
        yield prisma_1.default.$disconnect();
        return { message: "ເພີ່ມຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success", };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.createFestivalService = createFestivalService;
const removeFestivalService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== remove festival  ============================");
        const festival = yield prisma_1.default.tbl_festival.delete({ where: { fe_id: id }, });
        console.log(festival);
        console.log("==================== remove festival  ============================");
        yield prisma_1.default.$disconnect();
        return { message: "ລົບຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
});
exports.removeFestivalService = removeFestivalService;
//# sourceMappingURL=services.js.map