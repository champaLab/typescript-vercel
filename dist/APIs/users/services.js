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
exports.deleteUserService = exports.updateUserStatus = exports.updateUserProfileService = exports.updateUserService = exports.getUsersService = exports.userCreateService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const monpity_crypt_1 = require("../../utils/monpity-crypt");
const userCreateService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield prisma_1.default.tbl_users.findFirst({
            where: { email: user.email },
        });
        console.log('check user :', check);
        if (check) {
            return { message: 'ຜູ້ໃຊ້ງານນີ້ ມີໃນລະບົບແລ້ວ', status: "error" };
        }
        const _user = yield prisma_1.default.tbl_users.create({
            data: user
        });
        return _user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.userCreateService = userCreateService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield prisma_1.default.$queryRaw `
            SELECT u_id, username, email, DATE_FORMAT(created_at,'%d-%m-%Y') created_at, role,
            DATE_FORMAT(updated_at, '%d-%m-%Y%T') updated_at, status, DATE_FORMAT(last_login, '%d-%m-%Y %T') last_login
            FROM tbl_users ORDER BY created_at DESC`;
        return users;
    }
    catch (error) {
        throw error;
    }
});
exports.getUsersService = getUsersService;
const updateUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.tbl_users.update({
            where: { u_id: user.u_id },
            data: user,
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserService = updateUserService;
const updateUserProfileService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let username = user.username.trim();
        let password = user.password;
        let u_id = user.u_id;
        if (username.length < 1) {
            return null;
        }
        let _user = { username };
        // @ts-ignore
        if (password)
            _user = { username, password: (0, monpity_crypt_1.encrypt)(password) };
        const result = yield prisma_1.default.tbl_users.update({
            where: { u_id: u_id },
            data: _user
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserProfileService = updateUserProfileService;
const updateUserStatus = (u_id, status, updated_at) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.tbl_users.update({
            where: { u_id: u_id },
            data: { status: status, updated_at },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserStatus = updateUserStatus;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.tbl_users.delete({
            where: { u_id: id },
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=services.js.map