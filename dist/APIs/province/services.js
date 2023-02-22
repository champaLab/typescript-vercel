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
exports.removeProvinceService = exports.updateProvinceService = exports.createProvinceService = exports.getProvinceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getProvinceService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("get province service");
        let provinces = yield prisma_1.default.$queryRaw `SELECT pro_id, province_name,  DATE_FORMAT(created_at,'%d-%m-%Y') created_at  FROM tbl_provinces`;
        yield prisma_1.default.$disconnect();
        let provinceList = [];
        if (provinces.length > 0) {
            provinces.map((item) => {
                provinceList.push({
                    label: item.province_name,
                    value: Number(item.pro_id),
                    pro_id: Number(item.pro_id),
                    created_at: item.created_at,
                    province_name: item.province_name,
                });
            });
        }
        return provinceList;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.getProvinceService = getProvinceService;
const createProvinceService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== create Province  ============================");
        let { created_by, province_name } = data;
        let created_at = new Date();
        const check = yield prisma_1.default.tbl_provinces.findFirst({ where: { province_name: province_name }, });
        if (check) {
            yield prisma_1.default.$disconnect();
            return { message: "ຂໍ້ມູນແຂວງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        const Province = yield prisma_1.default.tbl_provinces.create({
            data: {
                province_name,
                created_at,
                created_by,
            }
        });
        console.log("Province create ", Province);
        yield prisma_1.default.$disconnect();
        return { message: "ເພີ່ມຂໍ້ມູນແຂວງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.createProvinceService = createProvinceService;
const updateProvinceService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== update Province  ============================");
        let { province_name, pro_id, created_by } = data;
        let updated_at = new Date();
        const check = yield prisma_1.default.tbl_provinces.findFirst({
            where: { province_name: province_name, NOT: { pro_id: pro_id } },
        });
        console.log("============== check ==================");
        console.log("check ", check);
        if (check) {
            yield prisma_1.default.$disconnect();
            return { message: "ຂໍ້ມູນແຂວງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        if (typeof pro_id != "number") {
            yield prisma_1.default.$disconnect();
            return { message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" };
        }
        var upsert = yield prisma_1.default.tbl_provinces.update({
            where: { pro_id: pro_id },
            data: { province_name, updated_at, updated_by: created_by }
        });
        console.log("update  Province  ", upsert);
        yield prisma_1.default.$disconnect();
        console.log("==================== remove Province  ============================");
        yield prisma_1.default.$disconnect();
        return { message: "ອັບເດດຂໍ້ມູນແຂວງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return { message: "ຜິດພາດ ລອງອີກຄັ້ງ", status: "error" };
    }
});
exports.updateProvinceService = updateProvinceService;
const removeProvinceService = (pro_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== remove Province  ============================");
        const ProvinceType = yield prisma_1.default.tbl_provinces.delete({
            where: { pro_id },
        });
        const city = yield prisma_1.default.tbl_cities.deleteMany({
            where: { province_id: pro_id },
        });
        console.log(ProvinceType);
        console.log("==================== remove Province  ============================");
        yield prisma_1.default.$disconnect();
        return { message: "ລົບແຂວງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
});
exports.removeProvinceService = removeProvinceService;
//# sourceMappingURL=services.js.map