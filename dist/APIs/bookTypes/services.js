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
exports.removeBookTypesService = exports.uploadIconToCloudinary = exports.createBookTypesService = exports.getBookTypesService = void 0;
const fs_1 = __importDefault(require("fs"));
const prisma_1 = __importDefault(require("../../prisma"));
const environment_1 = __importDefault(require("../../environment"));
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const getBookTypesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== get book type ============================");
        let bookType = yield prisma_1.default.$queryRaw `SELECT bt_index, bt_id, icon, subtitle, title,  DATE_FORMAT(created_at, '%d-%m-%Y%T') created_at  
        FROM tbl_book_types ORDER BY bt_index`;
        return bookType;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return null;
    }
});
exports.getBookTypesService = getBookTypesService;
const createBookTypesService = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== create book type ============================");
        let { title, subtitle, created_at, created_by, bt_index } = data;
        created_by = Number(created_by);
        bt_index = Number(bt_index);
        console.log(bt_index, " 999 =========================== ");
        const iconPath = yield (0, exports.uploadIconToCloudinary)(file);
        if (!iconPath)
            return { message: "ບໍ່ສາມາອັບໂຫຼດຮູບໄດ້", status: "error" };
        const upsert = yield prisma_1.default.tbl_book_types.upsert({
            where: { title },
            update: { title, subtitle, updated_by: created_by, updated_at: created_at, icon: iconPath, bt_index },
            create: { title, subtitle, created_by, created_at, icon: iconPath, bt_index }
        });
        fs_1.default.unlink(file, (result) => console.log(result));
        console.log("upsert  book type ", upsert);
        yield prisma_1.default.$disconnect();
        let message = "ເພີ່ມໝວດໝູ່ໜັງສື ສຳເລັດແລ້ວ";
        if (upsert.updated_at) {
            message = "ອັບເດດໝວດໝູ່ໜັງສື ສຳເລັດແລ້ວ";
        }
        return { message, status: "success" };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.createBookTypesService = createBookTypesService;
const uploadIconToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const uploadResponse = yield cloudinary_1.default.uploader.upload(file);
        console.log(uploadResponse);
        return uploadResponse.secure_url;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.uploadIconToCloudinary = uploadIconToCloudinary;
const removeBookTypesService = (bt_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("==================== remove book type ============================");
        const bookType = yield prisma_1.default.tbl_book_types.delete({
            where: { bt_id },
        });
        if (bookType.icon) {
            try {
                const path = environment_1.default.PWD + "/" + bookType.icon;
                console.log('=========================== remove file icon success =====================================');
                console.log(path);
                fs_1.default.unlinkSync(path);
            }
            catch (error) {
                console.log('=========================== remove file icon error =====================================');
                console.log(error);
            }
        }
        console.log(bookType);
        console.log("==================== remove book type ============================");
        yield prisma_1.default.$disconnect();
        return { message: "ລົບໝວດໝູ່ໜັງສື ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
});
exports.removeBookTypesService = removeBookTypesService;
//# sourceMappingURL=services.js.map